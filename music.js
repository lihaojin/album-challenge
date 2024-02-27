#!/usr/bin/env node
import AlbumCollection from './src/albumCollection.js';
import { ACTIONS } from './src/constants.js';
import tokenizeInput from './src/utils/tokenizeInput.js';

import readline from 'readline';

function processInput(input = '', albumCollection = new Map()) {
    const tokens = tokenizeInput(input.trim());
    const [action, ...params] = tokens;

    switch (action) {
        case ACTIONS.ADD:
            if (params.length === 2) {
                albumCollection.addAlbum(params?.[0], params?.[1]);
            } else {
                console.log('Please specify title and artist');
            }

            break;

        case ACTIONS.SHOW:
            let filters = {};

            if (params?.length === 0) {
                console.log('Specify what you want to show, (i.e. "show all" or "show unplayed"');
            }

            if (!['all', 'unplayed'].some(filter => params?.[0] === filter)) {
                console.log('Invalid command');
                break;
            }

            if (params?.[1] === 'by') {
                const artistFilter = params?.[2];

                if (artistFilter) {
                    filters['artist'] = artistFilter;
                } else {
                    console.log('Please specify the artist');
                    break;
                }
            }

            if (params[0] === 'all') {
                albumCollection.show(filters);
            } else if (params[0] === 'unplayed') {
                filters['played'] = false;
                albumCollection.show(filters);
            }

            break;

        case ACTIONS.PLAY:
            if (params?.length === 1) {
                albumCollection.playAlbum(params?.[0]);
            } else {
                console.log('Please specify the album name');
            }
            break;

        case ACTIONS.QUIT:
            console.log('Bye!');
            process.exit(0);
            break;

        default:
            console.log('Invalid command.')
    }
}

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