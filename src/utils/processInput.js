import { ACTIONS } from '../constants.js';
import tokenizeInput from './tokenizeInput.js';
import wrappedInQuotes from './wrappedInQuotes.js';
import stripQuotes from './stripQuotes.js';

function processInput(input = '', albumCollection = new Map()) {
    const tokens = tokenizeInput(input.trim());
    const [action, ...params] = tokens;

    switch (action?.toLowerCase()) {
        case ACTIONS.ADD:
            if (params.length === 2) {
                if (!params.every((param) => wrappedInQuotes(param))) {
                    console.log(
                        'album title and artist must be wrapped in double quotes'
                    );
                    break;
                }

                albumCollection.addAlbum(
                    stripQuotes(params?.[0]),
                    stripQuotes(params?.[1])
                );
            } else {
                console.log('Please specify title and artist');
            }

            break;

        case ACTIONS.SHOW:
            let filters = {};

            if (params?.length === 0) {
                console.log(
                    'Specify what you want to show, (i.e. "show all" or "show unplayed"'
                );
            }

            if (
                (params?.[1] && params[1] !== 'by') ||
                !['all', 'unplayed'].some((filter) => params?.[0] === filter)
            ) {
                console.log('Invalid command.');
                break;
            }

            if (params[1] === 'by') {
                const artistFilter = params?.[2];

                if (artistFilter) {
                    if (!wrappedInQuotes(artistFilter)) {
                        console.log(
                            'album artist must be wrapped in double quotes'
                        );
                        break;
                    }

                    filters['artist'] = stripQuotes(artistFilter);
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
                if (!wrappedInQuotes(params?.[0])) {
                    console.log('album title must be wrapped in double quotes');
                    break;
                }

                albumCollection.playAlbum(stripQuotes(params?.[0]));
            } else {
                console.log('Please specify the album name');
            }
            break;

        case ACTIONS.QUIT:
            console.log(`Bye!\n`);
            process.exit(0);

        default:
            console.log('Invalid command.');
    }
}

export default processInput;
