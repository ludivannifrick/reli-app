import { Rating, RatingRead } from './rating.js';

export default {
  title: 'Componentes/Puntaje personal',
  tags: ['autodocs'],
  render: Rating,
  argTypes: { emoji: { control: 'inline-radio', options: ['🍿', '🍕', '🧉', '🔥', '⭐'] }, value: { control: { type: 'range', min: 0, max: 5 } } },
  args: { label: 'Tu puntaje', emoji: '🍿', value: 3 },
  parameters: {
    docs: {
      description: {
        component: `Cada persona puntúa de 1 a 5 con su propio emoji. Tu amigo te dio 🍕🍕🍕.

**Implementación:** radios nativos dentro de un \`fieldset\`, así funcionan las flechas del teclado y el lector de pantalla anuncia "3 de 5".

**Estados:** los emojis sin marcar van en gris y al 35%, y el valor también se escribe al lado ("3 de 5"), para no depender de cómo se ve el emoji.

**Medidas:** cada opción es de 44 × 44 px.`,
      },
    },
  },
};

export const Interactivo = {};
export const SinPuntaje = { name: 'Sin puntaje', args: { value: 0 } };
export const SoloLectura = { name: 'Solo lectura', render: RatingRead, args: { emoji: '🍕', value: 4 } };
