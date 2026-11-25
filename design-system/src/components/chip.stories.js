import { Chip, ChipGroup } from './chip.js';

export default {
  title: 'Componentes/Chip',
  tags: ['autodocs'],
  render: Chip,
  args: { label: 'Netflix', selected: false },
  parameters: {
    docs: {
      description: {
        component: `Filtro que se prende y se apaga (género, plataforma). No es una acción: para eso está el botón.

**Medidas:** 36 px de alto con área táctil de 44, radio \`pill\`, texto 14 px, borde \`--color-border-control\` (3:1 o más).

**Seleccionado:** fondo \`--color-surface-selected\`, texto bold y una tilde. Tres señales, no solo color. Usa \`aria-pressed\`.

**Grupo:** siempre dentro de un contenedor con \`role="group"\` y \`aria-label\` que diga qué se filtra. Probá tocarlos.`,
      },
    },
  },
};

export const Apagado = {};
export const Seleccionado = { args: { selected: true } };
export const Grupo = {
  render: () =>
    ChipGroup({ label: 'Plataformas', options: ['Netflix', 'Max', 'Disney+', 'Prime Video', 'Apple TV+', 'Mubi'], selected: ['Netflix', 'Mubi'] }),
};
