function tokenizeInput(input) {
	const tokenList = [];
    let currentToken = '';
  
	for (let i=0; i<input.length; i++) {
        if (input[i] === ' ') {
            if (currentToken.length > 0) {
            tokenList.push(currentToken);
            currentToken = '';
        }
        } else if (input[i] == '"') {
            const closingQuoteIndex = input.indexOf('"', i + 1);
        
            if (closingQuoteIndex !== -1) {
                tokenList.push(input.substring(i + 1, closingQuoteIndex));
                i = closingQuoteIndex;
            }
        } else {
            currentToken += input[i];
        }
  }
  
  if (currentToken.length > 0) {
  	tokenList.push(currentToken);
  }
  
  return tokenList;
}

export default tokenizeInput;