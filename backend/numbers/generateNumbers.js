/**
 * Combines white balls and powerball into an array.
 * White balls are sorted in ascending order, and the Powerball is added at the end.
 *
 * @scope private
 * @returns {number[]} Array of integers: first 5 are white balls (sorted in ascending order), 6th is the Powerball
 */
function numbersArray() {
    const numbersArray = generateWhiteBalls();
    numbersArray.sort((a, b) => a - b);
    numbersArray.push(generatePowerBall());
    return numbersArray;
}

/**
 * Generates unique white ball lottery numbers.
 *
 * @scope private
 * @returns {number[]} Array of 5 unique integers ranging from 1 to 69 (inclusive)
 */
function generateWhiteBalls() {
    const whiteBallArray = [];

    while (whiteBallArray.length < 5) {
        const randomNum = Math.floor(Math.random() * 69) + 1;
        if (!whiteBallArray.includes(randomNum)) {
            whiteBallArray.push(randomNum);
        }
    }
    return whiteBallArray;
}

/**
 * Generates the Powerball lottery number.
 *
 * @scope private
 * @returns {number} An integer between 1 and 26 (inclusive)
 */
function generatePowerBall() {
    return Math.floor((Math.random() * 26) + 1);
}

export {
    generateWhiteBalls,
    generatePowerBall,
    numbersArray
}

