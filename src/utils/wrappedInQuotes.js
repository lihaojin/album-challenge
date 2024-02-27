function wrappedInQuotes(input) {
    return input.length > 2 && input[0] === '"' && input[input.length - 1] === '"';
}

export default wrappedInQuotes;