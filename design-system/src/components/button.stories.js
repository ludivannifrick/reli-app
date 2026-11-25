import { Button, IconButton } from './button.js';
import { iconNames } from './icons.js';

export default {
  title: 'Componentes/Botón',
  tags: ['autodocs'],
  render: Button,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
    iconName: { control: 'select', options: [undefined, ...iconNames] },
  },
  args: { label: 'Recomendar', variant: 'primary', size: 'md', full: false, disabled: false, loading: false },
  parameters: {
    docs: {
      description: {
        component: `Dispara una acción. **Un solo primario por pantalla**: es lo primero que tiene que ver el ojo.

| Variante | Uso |
| --- | --- |
| \`primary\` | La acción principal: "Recomendar", "Guardar". |
| \`secondary\` | Acciones de apoyo al lado del primario: "Cancelar". |
| \`ghost\` | Acciones de bajo peso o que llevan a otro lugar: "Ver todo". |

**Medidas:** 48 px de alto (52 px en \`lg\`), padding horizontal \`--space-5\`, radio \`--radius-md\`, texto 16 px bold.

**Estados:** hover oscurece el fondo; presionado lo oscurece más y escala a 98%; foco con anillo de 3 px; deshabilitado con fondo hundido y borde punteado (el texto sigue legible, no se baja la opacidad); cargando muestra un spinner y \`aria-busy\`.

**Texto:** verbo en infinitivo y tipo oración. "Agregar a mi videoteca", no "AGREGAR".`,
      },
    },
  },
};

export const Primario = {};
export const Secundario = { args: { variant: 'secondary', label: 'Cancelar' } };
export const Fantasma = { args: { variant: 'ghost', label: 'Ver todo' } };
export const ConIcono = { name: 'Con ícono', args: { iconName: 'send' } };
export const Grande = { args: { size: 'lg', full: true, label: 'Guardar cambios' } };
export const Cargando = { args: { loading: true, label: 'Guardando' } };
export const Deshabilitado = { args: { disabled: true } };

export const Jerarquia = {
  name: 'Jerarquía',
  render: () => `<div style="display:flex;gap:8px;flex-wrap:wrap">${Button({ label: 'Recomendar', iconName: 'send' })}${Button({
    label: 'Cancelar',
    variant: 'secondary',
  })}${Button({ label: 'Ver ficha', variant: 'ghost' })}</div>`,
};

export const SoloIcono = {
  name: 'Solo ícono',
  render: () => `<div style="display:flex;gap:8px">${IconButton({ iconName: 'close', label: 'Cerrar' })}${IconButton({
    iconName: 'filter',
    label: 'Filtros',
    outlined: true,
  })}</div>`,
  parameters: { docs: { description: { story: '44 × 44 px. El `label` es obligatorio: es lo que lee el lector de pantalla.' } } },
};
