import { TextField, SearchField } from './field.js';

export default {
  title: 'Componentes/Campo de texto',
  tags: ['autodocs'],
  render: TextField,
  args: { label: 'Comentario', hint: '', error: '', placeholder: 'Qué te pareció', value: '', multiline: false, disabled: false },
  parameters: {
    docs: {
      description: {
        component: `Etiqueta arriba, siempre visible. El placeholder es un ejemplo, nunca la etiqueta.

**Medidas:** 48 px de alto, texto 16 px (evita el zoom en iPhone), borde \`--color-border-control\` de 1.5 px, radio \`--radius-md\`.

**Estados:**
- *Foco:* anillo de 3 px pegado al borde.
- *Error:* borde de 2 px en \`--color-danger\`, ícono y mensaje en texto debajo, con \`aria-invalid\` y \`aria-describedby\`.
- *Deshabilitado:* fondo hundido y borde punteado.

**Texto largo** (\`multiline\`): interlineado 1.65 y redimensionable en vertical.`,
      },
    },
  },
};

export const Default = { name: 'Por defecto' };
export const ConAyuda = { name: 'Con ayuda', args: { label: 'La vi en', hint: 'Plataforma y país, por si la viste de viaje', placeholder: 'Netflix, Argentina' } };
export const ConError = { name: 'Con error', args: { label: 'Código de invitación', value: 'RELI-12', error: 'El código tiene 8 caracteres. Revisá que esté completo.' } };
export const TextoLargo = { name: 'Texto largo', args: { multiline: true, value: 'Arranca lenta pero a partir del tercer capítulo no la podés soltar.' } };
export const Deshabilitado = { args: { disabled: true, value: 'Argentina' , label: 'País' } };

export const Buscador = {
  render: SearchField,
  args: { value: '' },
  argTypes: { label: { control: 'text' }, placeholder: { control: 'text' } },
  parameters: { docs: { description: { story: 'Formulario con `role="search"` y etiqueta oculta para lectores de pantalla. Con texto, aparece el botón para borrar.' } } },
};
export const BuscadorConTexto = { name: 'Buscador con texto', render: SearchField, args: { value: 'Severance' } };
