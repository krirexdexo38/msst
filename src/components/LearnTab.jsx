import React, { useState } from 'react';
import { complexityPatterns, exampleSnippets } from '../utils/complexity';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const LearnTab = () => {
  const [expandedSection, setExpandedSection] = useState('O(1)');

  const toggleSection = (complexity) => {
    setExpandedSection(expandedSection === complexity ? null : complexity);
  };

  return (
    <div className="space-y-6">
      {/* Tips Section */}
      <div className="card card-info p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Big O Analysis Tips</h3>
        <ul className="space-y-3 text-blue-800">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">1.</span>
            <span><strong>Sequential loops:</strong> Add complexities. If you have a loop of O(n) followed by another O(n), it's O(2n) = O(n)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">2.</span>
            <span><strong>Nested loops:</strong> Multiply complexities. An outer loop of O(n) with inner loop of O(n) = O(n²)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">3.</span>
            <span><strong>Ignore constants:</strong> O(2n) becomes O(n), O(n/2) becomes O(n)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">4.</span>
            <span><strong>Drop lower order terms:</strong> O(n² + n) becomes O(n²)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold mt-1">5.</span>
            <span><strong>Recursion:</strong> Multiply the number of recursive calls by the work done per call</span>
          </li>
        </ul>
      </div>

      {/* Complexity Patterns */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Complexity Classes</h3>
        {Object.entries(complexityPatterns).map(([complexity, info]) => (
          <div key={complexity} style={{ border: '2px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <button
              onClick={() => toggleSection(complexity)}
              style={{
                width: '100%',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: info.lightColor,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              <div className="flex items-center gap-3">
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: info.color
                  }}
                />
                <span className="font-semibold" style={{ color: info.color }}>
                  {complexity} - {info.name}
                </span>
              </div>
              {expandedSection === complexity ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedSection === complexity && (
              <div className="p-4 space-y-4 border-t-2 border-gray-200">
                <p className="text-gray-700">{info.description}</p>

                <div>
                  <p className="font-semibold text-gray-800 mb-2">Common Examples:</p>
                  <ul className="space-y-1 text-gray-700">
                    {info.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {exampleSnippets[Object.keys(exampleSnippets).find(key => exampleSnippets[key].complexity === complexity)] && (
                  <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                    <p className="font-semibold text-sm text-gray-800 mb-2">Code Example:</p>
                    <pre>{exampleSnippets[Object.keys(exampleSnippets).find(key => exampleSnippets[key].complexity === complexity)]?.code}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Common Mistakes */}
      <div className="card card-error p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">⚠️ Common Mistakes</h3>
        <ul className="space-y-3 text-red-800">
          <li className="flex items-start gap-3">
            <span className="font-bold mt-1">✗</span>
            <span><strong>Don't count operations:</strong> We count loop iterations, not individual operations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold mt-1">✗</span>
            <span><strong>Don't include constants:</strong> O(3n + 5) is just O(n), not O(3n + 5)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold mt-1">✗</span>
            <span><strong>Sequential != Nested:</strong> Two separate O(n) loops = O(n), NOT O(n²)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold mt-1">✗</span>
            <span><strong>Space complexity:</strong> Remember to count recursive call stacks</span>
          </li>
        </ul>
      </div>

      {/* Efficiency Rankings */}
      <div className="card card-success p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Efficiency Rankings (Best to Worst)</h3>
        <div className="space-y-2">
          {Object.entries(complexityPatterns).map(([complexity, info], idx) => (
            <div key={complexity} className="flex items-center gap-3 p-3 bg-white rounded border-2 border-green-200">
              <span className="font-bold text-lg w-8 text-green-600">{idx + 1}.</span>
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: info.color
                }}
              />
              <span className="font-semibold flex-1">{complexity}</span>
              <span className="text-sm text-gray-600">{info.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Master Tricks */}
      <div style={{ backgroundColor: '#faf5ff', border: '2px solid #e9d5ff', borderRadius: '8px', padding: '24px' }}>
        <h3 className="text-lg font-semibold text-purple-900 mb-4">🎓 Master Tricks</h3>
        <ul className="space-y-3 text-purple-800">
          <li className="flex items-start gap-3">
            <span className="font-bold mt-1">→</span>
            <div>
              <strong>Divide & Conquer Pattern:</strong>
              <p className="text-sm mt-1">If algorithm divides problem in half: O(log n). At each level: O(n log n)</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold mt-1">→</span>
            <div>
              <strong>Recursion Tree:</strong>
              <p className="text-sm mt-1">Count: (number of branches)^(depth) = time complexity</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold mt-1">→</span>
            <div>
              <strong>While Loop:</strong>
              <p className="text-sm mt-1">Count how many times the condition is true. If it halves each time: O(log n)</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold mt-1">→</span>
            <div>
              <strong>Hash Table/Map:</strong>
              <p className="text-sm mt-1">Operations are O(1) average, O(n) worst case. Use it to optimize complexity!</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
