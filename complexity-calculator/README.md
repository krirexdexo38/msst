# Algorithm Complexity Calculator

A web-based tool for analyzing and visualizing the time and space complexity of algorithms.

## Features

### Core Functionality
- **Code Input**: Paste Python or pseudocode snippets
- **Complexity Analysis**: Automatic detection of time and space complexity
- **Visualization**: Interactive charts showing complexity growth
- **Educational Content**: Learn about different complexity classes
- **Comparison Mode**: Compare two algorithms side-by-side

### Supported Complexities
- O(1) - Constant time
- O(log n) - Logarithmic time
- O(n) - Linear time
- O(n²) - Quadratic time
- O(2^n) - Exponential time

## How to Use

1. **Analyze Tab**:
   - Paste your code in the text area
   - Click on example buttons to load sample code
   - Click "Analyze Complexity" to see results

2. **Learn Tab**:
   - Browse different complexity classes
   - View example code for each type

3. **Compare Tab**:
   - Enter two algorithms
   - Compare their complexities

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- Uses Chart.js for data visualization
- Client-side analysis (no backend required)
- Responsive design for mobile and desktop

## Running the Application

Simply open `index.html` in a web browser. No server required.

## Algorithm Analysis Logic

The analyzer detects:
- Loop structures (for, while)
- Nested loops
- Recursive functions
- Array/list allocations

Note: This is a simplified analyzer for educational purposes. For production code, use proper profiling tools.