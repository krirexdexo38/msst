// Complexity analysis logic
export const complexityPatterns = {
  'O(1)': {
    name: 'Constant',
    color: '#10b981',
    lightColor: '#d1fae5',
    description: 'Operation takes the same time regardless of input size',
    examples: [
      'Accessing array by index: arr[5]',
      'Hash table lookup',
      'Simple arithmetic operation'
    ]
  },
  'O(log n)': {
    name: 'Logarithmic',
    color: '#3b82f6',
    lightColor: '#dbeafe',
    description: 'Time increases logarithmically with input size (divide and conquer)',
    examples: [
      'Binary search',
      'Tree search (balanced)',
      'Divide and conquer algorithms'
    ]
  },
  'O(n)': {
    name: 'Linear',
    color: '#f59e0b',
    lightColor: '#fef3c7',
    description: 'Time increases linearly with input size',
    examples: [
      'Simple loop through array',
      'Finding element in unsorted array',
      'Counting operations'
    ]
  },
  'O(n log n)': {
    name: 'Linear Logarithmic',
    color: '#8b5cf6',
    lightColor: '#ede9fe',
    description: 'Combination of linear and logarithmic (efficient sorting)',
    examples: [
      'Merge sort',
      'Quick sort (average)',
      'Heap sort'
    ]
  },
  'O(n²)': {
    name: 'Quadratic',
    color: '#ef4444',
    lightColor: '#fee2e2',
    description: 'Time increases quadratically with input size (nested loops)',
    examples: [
      'Nested loop: for(i) for(j)',
      'Bubble sort',
      'Selection sort'
    ]
  },
  'O(n³)': {
    name: 'Cubic',
    color: '#dc2626',
    lightColor: '#fecaca',
    description: 'Three nested loops or triple iteration',
    examples: [
      'Triple nested loop',
      'Matrix multiplication',
      'Some dynamic programming solutions'
    ]
  },
  'O(2^n)': {
    name: 'Exponential',
    color: '#991b1b',
    lightColor: '#fee2e2',
    description: 'Time doubles with each additional input element',
    examples: [
      'Recursive Fibonacci',
      'Permutations',
      'Subset generation'
    ]
  },
  'O(n!)': {
    name: 'Factorial',
    color: '#7c2d12',
    lightColor: '#fed7aa',
    description: 'Extremely slow - all permutations',
    examples: [
      'Generating all permutations',
      'Solving TSP by brute force'
    ]
  }
};

