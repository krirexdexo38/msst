import React, { useState } from 'react';
import { analyzeCode, exampleSnippets, complexityPatterns } from '../utils/complexity';
import { Copy, Download } from 'lucide-react';

export const AnalyzeTab = () => {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    if (code.trim()) {
      const result = analyzeCode(code);
      setAnalysis(result);
    }
  };

  const loadExample = (exampleName) => {
    const snippet = exampleSnippets[exampleName];
    if (snippet) {
      setCode(snippet.code);
      setAnalysis(null);
    }
  };

  const getComplexityColor = (complexity) => {
    return complexityPatterns[complexity]?.color || '#6b7280';
  };

  const getComplexityLightColor = (complexity) => {
    return complexityPatterns[complexity]?.lightColor || '#f3f4f6';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Code Input</h3>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here (Python or pseudocode)...&#10;&#10;Example:&#10;for i in range(n):&#10;    for j in range(n):&#10;        print(i, j)"
          style={{ height: '256px' }}
        />
      </div>

      <div className="flex gap-3 flex-wrap">
        <button onClick={handleAnalyze} className="btn-primary">
          Analyze Code
        </button>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(exampleSnippets).map((name) => (
            <button
              key={name}
              onClick={() => loadExample(name)}
              className="btn-secondary"
              style={{ padding: '10px 16px', fontSize: '12px' }}
            >
              Load: {name}
            </button>
          ))}
        </div>
      </div>

      {analysis && (
        <div className="card card-gradient space-y-4">
          <div className="grid-2">
            <div className="card p-4" style={{ backgroundColor: getComplexityLightColor(analysis.timeComplexity), borderColor: getComplexityColor(analysis.timeComplexity) }}>
              <p className="text-gray-600 text-sm font-semibold uppercase">Time Complexity</p>
              <p className="text-3xl font-bold mt-2" style={{ color: getComplexityColor(analysis.timeComplexity) }}>
                {analysis.timeComplexity}
              </p>
              <p className="text-gray-600 text-xs mt-2">
                {complexityPatterns[analysis.timeComplexity]?.name}
              </p>
            </div>

            <div className="card p-4" style={{ backgroundColor: getComplexityLightColor(analysis.spaceComplexity), borderColor: getComplexityColor(analysis.spaceComplexity) }}>
              <p className="text-gray-600 text-sm font-semibold uppercase">Space Complexity</p>
              <p className="text-3xl font-bold mt-2" style={{ color: getComplexityColor(analysis.spaceComplexity) }}>
                {analysis.spaceComplexity}
              </p>
              <p className="text-gray-600 text-xs mt-2">
                {complexityPatterns[analysis.spaceComplexity]?.name}
              </p>
            </div>
          </div>

          <div className="card card-info p-4">
            <p className="text-sm font-semibold text-gray-700">Analysis</p>
            <p className="text-gray-600 mt-2">{analysis.explanation}</p>
          </div>

          <div className="card p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Why this complexity?</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-0.5">•</span>
                <span>{complexityPatterns[analysis.timeComplexity]?.description}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">•</span>
                <span>Common use cases: {complexityPatterns[analysis.timeComplexity]?.examples?.[0]}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
