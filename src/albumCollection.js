import Album from './album.js';
import { ALBUM_ATTRIBUTES } from './constants.js';

export default class AlbumCollection {
    constructor() {
        this.albums = new Map();
    }

    addAlbum(title, artist) {
        if (this.albums.has(title)) {
            console.log(`"${title}" already exists in the collection`);
            return;
        }

        if (!title || !artist) {
            console.log('album title and artist cannot be empty.');
            return;
        }

        const album = new Album(title, artist);
        this.albums.set(title, album);
        console.log(`Added "${title}" by "${artist}"`);
    }

    playAlbum(title) {
        const album = this.albums.get(title);

        if (album) {
            if (!album.played) {
                album.played = true;
                this.albums.set(title, album);
            }

            console.log(`You're listening to "${title}"`);
        } else {
            console.log(`Album "${title}" not found.`);
        }
    }

    show(filters = {}) {
        let filteredAlbums = [...this.albums.values()];
        const validFilterKeys = Object.keys(filters).filter(
            (key) => !!ALBUM_ATTRIBUTES[key]
        );
        const hasPlayedFilter = validFilterKeys.includes('played');

        if (validFilterKeys.length > 0) {
            filteredAlbums = filteredAlbums.filter((album) => {
                return validFilterKeys.every(
                    (key) => album[key] === filters[key]
                );
            });
        }

        if (filteredAlbums.length === 0) {
            console.log('No albums found');
        }

        if (hasPlayedFilter) {
            filteredAlbums.forEach((album) => {
                console.log(`"${album.title}" by ${album.artist}`);
            });
        } else {
            filteredAlbums.forEach((album) => {
                console.log(
                    `"${album.title}" by ${album.artist} (${album.played ? 'played' : 'unplayed'})`
                );
            });
        }
    }
}
