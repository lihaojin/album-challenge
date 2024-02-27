import { jest } from '@jest/globals'
import AlbumCollection from './albumCollection.js';

const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('AlbumCollection', () => {
  let albumCollection;

  beforeEach(() => {
    albumCollection = new AlbumCollection();
    mockConsoleLog.mockClear();
  });

  describe('Adding an album', () => {
      test('should add an album', () => {
        albumCollection.addAlbum('Title', 'Artist');
        expect(albumCollection.albums.size).toBe(1);
        expect(albumCollection.albums.has('Title')).toBe(true);
      });
    
      test('should not add duplicate album', () => {
        albumCollection.addAlbum('Title', 'Artist');
        albumCollection.addAlbum('Title', 'Artist');
        expect(albumCollection.albums.size).toBe(1);
      });
    
      test('should not add album with empty title or artist', () => {
        albumCollection.addAlbum('', 'Artist');
        expect(albumCollection.albums.size).toBe(0);
        albumCollection.addAlbum('Title', '');
        expect(albumCollection.albums.size).toBe(0);
      });
  });

  describe('Playing an album', () => {
      test('should play an album', () => {
        albumCollection.addAlbum('Title', 'Artist');
        albumCollection.playAlbum('Title');
        const album = albumCollection.albums.get('Title');
        expect(album.played).toBe(true);
      });
    
      test('should not play unknown album', () => {
        albumCollection.playAlbum('unknown');
        expect(mockConsoleLog).toHaveBeenCalledWith("Album \"unknown\" not found.");
      });
  });

  describe('Showing albums', () => {
      test('should show all albums', () => {
        albumCollection.addAlbum('Title1', 'Artist1');
        albumCollection.addAlbum('Title2', 'Artist2');
        albumCollection.show();
        expect(mockConsoleLog).toHaveBeenNthCalledWith(1, "Added \"Title1\" by \"Artist1\"");
        expect(mockConsoleLog).toHaveBeenNthCalledWith(2, "Added \"Title2\" by \"Artist2\"");
        expect(mockConsoleLog).toHaveBeenNthCalledWith(3, '"Title1" by Artist1 (unplayed)');
        expect(mockConsoleLog).toHaveBeenNthCalledWith(4, '"Title2" by Artist2 (unplayed)');
      });

      test('should show all albums given an invalid filter', () => {
        albumCollection.addAlbum('Title1', 'Artist1');
        albumCollection.addAlbum('Title2', 'Artist2');
        albumCollection.show({ test: 'test' });
        expect(mockConsoleLog).toHaveBeenNthCalledWith(1, "Added \"Title1\" by \"Artist1\"");
        expect(mockConsoleLog).toHaveBeenNthCalledWith(2, "Added \"Title2\" by \"Artist2\"");
        expect(mockConsoleLog).toHaveBeenNthCalledWith(3, '"Title1" by Artist1 (unplayed)');
        expect(mockConsoleLog).toHaveBeenNthCalledWith(4, '"Title2" by Artist2 (unplayed)');
      })
    
      test('should show filtered albums', () => {
        albumCollection.addAlbum('Title1', 'Artist1');
        albumCollection.addAlbum('Title2', 'Artist2');
        albumCollection.addAlbum('Title3', 'Artist3');
        albumCollection.playAlbum('Title2'); 
        albumCollection.show({ played: false, artist: 'Artist1' });
        expect(mockConsoleLog).toHaveBeenCalledWith('"Title1" by Artist1');
      });
    
      test('should show no albums', () => {
        albumCollection.show();
        expect(mockConsoleLog).toHaveBeenCalledWith('No albums found');
      });
  });
});
