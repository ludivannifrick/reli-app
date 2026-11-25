import { StatusBadge, Scores } from './badge.js';

export default {
  title: 'Componentes/Estado y puntajes',
  tags: ['autodocs'],
  render: StatusBadge,
  argTypes: { status: { control: 'inline-radio', options: ['want', 'watching', 'watched'] } },
  args: { status: 'watching' },
  parameters: {
    docs: {
      description: {
        component: `**Estado** de una serie o peli en tu videoteca. Cada estado tiene ícono y palabra, así se entiende sin ver colores.

| Estado | Ícono | Fondo |
| --- | --- | --- |
| Quiero verla | Marcador | Hundido |
| Viendo | Play | Manteca (acento) |
| Vista | Tilde | Seleccionado |

**Puntajes externos:** el nombre de la fuente siempre escrito ("IMDb", "Rotten Tomatoes"), nunca solo un logo o un color.`,
      },
    },
  },
};

export const Estado = {};
export const Todos = {
  name: 'Todos los estados',
  render: () => `<div style="display:flex;gap:8px;flex-wrap:wrap">${['want', 'watching', 'watched'].map((s) => StatusBadge({ status: s })).join('')}</div>`,
};
export const Puntajes = { render: Scores, args: { imdb: '8,7', rt: '97%' }, argTypes: { status: { table: { disable: true } } } };
