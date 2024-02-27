import { jest } from '@jest/globals'
import processInput from './processInput';
import AlbumCollection from '../albumCollection';

const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('processInput function', () => {
  let albumCollection;

  beforeEach(() => {
    albumCollection = new AlbumCollection();
    mockConsoleLog.mockClear();
  });

  test('should return invalid command', () => {
    processInput('test test', albumCollection);
    expect(mockConsoleLog).toHaveBeenCalledWith('Invalid command.');
  });

  describe('Adding an album', () => {
      test('title and artist must be in double quotes', () => {
        processInput(`add 'Ride the Lightning' "Metallica"`, albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('album title and artist must be wrapped in double quotes');
      });

      test('should add an album', () => {
        processInput('add "Ride the Lightning" "Metallica"', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('Added "Ride the Lightning" by "Metallica"');
      });
    
      test('should not add album if title or artist are missing', () => {
        processInput('add', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('Please specify title and artist');
        processInput('Add "test"', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('Please specify title and artist');
      });
  });

  describe('Showing albums', () => {
    test('should return invalid command', () => {
        processInput('show by', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('Invalid command.');
    });

    test('should show all albums', () => {
        processInput('add "Title1" "Artist1"', albumCollection);
        processInput('add "Title2" "Artist2"', albumCollection);
        processInput('Show all', albumCollection);
        expect(mockConsoleLog).toHaveBeenNthCalledWith(3, '"Title1" by Artist1 (unplayed)');
        expect(mockConsoleLog).toHaveBeenNthCalledWith(4, '"Title2" by Artist2 (unplayed)');
    });

    test('should show unplayed albums', () => {
        processInput('add "Title1" "Artist1"', albumCollection);
        processInput('add "Title2" "Artist2"', albumCollection);
        processInput('add "Title3" "Artist3"', albumCollection);
        processInput('play "Title1"', albumCollection);
        processInput('show unplayed', albumCollection);
        expect(mockConsoleLog).toHaveBeenNthCalledWith(5, '"Title2" by Artist2');
        expect(mockConsoleLog).toHaveBeenNthCalledWith(6, '"Title3" by Artist3');
    });

    test('should show albums by artist', () => {
        processInput('add "Title1" "Artist1"', albumCollection);
        processInput('add "Title2" "Artist1"', albumCollection);
        processInput('add "Title3" "Artist1"', albumCollection);
        processInput('add "Title4" "Artist2"', albumCollection);
        processInput('show all by "Artist1"', albumCollection);
        expect(mockConsoleLog).toHaveBeenNthCalledWith(5, '"Title1" by Artist1 (unplayed)');
        expect(mockConsoleLog).toHaveBeenNthCalledWith(6, '"Title2" by Artist1 (unplayed)');
        expect(mockConsoleLog).toHaveBeenNthCalledWith(7, '"Title3" by Artist1 (unplayed)');
    });

    test('should show unplayed albums by artist', () => {
        processInput('add "Title1" "Artist1"', albumCollection);
        processInput('add "Title2" "Artist1"', albumCollection);
        processInput('play "Title1"', albumCollection);
        processInput('show unplayed by "Artist1"', albumCollection);
        expect(mockConsoleLog).toHaveBeenNthCalledWith(4, '"Title2" by Artist1');
    })

    test('should prompt to specify artist when showing by artist without it', () => {
        processInput('show all by', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('Please specify the artist');
    });


    test('artist should be wrapped in double quotes', () => {
        processInput("show all by 'test'", albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('album artist must be wrapped in double quotes');
    });

    test('should return invalid input', () => {
        processInput('show all test', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('Invalid command.');
    })
  });

  describe('Playing an album', () => {
      test('should play an album', () => {
        albumCollection.addAlbum('Ride the Lightning', 'Metallica');
        processInput('play "Ride the Lightning"', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith(`You're listening to "Ride the Lightning"`);
      });
    
      test('should prompt to specify album name when playing without it', () => {
        processInput('play', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('Please specify the album name');
      });

      test('should not play an unknown album', () => {
        processInput('play "unknown"', albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('Album "unknown" not found.');
      });

      test('title should be wrapped in double quotes', () => {
        processInput("play 'test'", albumCollection);
        expect(mockConsoleLog).toHaveBeenCalledWith('album title must be wrapped in double quotes');
    });
  })
});