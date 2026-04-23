// Algorithm Complexity Calculator

// Tab switching
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        button.classList.add('active');
        document.getElementById(button.dataset.tab + '-tab').classList.add('active');
    });
});

// Example code snippets
const examples = {
    linear: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,

    quadratic: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,

    logarithmic: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,

    exponential: `def fibonacci_recursive(n):
    if n <= 1:
        return n
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)`
};

// Load example code
document.querySelectorAll('.example-btn').forEach(button => {
    button.addEventListener('click', () => {
        const example = examples[button.dataset.example];
        document.getElementById('codeInput').value = example;
    });
});

// Complexity analysis function
function analyzeComplexity(code) {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line);

    let timeComplexity = 'O(1)';
    let spaceComplexity = 'O(1)';
    let explanation = [];

    // Check for loops
    const forLoops = lines.filter(line => line.includes('for ') || line.includes('while '));
    const nestedLoops = lines.filter(line => (line.includes('for ') || line.includes('while ')) &&
                                           lines.some(other => other !== line &&
                                                    (other.includes('for ') || other.includes('while '))));

    // Check for recursion
    const recursion = lines.some(line => line.includes('def ') && lines.some(other =>
        other.includes(line.split(' ')[1].split('(')[0])));

    // Analyze patterns
    if (recursion && lines.some(line => line.includes('fibonacci'))) {
        timeComplexity = 'O(2^n)';
        spaceComplexity = 'O(n)';
        explanation.push('Recursive Fibonacci has exponential time complexity due to redundant calculations');
        explanation.push('Space complexity is O(n) due to the call stack depth');
    } else if (nestedLoops.length > 0) {
        timeComplexity = 'O(n²)';
        spaceComplexity = 'O(1)';
        explanation.push('Nested loops multiply complexities: O(n) × O(n) = O(n²)');
    } else if (forLoops.length > 0 && lines.some(line => line.includes('mid ='))) {
        timeComplexity = 'O(log n)';
        spaceComplexity = 'O(1)';
        explanation.push('Binary search halves the search space each iteration');
    } else if (forLoops.length > 0) {
        timeComplexity = 'O(n)';
        spaceComplexity = 'O(1)';
        explanation.push('Single loop iterates through all elements once');
    } else {
        explanation.push('No loops detected - likely constant time O(1)');
    }

    // Check for additional space usage
    if (lines.some(line => line.includes('new ') || line.includes('[]') || line.includes('list'))) {
        spaceComplexity = 'O(n)';
        explanation.push('Additional space allocated proportional to input size');
    }

    return {
        time: timeComplexity,
        space: spaceComplexity,
        explanation: explanation.join('. ')
    };
}

// Analyze button
document.getElementById('analyzeBtn').addEventListener('click', () => {
    const code = document.getElementById('codeInput').value;
    if (!code.trim()) {
        alert('Please enter some code to analyze');
        return;
    }

    const result = analyzeComplexity(code);

    document.getElementById('timeComplexity').textContent = result.time;
    document.getElementById('timeComplexity').dataset.complexity = result.time;
    document.getElementById('spaceComplexity').textContent = result.space;
    document.getElementById('spaceComplexity').dataset.complexity = result.space;
    document.getElementById('explanation').textContent = result.explanation;

    // Update visualization
    updateChart(result.time);
});

// Chart setup
let complexityChart;

function updateChart(timeComplexity) {
    const ctx = document.getElementById('complexityChart').getContext('2d');

    // Generate data points
    const nValues = [];
    const complexities = {
        'O(1)': [],
        'O(log n)': [],
        'O(n)': [],
        'O(n log n)': [],
        'O(n²)': [],
        'O(2^n)': []
    };

    for (let n = 1; n <= 100; n += 5) {
        nValues.push(n);
        complexities['O(1)'].push(1);
        complexities['O(log n)'].push(Math.log2(n) || 1);
        complexities['O(n)'].push(n);
        complexities['O(n log n)'].push(n * (Math.log2(n) || 1));
        complexities['O(n²)'].push(n * n);
        complexities['O(2^n)'].push(Math.pow(2, Math.min(n, 10))); // Cap for visualization
    }

    const datasets = [
        {
            label: 'O(1)',
            data: complexities['O(1)'],
            borderColor: '#48bb78',
            backgroundColor: 'rgba(72, 187, 120, 0.1)',
            hidden: timeComplexity !== 'O(1)'
        },
        {
            label: 'O(log n)',
            data: complexities['O(log n)'],
            borderColor: '#4299e1',
            backgroundColor: 'rgba(66, 153, 225, 0.1)',
            hidden: timeComplexity !== 'O(log n)'
        },
        {
            label: 'O(n)',
            data: complexities['O(n)'],
            borderColor: '#ed8936',
            backgroundColor: 'rgba(237, 137, 54, 0.1)',
            hidden: timeComplexity !== 'O(n)'
        },
        {
            label: 'O(n²)',
            data: complexities['O(n²)'],
            borderColor: '#e53e3e',
            backgroundColor: 'rgba(229, 62, 62, 0.1)',
            hidden: timeComplexity !== 'O(n²)'
        },
        {
            label: 'O(2^n)',
            data: complexities['O(2^n)'],
            borderColor: '#9f7aea',
            backgroundColor: 'rgba(159, 122, 234, 0.1)',
            hidden: timeComplexity !== 'O(2^n)'
        }
    ];

    if (complexityChart) {
        complexityChart.destroy();
    }

    complexityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: nValues,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Algorithm Complexity Growth'
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Input Size (n)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Operations/Time'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Compare functionality
document.getElementById('compareBtn').addEventListener('click', () => {
    const code1 = document.getElementById('code1').value;
    const code2 = document.getElementById('code2').value;

    if (!code1.trim() || !code2.trim()) {
        alert('Please enter code for both algorithms');
        return;
    }

    const result1 = analyzeComplexity(code1);
    const result2 = analyzeComplexity(code2);

    const compareResults = document.getElementById('compareResults');
    compareResults.innerHTML = `
        <h3>Comparison Results</h3>
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <div style="flex: 1; padding: 15px; background: #e8f4fd; border-radius: 8px;">
                <h4>Algorithm 1</h4>
                <p><strong>Time:</strong> ${result1.time}</p>
                <p><strong>Space:</strong> ${result1.space}</p>
            </div>
            <div style="flex: 1; padding: 15px; background: #fde8e8; border-radius: 8px;">
                <h4>Algorithm 2</h4>
                <p><strong>Time:</strong> ${result2.time}</p>
                <p><strong>Space:</strong> ${result2.space}</p>
            </div>
        </div>
        <div style="padding: 15px; background: #f0f8e8; border-radius: 8px;">
            <h4>Analysis</h4>
            <p>${getComparisonAnalysis(result1, result2)}</p>
        </div>
    `;
});

function getComparisonAnalysis(result1, result2) {
    const complexities = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)', 'O(n!)'];
    const index1 = complexities.indexOf(result1.time);
    const index2 = complexities.indexOf(result2.time);

    if (index1 < index2) {
        return `Algorithm 1 is more efficient with ${result1.time} vs ${result2.time} time complexity.`;
    } else if (index1 > index2) {
        return `Algorithm 2 is more efficient with ${result2.time} vs ${result1.time} time complexity.`;
    } else {
        return `Both algorithms have similar time complexity (${result1.time}).`;
    }
}

// Initialize with empty chart
document.addEventListener('DOMContentLoaded', () => {
    updateChart('O(1)');
});