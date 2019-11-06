const exer1 = require('../exercise1');

describe('fizzBuss', () => {
    it('should throw an exception if input is not a number', () => {
        const args = [null, undefined, 'hello', NaN];
        args.forEach((a) => {
            expect(() => { exer1.fizzBuzz('hello'); }).toThrow();
        });
    });
    it('should return FizzBuzz if input can be divided by both 3 and 5', () => {
        const res = exer1.fizzBuzz(15);
        expect(res).toBe('FizzBuzz');
    });
    it('should return Fizz if input can only be divided by 3', () => {
        const res = exer1.fizzBuzz(3);
        expect(res).toBe('Fizz');
    });
    it('should return Buzz if input can only be divided by 5', () => {
        const res = exer1.fizzBuzz(5);
        expect(res).toBe('Buzz');
    });
    it('should return input if input can neither be divided by 3 nor 5', () => {
        const res = exer1.fizzBuzz(2);
        expect(res).toBe(2);
    });
});