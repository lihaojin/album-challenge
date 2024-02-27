import { jest } from '@jest/globals'
import AlbumCollection from './albumCollection.js';

describe('AlbumCollection', () => {
  let albumCollection;

  beforeEach(() => {
    albumCollection = new AlbumCollection();
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
        const mockLog = jest.spyOn(console, 'log');
        albumCollection.playAlbum('unknown');
        expect(mockLog).toHaveBeenCalledWith("Album \"unknown\" not found.");
        mockLog.mockRestore();
      });
  });

  describe('Showing albums', () => {
      test('should show all albums', () => {
        const mockLog = jest.spyOn(console, 'log');
        albumCollection.addAlbum('Title1', 'Artist1');
        albumCollection.addAlbum('Title2', 'Artist2');
        albumCollection.show();
        expect(mockLog).toHaveBeenNthCalledWith(1, "Added \"Title1\" by \"Artist1\"");
        expect(mockLog).toHaveBeenNthCalledWith(2, "Added \"Title2\" by \"Artist2\"");
        expect(mockLog).toHaveBeenNthCalledWith(3, '"Title1 by Artist1 (unplayed)"');
        expect(mockLog).toHaveBeenNthCalledWith(4, '"Title2 by Artist2 (unplayed)"');
        mockLog.mockRestore();
      });
    
      test('should show filtered albums', () => {
        const mockLog = jest.spyOn(console, 'log');
        albumCollection.addAlbum('Title1', 'Artist1');
        albumCollection.addAlbum('Title2', 'Artist2');
        albumCollection.addAlbum('Title3', 'Artist3');
        albumCollection.playAlbum('Title2'); 
        albumCollection.show({ played: false, artist: 'Artist1' });
        expect(mockLog).toHaveBeenCalledWith('"Title1 by Artist1 (unplayed)"');
        mockLog.mockRestore();
      });
    
      test('should show no albums', () => {
        const mockLog = jest.spyOn(console, 'log');
        albumCollection.show();
        expect(mockLog).toHaveBeenCalledWith('No albums found');
        mockLog.mockRestore();
      });
  });
});
