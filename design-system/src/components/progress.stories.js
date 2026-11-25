import { Progress } from './progress.js';

export default {
  title: 'Componentes/Progreso',
  tags: ['autodocs'],
  render: Progress,
  argTypes: { value: { control: { type: 'range', min: 0, max: 10 } } },
  args: { label: 'Temporada 2', value: 5, max: 10 },
  parameters: {
    docs: {
      description: {
        component: `Por dónde vas en una temporada. El número también se escribe ("5 de 10"), la barra es un apoyo visual.

**Medidas:** 6 px de alto, radio \`pill\`. Relleno \`--color-progress\` contra la pista con 3:1 o más.

**Accesibilidad:** \`role="progressbar"\` con \`aria-valuetext\` en episodios, no en porcentaje.`,
      },
    },
  },
};

export const Default = { name: 'Por defecto' };
export const Empezando = { args: { value: 1 } };
export const Terminada = { args: { value: 10 } };
