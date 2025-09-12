// handles numbers logic
// generates 5 random numbers 1-69, no duplicates
// 6th number is random powerball number between 1 and 26
// returns array with ascending sorted numbers in 0-4 indeces, the 5th index being the powerball

function numbersArray() {
    const numbersArray = generateWhiteBalls();
    numbersArray.sort((a, b) => a - b);
    numbersArray.push(generatePowerBall());
    return numbersArray;
}

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

function generatePowerBall() {
    return Math.floor((Math.random() * 26) + 1);
}

export {
    generateWhiteBalls,
    generatePowerBall,
    numbersArray
}

