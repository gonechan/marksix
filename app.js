// Toggle banker configuration visibility
document.getElementById('useBanker').addEventListener('change', function() {
    document.getElementById('bankerConfig').classList.toggle('hidden', !this.checked);
});

/**
 * Generate random integers without repetition using Fisher-Yates shuffle
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @param {number} count - Number of integers to generate
 * @returns {number[]} Array of random non-repeating integers
 */
function generateRandomIntegers(min, max, count) {
    const range = max - min + 1;
    
    if (count > range) {
        throw new Error(`Cannot draw ${count} numbers from range ${min}-${max} (only ${range} available)`);
    }

    // Create array of all numbers in range
    const numbers = Array.from({ length: range }, (_, i) => min + i);

    // Fisher-Yates shuffle to select first 'count' numbers
    for (let i = 0; i < count; i++) {
        const j = Math.floor(Math.random() * (range - i)) + i;
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers.slice(0, count).sort((a, b) => a - b);
}

/**
 * Randomly select banker numbers from drawn numbers
 * @param {number[]} numbers - Array of drawn numbers
 * @param {number} bankerCount - How many numbers to select as bankers
 * @returns {number[]} Array of banker numbers
 */
function selectRandomBankers(numbers, bankerCount) {
    if (bankerCount >= numbers.length) {
        throw new Error(`Cannot select ${bankerCount} banker numbers from ${numbers.length} drawn numbers`);
    }

    const shuffled = [...numbers];
    const len = shuffled.length;
    
    // Fisher-Yates shuffle to select first 'bankerCount' numbers
    for (let i = 0; i < bankerCount; i++) {
        const j = Math.floor(Math.random() * (len - i)) + i;
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, bankerCount).sort((a, b) => a - b);
}

/**
 * Validate user input
 * @returns {object} { isValid: boolean, error: string }
 */
function validateInput() {
    const minRange = parseInt(document.getElementById('minRange').value);
    const maxRange = parseInt(document.getElementById('maxRange').value);
    const drawCount = parseInt(document.getElementById('drawCount').value);
    const numbersPerDraw = parseInt(document.getElementById('numbersPerDraw').value);
    const useBanker = document.getElementById('useBanker').checked;
    const bankerCount = useBanker ? parseInt(document.getElementById('bankerCount').value) : 0;

    // Validate range
    if (isNaN(minRange) || isNaN(maxRange)) {
        return { isValid: false, error: 'Please enter valid minimum and maximum numbers' };
    }

    if (minRange >= maxRange) {
        return { isValid: false, error: 'Minimum number must be less than maximum number' };
    }

    // Validate draw count
    if (isNaN(drawCount) || drawCount < 1 || drawCount > 100) {
        return { isValid: false, error: 'Number of draws must be between 1 and 100' };
    }

    // Validate numbers per draw
    if (isNaN(numbersPerDraw) || numbersPerDraw < 1) {
        return { isValid: false, error: 'Numbers per draw must be at least 1' };
    }

    const rangeSize = maxRange - minRange + 1;
    if (numbersPerDraw > rangeSize) {
        return { 
            isValid: false, 
            error: `Cannot draw ${numbersPerDraw} numbers from range ${minRange}-${maxRange} (only ${rangeSize} available)` 
        };
    }

    // Validate banker count
    if (useBanker) {
        if (isNaN(bankerCount) || bankerCount < 1) {
            return { isValid: false, error: 'Number of banker entries must be at least 1' };
        }

        if (bankerCount >= numbersPerDraw) {
            return { 
                isValid: false, 
                error: `Number of bankers (${bankerCount}) must be less than numbers per draw (${numbersPerDraw})` 
            };
        }
    }

    return { isValid: true };
}

/**
 * Generate and display lottery draws
 */
function generateDraws() {
    // Clear previous errors and results
    const errorDiv = document.getElementById('errorMessage');
    const resultsDiv = document.getElementById('resultsSection');
    errorDiv.classList.add('hidden');
    resultsDiv.classList.add('hidden');

    // Validate input
    const validation = validateInput();
    if (!validation.isValid) {
        errorDiv.textContent = validation.error;
        errorDiv.classList.remove('hidden');
        return;
    }

    // Get input values
    const minRange = parseInt(document.getElementById('minRange').value);
    const maxRange = parseInt(document.getElementById('maxRange').value);
    const drawCount = parseInt(document.getElementById('drawCount').value);
    const numbersPerDraw = parseInt(document.getElementById('numbersPerDraw').value);
    const useBanker = document.getElementById('useBanker').checked;
    const bankerCount = useBanker ? parseInt(document.getElementById('bankerCount').value) : 0;

    try {
        // Generate draws
        const draws = [];
        for (let i = 0; i < drawCount; i++) {
            // Generate the main draw
            const numbers = generateRandomIntegers(minRange, maxRange, numbersPerDraw);
            
            // Select random bankers from the drawn numbers if enabled
            let bankerNumbers = [];
            if (useBanker) {
                bankerNumbers = selectRandomBankers(numbers, bankerCount);
            }

            draws.push({
                numbers: numbers,
                banker: bankerNumbers
            });
        }

        // Display results
        displayResults(draws);
        resultsDiv.classList.remove('hidden');

    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('hidden');
    }
}

/**
 * Display lottery draw results
 * @param {array} draws - Array of draw objects
 */
function displayResults(draws) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    draws.forEach((draw, index) => {
        const drawDiv = document.createElement('div');
        drawDiv.className = 'draw-container';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'draw-title';
        titleDiv.textContent = `Draw ${index + 1}`;

        const numbersDiv = document.createElement('div');
        numbersDiv.className = 'numbers-grid';

        draw.numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = 'number-ball';
            if (draw.banker.includes(num)) {
                ball.classList.add('banker');
            }
            ball.textContent = num;
            numbersDiv.appendChild(ball);
        });

        drawDiv.appendChild(titleDiv);
        drawDiv.appendChild(numbersDiv);

        if (draw.banker.length > 0) {
            const bankerLabel = document.createElement('div');
            bankerLabel.className = 'banker-label';
            bankerLabel.textContent = `🏦 Banker entries: ${draw.banker.join(', ')}`;
            drawDiv.appendChild(bankerLabel);
        }

        resultsContainer.appendChild(drawDiv);
    });
}
