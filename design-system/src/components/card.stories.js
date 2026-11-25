import { TitleCard } from './card.js';

export default {
  title: 'Componentes/Tarjeta de título',
  tags: ['autodocs'],
  render: (args) => `<div style="max-width:420px">${TitleCard(args)}</div>`,
  argTypes: { status: { control: 'inline-radio', options: [undefined, 'want', 'watching', 'watched'] }, posterColor: { control: 'color' } },
  args: { title: 'Severance', meta: 'Serie · 2022 · Apple TV+', status: 'watching', imdb: '8,7', rt: '97%', posterColor: '#8E1F2B' },
  parameters: {
    docs: {
      description: {
        component: `Una serie o peli en una lista. Toda la tarjeta se puede tocar, pero hay **una sola parada de teclado**: el título, que es un link con un área que cubre la tarjeta.

**Orden de lectura:** título, metadatos, estado, progreso y puntajes. Lo que más importa arriba y más grande.

**Medidas:** padding \`--space-3\`, radio \`--radius-lg\`, sombra \`--shadow-1\`, póster de 64 px a 2:3, gap \`--space-3\` entre póster y texto, \`--space-2\` entre líneas.

**Hover y foco:** fondo hundido en hover; anillo de foco alrededor de toda la tarjeta.`,
      },
    },
  },
};

export const Viendo = { args: { progress: { label: 'Temporada 2', value: 5, max: 10 } } };
export const QuieroVerla = { name: 'Quiero verla', args: { title: 'Pluribus', meta: 'Serie · 2025 · Apple TV+', status: 'want', imdb: '8,4', rt: '98%', posterColor: '#2F5D50' } };
export const Vista = { args: { title: 'Relatos salvajes', meta: 'Peli · 2014 · 2 h 2 min', status: 'watched', imdb: '8,1', rt: '95%', posterColor: '#8A5A2B' } };
export const SinPuntajes = { name: 'Sin puntajes', args: { imdb: '', rt: '', status: undefined, title: 'Una peli nueva', meta: 'Peli · 2026' } };
