import { generateWhiteBalls, generatePowerBall, numbersArray } from '../generateNumbers.js'

describe('generatePowerBall', () => {
    it('should return an integer', () => {
        const powerBall = generatePowerBall();
        expect(Number.isInteger(powerBall)).toBeTruthy();
    })

    it('should not return any number less than 1', () => {
        const powerBall = generatePowerBall();
        expect(powerBall).toBeGreaterThanOrEqual(1);
    })

    it('should not return any number greater than 26', () => {
        const powerBall = generatePowerBall();
        expect(powerBall).toBeLessThanOrEqual(26);
    })
}) 

describe('generateWhiteBalls', () => {

    it('should return an array', () => {
    const result = generateWhiteBalls();
    expect(Array.isArray(result)).toBeTruthy();
    })

    it('should return an array of integers', () => {
        const result = generateWhiteBalls();
        result.forEach(num => {
            expect(Number.isInteger(num)).toBeTruthy();
        })
    })

    it('should return an array of length 5', () => {
        const result = generateWhiteBalls();
        expect(result.length).toBe(5);
    })

    it('should not contain any value greater than 69', () => {
        const result = generateWhiteBalls();
        result.forEach(num => {
            expect(num).toBeLessThanOrEqual(69);
        })
    })

    it('should not contain any value less than 1', () => {
        const result = generateWhiteBalls();
        result.forEach(num => {
            expect(num).toBeGreaterThanOrEqual(1);
        })
    })

    it('should contain unique numbers', () => {
        const result = generateWhiteBalls();
        const uniqueNumbers = new Set(result);
        expect(uniqueNumbers.size).toBe(5);
    });

}) 

describe('numbersArray', () => {

    it('should return an array', () => {
        const result = numbersArray();
        expect(Array.isArray(result)).toBeTruthy();
    })

    it('should return an array of integers', () => {
        const result = numbersArray();
        result.forEach(num => {
            expect(Number.isInteger(num)).toBeTruthy();
        })
    })

    it('should return an array of length 6', () => {
        const result = numbersArray();
        expect(result.length).toBe(6);
    })

    it('should have last number (Powerball) between 1 and 26', () => {
        const result = numbersArray();
        const powerBall = result[5];
        expect(powerBall).toBeGreaterThanOrEqual(1);
        expect(powerBall).toBeLessThanOrEqual(26);
    })

    it('should have first 5 numbers between 1 and 69', () => {
        const result = numbersArray();
        const whiteBalls = result.slice(0, 5);

        whiteBalls.forEach(num => {
            expect(num).toBeGreaterThanOrEqual(1);
            expect(num).toBeLessThanOrEqual(69);
        })
    })

    it('should have first 5 numbers be unique', () => {
        const result = numbersArray();
        const whiteBalls = result.slice(0, 5);

        const uniqueNumbers = new Set(whiteBalls);
        expect(uniqueNumbers.size).toBe(5);
    })

    it('should have first 5 numbers be in ascending order', () => {
        const result = numbersArray();
        const whiteBalls = result.slice(0, 5);

        for (let i = 1; i < whiteBalls.length; i++) {
            expect(whiteBalls[i]).toBeGreaterThan(whiteBalls[i - 1]);
        }
    })
}) 