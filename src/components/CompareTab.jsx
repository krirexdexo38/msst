import React, { useState } from 'react';
import { analyzeCode, complexityPatterns } from '../utils/complexity';
import { ArrowRight } from 'lucide-react';

export const CompareTab = () => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [analysis1, setAnalysis1] = useState(null);
  const [analysis2, setAnalysis2] = useState(null);

  const handleAnalyze = () => {
    if (code1.trim()) {
      setAnalysis1(analyzeCode(code1));
    }
    if (code2.trim()) {
      setAnalysis2(analyzeCode(code2));
    }
  };

  const complexityOrder = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2^n)', 'O(n!)'];

  const getComplexityRank = (complexity) => {
    return complexityOrder.indexOf(complexity) || -1;
  };

  const getComplexityColor = (complexity) => {
    return complexityPatterns[complexity]?.color || '#6b7280';
  };

  const getComplexityLightColor = (complexity) => {
    return complexityPatterns[complexity]?.lightColor || '#f3f4f6';
  };

  const determineWinner = (c1, c2) => {
    const rank1 = getComplexityRank(c1);
    const rank2 = getComplexityRank(c2);
    if (rank1 < rank2) return 1;
    if (rank1 > rank2) return 2;
    return 0; // Tie
  };

  const renderComparisonResult = () => {
    if (!analysis1 || !analysis2) return null;

    const winner = determineWinner(analysis1.timeComplexity, analysis2.timeComplexity);
    const timeComparison = analysis1.timeComplexity === analysis2.timeComplexity ? 'Same' :
      winner === 1 ? 'Code 1 is better' : winner === 2 ? 'Code 2 is better' : 'Same';

    const spaceWinner = determineWinner(analysis1.spaceComplexity, analysis2.spaceComplexity);
    const spaceComparison = analysis1.spaceComplexity === analysis2.spaceComplexity ? 'Same' :
      spaceWinner === 1 ? 'Code 1 is better' : spaceWinner === 2 ? 'Code 2 is better' : 'Same';

    return (
      <div className="card card-gradient space-y-4 p-6">
        <h3 className="text-lg font-semibold mb-4">Comparison Results</h3>

        {/* Time Complexity Comparison */}
        <div className="grid-3">
          <div className="card p-4" style={{ backgroundColor: getComplexityLightColor(analysis1.timeComplexity), borderColor: getComplexityColor(analysis1.timeComplexity) }}>
            <p className="text-gray-600 text-xs font-semibold uppercase">Code 1</p>
            <p className="text-2xl font-bold mt-2" style={{ color: getComplexityColor(analysis1.timeComplexity) }}>
              {analysis1.timeComplexity}
            </p>
            <p className="text-gray-600 text-xs mt-2">Time</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight className="mb-2" size={24} />
            <span style={{
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '6px 8px',
              borderRadius: '6px',
              backgroundColor: winner === 1 ? '#dcfce7' : winner === 2 ? '#fee2e2' : '#e5e7eb',
              color: winner === 1 ? '#166534' : winner === 2 ? '#991b1b' : '#374151'
            }}>
              {timeComparison}
            </span>
          </div>

          <div className="card p-4" style={{ backgroundColor: getComplexityLightColor(analysis2.timeComplexity), borderColor: getComplexityColor(analysis2.timeComplexity) }}>
            <p className="text-gray-600 text-xs font-semibold uppercase">Code 2</p>
            <p className="text-2xl font-bold mt-2" style={{ color: getComplexityColor(analysis2.timeComplexity) }}>
              {analysis2.timeComplexity}
            </p>
            <p className="text-gray-600 text-xs mt-2">Time</p>
          </div>
        </div>

        {/* Space Complexity Comparison */}
        <div className="grid-3">
          <div className="card p-4" style={{ backgroundColor: getComplexityLightColor(analysis1.spaceComplexity), borderColor: getComplexityColor(analysis1.spaceComplexity) }}>
            <p className="text-gray-600 text-xs font-semibold uppercase">Code 1</p>
            <p className="text-2xl font-bold mt-2" style={{ color: getComplexityColor(analysis1.spaceComplexity) }}>
              {analysis1.spaceComplexity}
            </p>
            <p className="text-gray-600 text-xs mt-2">Space</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight className="mb-2" size={24} />
            <span style={{
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '6px 8px',
              borderRadius: '6px',
              backgroundColor: spaceWinner === 1 ? '#dcfce7' : spaceWinner === 2 ? '#fee2e2' : '#e5e7eb',
              color: spaceWinner === 1 ? '#166534' : spaceWinner === 2 ? '#991b1b' : '#374151'
            }}>
              {spaceComparison}
            </span>
          </div>

          <div className="card p-4" style={{ backgroundColor: getComplexityLightColor(analysis2.spaceComplexity), borderColor: getComplexityColor(analysis2.spaceComplexity) }}>
            <p className="text-gray-600 text-xs font-semibold uppercase">Code 2</p>
            <p className="text-2xl font-bold mt-2" style={{ color: getComplexityColor(analysis2.spaceComplexity) }}>
              {analysis2.spaceComplexity}
            </p>
            <p className="text-gray-600 text-xs mt-2">Space</p>
          </div>
        </div>

        {/* Performance Impact */}
        {winner !== 0 && (
          <div style={{
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid ' + (winner === 1 ? '#16a34a' : '#dc2626'),
            backgroundColor: winner === 1 ? '#f0fdf4' : '#fef2f2'
          }}>
            <p className="font-semibold text-gray-800 mb-2">Performance Impact</p>
            <p style={{ fontSize: '13px', color: winner === 1 ? '#166534' : '#991b1b' }}>
              {winner === 1
                ? `Code 1 is more efficient. For n=1000, Code 1 handles it better than Code 2.`
                : `Code 2 is more efficient. For n=1000, Code 2 handles it better than Code 1.`
              }
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid-2">
        {/* Code 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Code Snippet 1</h3>
          <textarea
            value={code1}
            onChange={(e) => setCode1(e.target.value)}
            placeholder="Paste first code snippet..."
            style={{ height: '256px' }}
          />
          {analysis1 && (
            <div className="card mt-4 p-4" style={{ backgroundColor: getComplexityLightColor(analysis1.timeComplexity) }}>
              <p className="text-gray-600 text-sm font-semibold uppercase">Time: {analysis1.timeComplexity}</p>
              <p className="text-gray-600 text-sm font-semibold uppercase mt-2">Space: {analysis1.spaceComplexity}</p>
            </div>
          )}
        </div>

        {/* Code 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Code Snippet 2</h3>
          <textarea
            value={code2}
            onChange={(e) => setCode2(e.target.value)}
            placeholder="Paste second code snippet..."
            style={{ height: '256px' }}
          />
          {analysis2 && (
            <div className="card mt-4 p-4" style={{ backgroundColor: getComplexityLightColor(analysis2.timeComplexity) }}>
              <p className="text-gray-600 text-sm font-semibold uppercase">Time: {analysis2.timeComplexity}</p>
              <p className="text-gray-600 text-sm font-semibold uppercase mt-2">Space: {analysis2.spaceComplexity}</p>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleAnalyze} className="btn-success">
        Compare Complexity
      </button>

      {renderComparisonResult()}
    </div>
  );
};