export const analyzeCode = (code) => {
  // Remove comments
  let cleanCode = code
    .replace(/#.*$/gm, '') // Remove Python comments
    .replace(/\/\/.*$/gm, '') // Remove JS comments
    .replace(/\/\*[\s\S]*?\*\//gm, ''); // Remove block comments

  // Count nested loop depth
  let maxDepth = 0;
  let currentDepth = 0;
  
  for (let i = 0; i < cleanCode.length; i++) {
    if (cleanCode[i] === '{' || cleanCode[i] === ':') {
      // Check if it's a for/while loop
      const before = cleanCode.substring(Math.max(0, i - 20), i);
      if (/\b(for|while)\b/.test(before)) {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
      }
    } else if (cleanCode[i] === '}') {
      currentDepth = Math.max(0, currentDepth - 1);
    }
  }

  let analysis = {
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    explanation: 'No loops detected - constant time operation',
    confidence: 0.9
  };

  // Check for recursive patterns
  const hasRecursion = /(\w+\s*\([\w\s,]*\)[\s\n]*\{[\s\S]*?\1\s*\()/m.test(cleanCode);
  
  // Check for specific patterns
  const patterns = {
    logarithmic: /log|binary search|divide.*conquer/i,
    exponential: /fibonacci|2\^n|pow.*2/i,
    factorial: /permutation|factorial|!/i,
  };

  // Analyze based on patterns
  if (code.match(/log.*n/i) || patterns.logarithmic.test(code)) {
    analysis.timeComplexity = 'O(log n)';
    analysis.explanation = 'Logarithmic complexity detected - likely binary search or divide & conquer';
  } else if (patterns.factorial.test(code)) {
    analysis.timeComplexity = 'O(n!)';
    analysis.explanation = 'Factorial complexity detected - all permutations or combinations';
  } else if (patterns.exponential.test(code)) {
    analysis.timeComplexity = 'O(2^n)';
    analysis.explanation = 'Exponential complexity detected - likely recursive branching';
  } else if (hasRecursion && maxDepth >= 2) {
    analysis.timeComplexity = 'O(2^n)';
    analysis.explanation = 'Recursive call with branching detected - likely exponential';
  } else if (maxDepth === 3) {
    analysis.timeComplexity = 'O(n³)';
    analysis.explanation = 'Three nested loops detected - cubic complexity';
  } else if (maxDepth === 2) {
    // Check if it's merge sort pattern
    if (/merge|sort/.test(code)) {
      analysis.timeComplexity = 'O(n log n)';
      analysis.explanation = 'Nested structure with merge/sort pattern detected - O(n log n)';
    } else {
      analysis.timeComplexity = 'O(n²)';
      analysis.explanation = 'Two nested loops detected - quadratic complexity';
    }
  } else if (maxDepth === 1) {
    analysis.timeComplexity = 'O(n)';
    analysis.explanation = 'Single loop detected - linear complexity';
  }

  // Determine space complexity
  if (analysis.timeComplexity === 'O(2^n)' || analysis.timeComplexity === 'O(n!)') {
    analysis.spaceComplexity = 'O(n)'; // Recursion stack
  } else if (analysis.timeComplexity === 'O(n log n)') {
    analysis.spaceComplexity = 'O(n)'; // Merge sort requires O(n) space
  } else if (analysis.timeComplexity === 'O(n²)' || analysis.timeComplexity === 'O(n³)') {
    analysis.spaceComplexity = 'O(1)'; // Usually just variables
  } else {
    analysis.spaceComplexity = 'O(1)'; // Constant space
  }

  // Detect if using additional data structures
  if (/array|list|map|dict|set|hash/.test(code)) {
    if (analysis.timeComplexity !== 'O(1)') {
      analysis.spaceComplexity = `O(${analysis.timeComplexity.slice(2)})`;
    } else {
      analysis.spaceComplexity = 'O(n)';
    }
  }

  return analysis;
};

export const calculateComplexityValue = (complexity, n) => {
  const complexityMap = {
    'O(1)': () => 1,
    'O(log n)': () => Math.log2(n),
    'O(n)': () => n,
    'O(n log n)': () => n * Math.log2(n),
    'O(n²)': () => n * n,
    'O(n³)': () => n * n * n,
    'O(2^n)': () => Math.min(Math.pow(2, n), 1000000), // Cap to prevent overflow
    'O(n!)': () => Math.min(factorial(n), 1000000) // Cap to prevent overflow
  };

  return (complexityMap[complexity] || (() => 1))();
};

const factorial = (n) => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
    if (result > 1000000) return 1000000; // Cap for safety
  }
  return result;
};

export const exampleSnippets = {
  'Constant Time': {
    code: `// Accessing an element
arr = [1, 2, 3, 4, 5]
element = arr[2]  # O(1)
print(element)`,
    complexity: 'O(1)',
    explanation: 'Direct array access by index is always constant time'
  },
  'Linear Search': {
    code: `# Linear search
def linear_search(arr, target):
    for i in range(len(arr)):  # O(n)
        if arr[i] == target:
            return i
    return -1`,
    complexity: 'O(n)',
    explanation: 'Iterates through array once - linear complexity'
  },
  'Binary Search': {
    code: `# Binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1  # O(log n)`,
    complexity: 'O(log n)',
    explanation: 'Divides search space in half each iteration - logarithmic'
  },
  'Bubble Sort': {
    code: `# Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):  # O(n²)
        for j in range(0, n-i-1):  # Nested loop
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    complexity: 'O(n²)',
    explanation: 'Nested loops iterate n times each - quadratic complexity'
  },
  'Fibonacci (Recursive)': {
    code: `# Recursive Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)  # O(2^n)`,
    complexity: 'O(2^n)',
    explanation: 'Two recursive calls per invocation create exponential tree'
  },
  'Merge Sort': {
    code: `# Merge Sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)  # O(n log n)`,
    complexity: 'O(n log n)',
    explanation: 'Log n levels of recursion with n work at each level'
  }
};
