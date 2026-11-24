-- Reli: esquema inicial para Supabase.
-- Pegar entero en Supabase > SQL Editor > New query > Run (una sola vez).
--
-- Reglas:
--   * Nadie se registra sin un código de invitación válido.
--   * Excepción: la PRIMERA persona que se registra (Lu) entra sin código.
--   * Cada usuario puede generar hasta 3 invitaciones (de un solo uso).
--   * Quien entra con tu código queda como tu amigo (en los dos sentidos).

-- ---------- tablas ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null default '',
  emoji       text not null default '🙂',
  country     text not null default 'Argentina',
  invited_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table if not exists public.invites (
  code        text primary key,
  created_by  uuid not null references public.profiles(id) on delete cascade,
  used_by     uuid references public.profiles(id) on delete set null,
  used_at     timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists public.friendships (
  user_id     uuid not null references public.profiles(id) on delete cascade,
  friend_id   uuid not null references public.profiles(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, friend_id),
  check (user_id <> friend_id)
);

-- Lo que cada uno marcó de una serie/peli (tmdb_id + tipo identifica el título).
create table if not exists public.entries (
  user_id     uuid not null references public.profiles(id) on delete cascade,
  tmdb_id     integer not null,
  media_type  text not null check (media_type in ('tv', 'movie')),
  title       text not null,
  poster_path text,
  status      text check (status in ('quiero', 'viendo', 'vista')),
  rating      smallint check (rating between 1 and 5),
  season      smallint,
  episode     smallint,
  platform    text,
  country     text,
  comment     text,
  updated_at  timestamptz not null default now(),
  primary key (user_id, tmdb_id, media_type)
);

create table if not exists public.recommendations (
  id          bigint generated always as identity primary key,
  from_user   uuid not null references public.profiles(id) on delete cascade,
  to_user     uuid not null references public.profiles(id) on delete cascade,
  tmdb_id     integer not null,
  media_type  text not null check (media_type in ('tv', 'movie')),
  title       text not null,
  note        text,
  created_at  timestamptz not null default now()
);

-- ---------- alta de usuario: exige invitación ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code    text := upper(trim(coalesce(new.raw_user_meta_data->>'invite_code', '')));
  v_inviter uuid;
begin
  if exists (select 1 from public.profiles) then
    select created_by into v_inviter
      from public.invites
     where code = v_code and used_by is null
     for update;
    if v_inviter is null then
      raise exception 'Código de invitación inválido o ya usado';
    end if;
  end if;

  insert into public.profiles (id, name, emoji, invited_by)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'name', ''), split_part(new.email, '@', 1)),
    coalesce(nullif(new.raw_user_meta_data->>'emoji', ''), '🙂'),
    v_inviter
  );

  if v_inviter is not null then
    update public.invites set used_by = new.id, used_at = now() where code = v_code;
    insert into public.friendships (user_id, friend_id) values (v_inviter, new.id), (new.id, v_inviter)
      on conflict do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- crear invitación (máximo 3 por persona) ----------
create or replace function public.create_invite()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text;
begin
  if auth.uid() is null then
    raise exception 'Tenés que iniciar sesión';
  end if;
  if (select count(*) from public.invites where created_by = auth.uid()) >= 3 then
    raise exception 'Ya usaste tus 3 invitaciones';
  end if;
  v_code := upper(substr(md5(gen_random_uuid()::text), 1, 8));
  insert into public.invites (code, created_by) values (v_code, auth.uid());
  return v_code;
end;
$$;

revoke all on function public.create_invite() from public, anon;
grant execute on function public.create_invite() to authenticated;

-- ¿Es mi amigo? (lo usan las reglas de abajo)
create or replace function public.is_friend(other uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.friendships where user_id = auth.uid() and friend_id = other);
$$;

-- ---------- reglas de acceso (RLS) ----------
alter table public.profiles        enable row level security;
alter table public.invites         enable row level security;
alter table public.friendships     enable row level security;
alter table public.entries         enable row level security;
alter table public.recommendations enable row level security;

-- Perfiles: veo el mío y el de mis amigos; edito solo el mío.
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_friend(id));
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid() and invited_by is not distinct from (select p.invited_by from public.profiles p where p.id = auth.uid()));

-- Invitaciones: veo solo las mías (se crean con create_invite()).
drop policy if exists invites_read on public.invites;
create policy invites_read on public.invites for select to authenticated
  using (created_by = auth.uid());

-- Amistades: veo las mías (se crean solas al usar una invitación).
drop policy if exists friendships_read on public.friendships;
create policy friendships_read on public.friendships for select to authenticated
  using (user_id = auth.uid());

-- Mis series: las escribo yo; las ven mis amigos.
drop policy if exists entries_read on public.entries;
create policy entries_read on public.entries for select to authenticated
  using (user_id = auth.uid() or public.is_friend(user_id));
drop policy if exists entries_write on public.entries;
create policy entries_write on public.entries for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Recomendaciones: solo a amigos; las ven quien manda y quien recibe.
drop policy if exists recs_read on public.recommendations;
create policy recs_read on public.recommendations for select to authenticated
  using (from_user = auth.uid() or to_user = auth.uid());
drop policy if exists recs_insert on public.recommendations;
create policy recs_insert on public.recommendations for insert to authenticated
  with check (from_user = auth.uid() and public.is_friend(to_user));
