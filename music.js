#!/usr/bin/env node
import AlbumCollection from './src/albumCollection.js';
import processInput from './src/utils/processInput.js';
import readline from 'readline';

function startMusicApp() {
    console.log(`\nWelcome to your music collection!\n`);
    const albumCollection = new AlbumCollection();
    const inputInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
    });

    inputInterface.prompt();

    inputInterface.on('line', (input) => {
        console.log();
        processInput(input.trim(), albumCollection);
        console.log();
        inputInterface.prompt();
    });
}

startMusicApp();
