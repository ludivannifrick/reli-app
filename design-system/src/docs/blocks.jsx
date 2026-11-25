// Doc blocks that read the generated tokens, so the docs can never drift from the CSS.
import React from 'react';
import tokens from '../../dist/tokens.json';
import { contrast } from '../lib/contrast.js';
import { pairs } from '../lib/pairs.js';

const cell = { padding: '8px 12px', borderBottom: '1px solid #E6D5B8', textAlign: 'left', verticalAlign: 'middle' };
const mono = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13 };

const Table = ({ head, rows }) => (
  <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
    <thead>
      <tr>{head.map((h) => <th key={h} style={{ ...cell, fontWeight: 700 }}>{h}</th>)}</tr>
    </thead>
    <tbody>{rows}</tbody>
  </table>
);

const Chip = ({ hex }) => (
  <span style={{ display: 'inline-block', width: 28, height: 28, borderRadius: 8, background: hex, border: '1px solid rgb(0 0 0 / 0.15)', verticalAlign: 'middle' }} />
);

export const Palette = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
    {Object.entries(tokens.primitive).map(([name, hex]) => (
      <div key={name} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #E6D5B8' }}>
        <div style={{ height: 64, background: hex }} />
        <div style={{ padding: '8px 10px', fontSize: 13, lineHeight: 1.4 }}>
          <b>{name}</b>
          <div style={mono}>{hex}</div>
        </div>
      </div>
    ))}
  </div>
);

export const SemanticColors = () => (
  <Table
    head={['Token', 'Pochoclo (claro)', 'Función de noche (oscuro)']}
    rows={Object.keys(tokens.light).map((k) => (
      <tr key={k}>
        <td style={{ ...cell, ...mono }}>--{k}</td>
        <td style={cell}><Chip hex={tokens.light[k]} /> <span style={mono}>{tokens.light[k]}</span></td>
        <td style={cell}><Chip hex={tokens.dark[k]} /> <span style={mono}>{tokens.dark[k]}</span></td>
      </tr>
    ))}
  />
);

export const ContrastTable = () => (
  <Table
    head={['Uso', 'Par', 'Mínimo', 'Claro', 'Oscuro']}
    rows={pairs.map(([fg, bg, min, use]) => {
      const res = ['light', 'dark'].map((t) => {
        const f = tokens[t][`color-${fg}`];
        const b = tokens[t][`color-${bg}`];
        const r = contrast(f, b);
        return (
          <td key={t} style={cell}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: b, color: f, border: `2px solid ${f}`, borderRadius: 6, padding: '2px 8px', fontWeight: 700 }}>Aa</span>
              <span style={mono}>{r.toFixed(2)}:1</span>
              <span>{r >= min ? '✓ pasa' : '✗ no pasa'}</span>
            </span>
          </td>
        );
      });
      return (
        <tr key={fg + bg}>
          <td style={cell}>{use}</td>
          <td style={{ ...cell, ...mono }}>{fg} / {bg}</td>
          <td style={cell}>{min}:1</td>
          {res}
        </tr>
      );
    })}
  />
);

const sharedBy = (prefix) => Object.entries(tokens.shared).filter(([k]) => k.startsWith(prefix));

export const TypeScale = () => (
  <Table
    head={['Token', 'Tamaño', 'Muestra']}
    rows={sharedBy('font-size').map(([k, v]) => (
      <tr key={k}>
        <td style={{ ...cell, ...mono }}>--{k}</td>
        <td style={{ ...cell, ...mono }}>{v}</td>
        <td style={{ ...cell, fontFamily: tokens.shared['font-family-base'], fontSize: v, lineHeight: 1.25, fontWeight: parseInt(v) >= 18 ? 700 : 400 }}>
          ¿Ya la viste? Tiene un 8,1 en IMDb
        </td>
      </tr>
    ))}
  />
);

export const SpaceScale = () => (
  <Table
    head={['Token', 'Valor', '']}
    rows={sharedBy('space').map(([k, v]) => (
      <tr key={k}>
        <td style={{ ...cell, ...mono }}>--{k}</td>
        <td style={{ ...cell, ...mono }}>{v}</td>
        <td style={cell}><span style={{ display: 'inline-block', height: 16, width: v, background: '#D7322F', borderRadius: 4 }} /></td>
      </tr>
    ))}
  />
);

export const RadiusScale = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {sharedBy('radius').map(([k, v]) => (
      <div key={k} style={{ fontSize: 13 }}>
        <div style={{ width: 88, height: 64, background: '#F6CF6A', border: '2px solid #3A2A22', borderRadius: v }} />
        <div style={mono}>--{k}</div>
        <div style={mono}>{v}</div>
      </div>
    ))}
  </div>
);

export const ShadowScale = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 16, background: '#FBF4E6', borderRadius: 12 }}>
    {sharedBy('shadow').map(([k, v]) => (
      <div key={k} style={{ width: 160, padding: 16, borderRadius: 16, background: '#FFFDF7', boxShadow: v, fontSize: 13 }}>
        <b style={mono}>--{k}</b>
        <div style={{ ...mono, marginTop: 6, color: '#6B5649' }}>{v}</div>
      </div>
    ))}
  </div>
);

export const MotionTable = () => (
  <Table
    head={['Token', 'Valor']}
    rows={sharedBy('motion').map(([k, v]) => (
      <tr key={k}>
        <td style={{ ...cell, ...mono }}>--{k}</td>
        <td style={{ ...cell, ...mono }}>{v}</td>
      </tr>
    ))}
  />
);
