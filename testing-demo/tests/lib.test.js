const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

// Test number
describe('absolute', () => {
    it('should return positive when input is positive', () => {
        const res = lib.absolute(1);
        expect(res).toBe(1);
    });
    
    it('should return positive when input is negative', () => {
        const res = lib.absolute(-1);
        expect(res).toBe(1);
    });
    
    it('should return 0 when input is 0', () => {
        const res = lib.absolute(0);
        expect(res).toBe(0);
    }); 
});

// Test string
describe('greet', () => {
    it('should return the greeting message', () => {
        const res = lib.greet('Elvis');
        expect(res).toMatch(/Elvis/);
        expect(res).toContain('Elvis');
    })
});

// Test array
describe('getCurrency', () => {
    it('should return supporte currency', () => {
        const res = lib.getCurrencies();
        expect(res).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD'])); // Sequence doesn't matter
    });
});

// Test object
describe('getProduct', () => {
    it('should return the product with given id', () => {
        const res = lib.getProduct(1);

        expect(res).toMatchObject({id: 1, price: 10});  // As long as those properies here matches are okay
        expect(res).toHaveProperty('id', 1);    // Only checks the property I care
    });
});

// Test exception
describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        args = [null, undefined, NaN, '', 0, false];
        args.forEach((a) => {
            // Here needs to use a callback function since at the original function input null won't return.
            expect(() => {lib.registerUser(a)}).toThrow();
        });
    });

    it('should return an user object if a valid username is provided', () => {
        const res = lib.registerUser('Elvis');
        expect(res).toMatchObject({ username: 'Elvis'});
        expect(res.id).toBeGreaterThan(0);
    });
});

// Create a mock function
describe('applyDiscount', () => {
    it('should apply 10% discount to price if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake db connection...');
            return { id: customerId, points: 20 };
        }
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

// Use jest to write mock function:
describe('notifyCustomer', () => {
    it('should send an email to customer', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        // Check all arguments passed through these functions
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/); 
    });
});