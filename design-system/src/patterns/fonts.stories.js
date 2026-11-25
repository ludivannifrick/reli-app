// Font trial: renders real Reli UI with candidate fonts. Temporary until a pairing is chosen.
import { SearchField } from '../components/field.js';
import { Segmented } from '../components/segmented.js';
import { ChipGroup } from '../components/chip.js';
import { TitleCard } from '../components/card.js';
import { BottomNav } from '../components/nav.js';
import { Button } from '../components/button.js';

const bases = ['Figtree', 'Jost', 'Manrope', 'Instrument Sans', 'Rubik', 'Karla', 'Space Grotesk', 'Raleway', 'Tienne'];
const voices = ['Shantell Sans', 'Cutive Mono', 'Caveat'];

// x-height as a share of the font size, measured in the browser. Higher reads better at small sizes.
const xRatio = (font) => {
  const c = document.createElement('canvas').getContext('2d');
  c.font = `400 100px '${font}'`;
  const h = (ch) => c.measureText(ch).actualBoundingBoxAscent;
  return h('x') / 100;
};

const wrap = (base, voice, html) =>
  `<div style="--font-family-base:'${base}', system-ui, sans-serif;--font-family-voice:'${voice}', cursive;font-family:var(--font-family-base)">${html}</div>`;

const phone = () => `<div style="width:360px;border-radius:28px;overflow:hidden;background:var(--color-bg);box-shadow:var(--shadow-3);display:flex;flex-direction:column">
  <header style="padding:var(--space-5) var(--space-4) var(--space-3);display:flex;flex-direction:column;gap:var(--space-3)">
    <h1 style="margin:0;font-size:var(--font-size-display);line-height:var(--font-line-height-tight)">Mi videoteca</h1>
    ${SearchField({})}
    ${Segmented({ label: 'Tipo', options: ['Todo', 'Series', 'Pelis'], value: 'Series' })}
    ${ChipGroup({ label: 'Plataformas', options: ['Netflix', 'Max', 'Apple TV+'], selected: ['Apple TV+'] })}
  </header>
  <main style="padding:var(--space-2) var(--space-4) var(--space-5);display:flex;flex-direction:column;gap:var(--space-3)">
    ${TitleCard({ title: 'Severance', meta: 'Serie · 2022 · Apple TV+', status: 'watching', progress: { label: 'Temporada 2', value: 5, max: 10 }, imdb: '8,7', rt: '97%' })}
    <p style="margin:0;line-height:var(--font-line-height-long);color:var(--color-text-muted)">Arranca lenta, pero a partir del tercer capítulo no la podés soltar. 0123456789</p>
    <p class="r-voice" style="align-self:flex-start">Sí, me quedé todo el domingo.</p>
    ${Button({ label: 'Recomendar', iconName: 'send', full: true })}
  </main>
  ${BottomNav({ current: 'library' })}
</div>`;

export default {
  title: 'Fundamentos/Prueba de fuentes',
  parameters: { layout: 'padded' },
};

export const EnPantalla = {
  name: 'En pantalla',
  argTypes: {
    base: { name: 'Fuente de interfaz', control: 'select', options: bases },
    voice: { name: 'Voz de Reli', control: 'inline-radio', options: voices },
  },
  args: { base: 'Jost', voice: 'Shantell Sans' },
  render: ({ base, voice }) => wrap(base, voice, phone()),
};

export const Comparar = {
  name: 'Comparar todas',
  render: () => {
    const el = document.createElement('div');
    el.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px';
    const card = (font, voice) => `<div style="padding:16px;border-radius:16px;background:var(--color-surface);font-family:'${font}';display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;justify-content:space-between;gap:8px;font-family:Figtree;font-size:13px;color:var(--color-text-muted)"><b style="color:var(--color-text)">${font}</b><span data-x="${font}">x-height …</span></div>
      <div style="font-size:28px;font-weight:700;line-height:1.2">Mi videoteca</div>
      <div style="font-size:16px;line-height:1.5">¿Ya la viste? Tiene un 8,7 en IMDb y 97% en Rotten Tomatoes.</div>
      <div style="font-size:13px;color:var(--color-text-muted)">Serie · 2022 · T2 E5 de 10 · Il1 0O</div>
      ${voice ? `<div class="r-voice" style="align-self:flex-start;font-family:'${font}'">Sí, me quedé todo el domingo.</div>` : ''}
    </div>`;
    el.innerHTML = bases.map((f) => card(f)).join('') + voices.map((f) => card(f, true)).join('');
    const all = [...bases, ...voices];
    Promise.all(all.flatMap((f) => [document.fonts.load(`400 100px '${f}'`), document.fonts.load(`700 100px '${f}'`)])).then(() =>
      el.querySelectorAll('[data-x]').forEach((s) => (s.textContent = `minúscula al ${Math.round(xRatio(s.dataset.x) * 100)}% del tamaño`)),
    );
    return el;
  },
};
