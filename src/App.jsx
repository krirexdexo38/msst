import React, { useState } from 'react';
import { AnalyzeTab } from './components/AnalyzeTab';
import { VisualizationTab } from './components/VisualizationTab';
import { LearnTab } from './components/LearnTab';
import { CompareTab } from './components/CompareTab';
import { BarChart3, BookOpen, Zap, Scale } from 'lucide-react';
import './styles.css'

function App() {
  const [activeTab, setActiveTab] = useState('analyze')

  const tabs = [
    {
      id: 'analyze',
      label: 'Analyze',
      icon: Zap,
      component: AnalyzeTab
    },
    {
      id: 'visualize',
      label: 'Visualize',
      icon: BarChart3,
      component: VisualizationTab
    },
    {
      id: 'learn',
      label: 'Learn',
      icon: BookOpen,
      component: LearnTab
    },
    {
      id: 'compare',
      label: 'Compare',
      icon: Scale,
      component: CompareTab
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AnalyzeTab;

  return (
    <div className="container-main">
      {/* Header */}
      <div className="header">
        <div className="container-max">
          <div className="header-content">
            <div>
              <h1>Algorithm Complexity Calculator</h1>
              <p>Analyze Big O notation, visualize complexity growth, and learn optimization techniques</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        {/* Tab Navigation */}
        <div className="tab-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? 'tab-btn tab-btn-active' : 'tab-btn tab-btn-inactive'}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="content-container">
          <ActiveComponent />
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="container-max">
          <p>Learn algorithm complexity analysis with interactive tools</p>
          <div className="footer-content">
            <span>🎓 Educational Tool</span>
            <span>•</span>
            <span>📊 Real-time Analysis</span>
            <span>•</span>
            <span>🚀 No Backend Required</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
