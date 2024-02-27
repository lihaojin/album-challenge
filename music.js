#!/usr/bin/env node
import AlbumCollection from './src/albumCollection.js';
import processInput from './src/utils/processInput.js';
import readline from 'readline';

function startMusicApp() {
    console.log('Welcome to your music collection!');
    const albumCollection = new AlbumCollection();
    const inputInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
    });

    inputInterface.prompt();

    inputInterface.on('line', (input) => {
        processInput(input.trim(), albumCollection);
        inputInterface.prompt();
    });
}

startMusicApp();