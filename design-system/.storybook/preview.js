import '../src/index.css';

// Toggle chips and segments in the canvas so stories feel like the real thing.
if (typeof document !== 'undefined' && !window.__reliToggles) {
  window.__reliToggles = true;
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.r-chip');
    if (chip) chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') !== 'true');
    const seg = e.target.closest('.r-segmented button');
    if (seg) seg.parentElement.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b === seg));
    if (e.target.closest('a[href="#"]')) e.preventDefault();
  });
  document.addEventListener('change', (e) => {
    const radio = e.target.closest('.r-rating input');
    if (!radio) return;
    const row = radio.closest('.r-rating__row');
    const v = Number(radio.value);
    row.querySelectorAll('label span').forEach((s, i) => s.toggleAttribute('data-off', i >= v));
    row.querySelector('.r-rating__value').textContent = `${v} de 5`;
  });
}

export default {
  globalTypes: {
    theme: {
      description: 'Tema',
      toolbar: {
        title: 'Tema',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Pochoclo (claro)' },
          { value: 'dark', title: 'Función de noche (oscuro)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (story, { globals }) => {
      document.documentElement.dataset.theme = globals.theme;
      return story();
    },
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Introducción', 'Fundamentos', ['Principios', 'Color', 'Tipografía', 'Espaciado y forma', 'Movimiento'], 'Accesibilidad', 'Componentes', 'Patrones'],
      },
    },
  },
};
