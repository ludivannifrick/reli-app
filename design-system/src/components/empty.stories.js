import { EmptyState } from './empty.js';

export default {
  title: 'Componentes/Estado vacío',
  tags: ['autodocs'],
  render: (args) => `<div style="max-width:420px">${EmptyState(args)}</div>`,
  args: {
    voice: 'Acá no hay nada… todavía.',
    title: 'Tu videoteca está vacía',
    text: 'Buscá una serie o peli que hayas visto y guardala. Así la próxima vez que alguien te pregunte, te acordás.',
    action: 'Buscar',
  },
  parameters: {
    docs: {
      description: {
        component: `Cuando una lista no tiene nada. Es el único lugar donde aparece Reli con su voz.

**Contenido:** el osito (decorativo, \`alt=""\`), un globito opcional con lo que diría Reli, un título que dice qué pasa, un texto que dice qué hacer y, si aplica, un botón.

**Regla:** el globito es personalidad, no información. Lo importante siempre está en el título y el texto. Todo alineado a la izquierda.`,
      },
    },
  },
};

export const Videoteca = {};
export const Amigos = {
  args: { voice: '¿Y tus amigos?', title: 'Todavía no tenés amigos en Reli', text: 'Tenés 3 invitaciones. Mandale una a alguien con quien compartas series.', action: '', art: 'reli-icono.svg' },
};
