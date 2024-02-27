import tokenizeInput from './tokenizeInput';

describe('tokenizeInput', () => {
    test('should tokenize input with quoted arguments', () => {
        const input = 'add "album title" "album artist"';
        const expectedTokens = ['add', '"album title"', '"album artist"'];
        expect(tokenizeInput(input)).toEqual(expectedTokens);
    });

    test('should handle input without quoted arguments', () => {
        const input = 'add title artist';
        const expectedTokens = ['add', 'title', 'artist'];
        expect(tokenizeInput(input)).toEqual(expectedTokens);
    });

    test('should handle input with both quoted and unquoted arguments', () => {
        const input = 'add "album title" artist';
        const expectedTokens = ['add', '"album title"', 'artist'];
        expect(tokenizeInput(input)).toEqual(expectedTokens);
    });

    test('should handle input with single quoted argument', () => {
        const input = "add 'title'";
        const expectedTokens = ['add', "'title'"];
        expect(tokenizeInput(input)).toEqual(expectedTokens);
    });

    test('should handle input with empty quoted argument', () => {
        const input = 'add "" artist';
        const expectedTokens = ['add', '""', 'artist'];
        expect(tokenizeInput(input)).toEqual(expectedTokens);
    });

    test('should handle input with multiple spaces in between', () => {
        const input = 'add    title    artist';
        const expectedTokens = ['add', 'title', 'artist'];
        expect(tokenizeInput(input)).toEqual(expectedTokens);
    });

    test('should handle input string with leading and trailing spaces', () => {
        const input = '   add title artist   ';
        const expectedTokens = ['add', 'title', 'artist'];
        expect(tokenizeInput(input)).toEqual(expectedTokens);
    });
});
