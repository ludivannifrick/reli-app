import { BottomNav } from './nav.js';

export default {
  title: 'Componentes/Navegación inferior',
  tags: ['autodocs'],
  render: (args) => `<div style="max-width:420px">${BottomNav(args)}</div>`,
  argTypes: { current: { control: 'inline-radio', options: ['library', 'foryou', 'friends'] } },
  args: { current: 'library' },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Las tres secciones de la app. Siempre ícono y texto, nunca solo ícono.

**Pestaña actual:** texto bold y más oscuro, y una pastilla de manteca detrás del ícono. Usa \`aria-current="page"\`.

**Medidas:** cada pestaña mide 56 px de alto como mínimo, respeta el área segura del iPhone y flota con \`--shadow-2\`.`,
      },
    },
  },
};

export const MiVideoteca = { name: 'Mi videoteca' };
export const ParaVos = { name: 'Para vos', args: { current: 'foryou' } };
export const Amigos = { args: { current: 'friends' } };
