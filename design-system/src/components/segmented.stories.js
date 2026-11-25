import { Segmented } from './segmented.js';

export default {
  title: 'Componentes/Selector segmentado',
  tags: ['autodocs'],
  render: Segmented,
  args: { label: 'Tipo', options: ['Todo', 'Series', 'Pelis'], value: 'Todo' },
  parameters: {
    docs: {
      description: {
        component: `Elige una vista entre dos a cuatro opciones excluyentes, por ejemplo series o pelis. Cambia lo que se ve, no guarda nada.

**Medidas:** contenedor hundido con padding \`--space-1\`, segmentos de 40 px de alto.

**Seleccionado:** fondo \`--color-surface-selected\` y texto bold, con \`aria-pressed="true"\`. Los demás quedan en texto secundario.`,
      },
    },
  },
};

export const Default = { name: 'Por defecto' };
export const Estados = { args: { label: 'Estado', options: ['Quiero verla', 'Viendo', 'Vista'], value: 'Viendo' } };
