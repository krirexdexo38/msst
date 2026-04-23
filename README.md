# Algorithm Complexity Calculator

A comprehensive web-based tool for analyzing, visualizing, and learning about algorithm complexity (Big O notation).

## Features

### 1. **Analyze Tab**
- Paste code snippets in Python or pseudocode
- Automatic complexity analysis detecting:
  - Time Complexity (Big O notation)
  - Space Complexity
  - Detailed explanations of analysis
- Load pre-built examples:
  - Constant Time O(1)
  - Linear Search O(n)
  - Binary Search O(log n)
  - Bubble Sort O(n²)
  - Recursive Fibonacci O(2^n)
  - Merge Sort O(n log n)

### 2. **Visualize Tab**
- Interactive graphs showing complexity growth
- Compare multiple complexity classes on the same chart
- Adjustable input size range (n = 10 to 1000)
- Color-coded complexity classes
- Statistics table showing operations at different input sizes

### 3. **Learn Tab**
- Comprehensive Big O complexity guide
- Tips for analyzing code
- Efficiency rankings (best to worst)
- Common mistakes to avoid
- Master tricks for complex analysis

### 4. **Compare Tab**
- Side-by-side code analysis
- Direct complexity comparison
- Visual indicators showing which is more efficient
- Performance impact analysis

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

## Supported Complexity Classes

- O(1) - Constant Time
- O(log n) - Logarithmic
- O(n) - Linear
- O(n log n) - Linear Logarithmic
- O(n²) - Quadratic
- O(n³) - Cubic
- O(2^n) - Exponential
- O(n!) - Factorial

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── components/
│   ├── AnalyzeTab.jsx     # Code analysis
│   ├── VisualizationTab.jsx # Graphs and charts
│   ├── LearnTab.jsx       # Educational content
│   └── CompareTab.jsx     # Code comparison
└── utils/
    └── complexity.js      # Analysis logic
```

## Key Features

✅ Real-time code analysis
✅ Interactive complexity visualization
✅ Educational content with tips and tricks
✅ Side-by-side code comparison
✅ Color-coded complexity classes
✅ Responsive design
✅ No backend required - 100% client-side

## Educational Value

Perfect for:
- Learning Big O notation
- Interview preparation
- Understanding algorithm optimization
- Teaching complexity analysis

---

**Happy Learning! 🚀**
