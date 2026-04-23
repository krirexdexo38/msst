import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { calculateComplexityValue, complexityPatterns } from '../utils/complexity';

export const VisualizationTab = () => {
  const [selectedComplexities, setSelectedComplexities] = useState(['O(n)', 'O(n²)']);
  const [maxN, setMaxN] = useState(100);

  const toggleComplexity = (complexity) => {
    setSelectedComplexities(prev =>
      prev.includes(complexity)
        ? prev.filter(c => c !== complexity)
        : [...prev, complexity]
    );
  };

  // Generate data
  const generateData = () => {
    const data = [];
    const step = Math.ceil(maxN / 20);
    
    for (let n = 1; n <= maxN; n += step) {
      const point = { n };
      selectedComplexities.forEach(complexity => {
        point[complexity] = Math.round(calculateComplexityValue(complexity, n) * 100) / 100;
      });
      data.push(point);
    }
    return data;
  };

  const data = generateData();

  const colors = {
    'O(1)': '#10b981',
    'O(log n)': '#3b82f6',
    'O(n)': '#f59e0b',
    'O(n log n)': '#8b5cf6',
    'O(n²)': '#ef4444',
    'O(n³)': '#dc2626',
    'O(2^n)': '#991b1b',
    'O(n!)': '#7c2d12'
  };

  const allComplexities = Object.keys(complexityPatterns);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Complexities to Compare</h3>
        <div className="grid-4 mb-6">
          {allComplexities.map(complexity => (
            <label key={complexity} className="flex items-center gap-2 cursor-pointer p-2">
              <input
                type="checkbox"
                checked={selectedComplexities.includes(complexity)}
                onChange={() => toggleComplexity(complexity)}
              />
              <span className="text-sm font-medium">{complexity}</span>
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: colors[complexity]
                }}
              />
            </label>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center gap-2">
            <span className="font-medium">Max Input Size (n):</span>
            <input
              type="number"
              value={maxN}
              onChange={(e) => setMaxN(Math.max(10, parseInt(e.target.value) || 100))}
            />
          </label>
        </div>
      </div>

      {selectedComplexities.length > 0 ? (
        <div className="card card-success p-6">
          <h3 className="text-lg font-semibold mb-4">Complexity Growth</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="n"
                label={{ value: 'Input Size (n)', position: 'insideBottomRight', offset: -5 }}
              />
              <YAxis
                scale={maxN > 50 ? 'log' : 'linear'}
                label={{ value: 'Operations/Time', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value) => Math.round(value * 100) / 100}
                labelFormatter={(label) => `n = ${label}`}
              />
              <Legend />
              {selectedComplexities.map(complexity => (
                <Line
                  key={complexity}
                  type="monotone"
                  dataKey={complexity}
                  stroke={colors[complexity]}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="card card-warning p-6 text-center">
          <p className="text-yellow-800">Select at least one complexity to visualize</p>
        </div>
      )}

      {/* Statistics Table */}
      {selectedComplexities.length > 0 && (
        <div className="card card-success p-6">
          <h3 className="text-lg font-semibold mb-4">Complexity Comparison (at different n values)</h3>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>n</th>
                  {selectedComplexities.map(c => (
                    <th key={c} style={{ color: colors[c] }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 10, 50, 100, 500, 1000].map(n => {
                  if (n > maxN) return null;
                  return (
                    <tr key={n}>
                      <td style={{ fontWeight: 600 }}>{n}</td>
                      {selectedComplexities.map(c => (
                        <td key={c}>
                          {Math.round(calculateComplexityValue(c, n) * 100) / 100}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
