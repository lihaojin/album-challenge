function stripQuotes(input) {
    if (input[0] === '"' && input[input.length - 1] === '"') {
        return input.replace(/"/g, '')
    }

    return input;
}

export default stripQuotes;
