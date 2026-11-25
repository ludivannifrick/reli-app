import { SearchField } from '../components/field.js';
import { Segmented } from '../components/segmented.js';
import { ChipGroup } from '../components/chip.js';
import { TitleCard } from '../components/card.js';
import { BottomNav } from '../components/nav.js';

export default {
  title: 'Patrones/Pantalla Mi videoteca',
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Los componentes juntos en una pantalla real, para ver jerarquía, espaciado y los dos temas.' } },
  },
};

export const Telefono = {
  name: 'Teléfono',
  render: () => `<div style="width:390px;border-radius:32px;overflow:hidden;background:var(--color-bg);box-shadow:var(--shadow-3);display:flex;flex-direction:column">
  <header style="padding:var(--space-5) var(--space-4) var(--space-3);display:flex;flex-direction:column;gap:var(--space-3)">
    <h1 style="margin:0;font-size:var(--font-size-display);line-height:var(--font-line-height-tight)">Mi videoteca</h1>
    ${SearchField({})}
    ${Segmented({ label: 'Tipo', options: ['Todo', 'Series', 'Pelis'], value: 'Series' })}
    ${ChipGroup({ label: 'Plataformas', options: ['Netflix', 'Max', 'Apple TV+', 'Prime Video'], selected: ['Apple TV+'] })}
  </header>
  <main style="padding:var(--space-2) var(--space-4) var(--space-5);display:flex;flex-direction:column;gap:var(--space-5)">
    <section style="display:flex;flex-direction:column;gap:var(--space-3)">
      <h2 style="margin:0;font-size:var(--font-size-title);line-height:var(--font-line-height-tight)">Viendo</h2>
      ${TitleCard({ title: 'Severance', meta: 'Serie · 2022 · Apple TV+', status: 'watching', progress: { label: 'Temporada 2', value: 5, max: 10 }, imdb: '8,7', rt: '97%' })}
    </section>
    <section style="display:flex;flex-direction:column;gap:var(--space-3)">
      <h2 style="margin:0;font-size:var(--font-size-title);line-height:var(--font-line-height-tight)">Quiero verla</h2>
      ${TitleCard({ title: 'Pluribus', meta: 'Serie · 2025 · Apple TV+', status: 'want', imdb: '8,4', rt: '98%', posterColor: '#2F5D50' })}
      ${TitleCard({ title: 'Slow Horses', meta: 'Serie · 2022 · Apple TV+', status: 'want', imdb: '8,2', rt: '96%', posterColor: '#4A3B32' })}
    </section>
  </main>
  ${BottomNav({ current: 'library' })}
</div>`,
};
