const path = require('path');
const envFile = require('../lib/util');

test('should return null', () => {
    expect(envFile('FOO')).toBe(null);
});

test('should return set default value', () => {
    expect(envFile('FOO', 'BAR')).toBe('BAR')
});

test('should return WORLD', () => {
    process.env.HELLO = 'WORLD';
    expect(envFile('HELLO')).toBe('WORLD');
    delete process.env.HELLO;
});

test('should return WORLD from file', () => {
    process.env.HELLO_FILE = path.resolve(__dirname, 'env/hello');
    expect(envFile('HELLO')).toBe('WORLD');
    delete process.env.HELLO_FILE;
});