import { runInAction } from "mobx";
import { CurrentPlaylistStore } from "../../app/stores/currentPlaylistStore/currentPlaylistStore";
import { Song } from "../../app/types/types";

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

const mockSong1: Song = {
  id: "1",
  artist_name: "artist_name",
  artist_id: "1",
  name: "name",
  album_image: "album_image",
  album_name: "album_name",
  audio: "audio",
  isAddedByUser: false,
};
const mockSong2: Song = {
  id: "2",
  artist_name: "artist_name2",
  artist_id: "2",
  name: "name2",
  album_image: "album_image2",
  album_name: "album_name2",
  audio: "audio2",
  isAddedByUser: false,
};
const mockSong3: Song = {
  id: "3",
  artist_name: "artist_name3",
  artist_id: "3",
  name: "name3",
  album_image: "album_image3",
  album_name: "album_name3",
  audio: "audio3",
  isAddedByUser: false,
};

describe("currentPlaylistStore", () => {
  let store: CurrentPlaylistStore | null = null;
  beforeEach(() => {
    store = new CurrentPlaylistStore();
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });

    jest.clearAllMocks();
  });

  describe("Initial state", () => {
    it("should initialize with empty playlist", () => {
      expect(store?.isLooped).toBeFalsy();
      expect(store?.playlist).toEqual([]);
      expect(store?.activeurl).toBeNull();
      expect(store?.isPlaying).toBeFalsy();
      expect(store?.audioDurationMS).toBe(0);
      expect(store?.currentAudioTimeMS).toBe(0);
    });
    it("should have default volume of 1", () => {
      expect(store?.volume).toBe(1);
    });
    it("shouldn't be muted or looped by default", () => {
      expect(store?.isMuted).toBeFalsy();
      expect(store?.isLooped).toBeFalsy();
    });
  });

  describe("song management", () => {
    it("should add song to playlist", () => {
      expect(store?.playlist).toEqual([]);
      store?.addSong(mockSong1);
      expect(store?.playlist[0]).toEqual(mockSong1);
      expect(store?.playlist).toHaveLength(1);
    });
    it("should set activeurl when song was added to empty playlist", () => {
      store?.addSong(mockSong1);
      expect(store?.activeurl).toBe(mockSong1.audio);
    });
    it("should autoplay when song was added to empty playlist", () => {
      store?.addSong(mockSong1);
      expect(store?.isPlaying).toBeTruthy();
    });
    it("shouldn't add duplicates", () => {
      store?.addSong(mockSong1);
      store?.addSong(mockSong1);
      expect(store?.playlist[0]).toEqual(mockSong1);
      expect(store?.playlist).toHaveLength(1);
    });
    it("should remove song from playlist", () => {
      store?.addSong(mockSong1);
      store?.addSong(mockSong2);
      store?.removeSong(mockSong1);
      expect(store?.playlist).toHaveLength(1);
      expect(store?.playlist[0]).toEqual(mockSong2);
    });
    it("should set active url to an empty string when all songs are deleted", () => {
      store?.addSong(mockSong1);
      store?.removeSong(mockSong1);
      expect(store?.activeurl).toBe("");
    });
    it("should stop playing when all songs are deleted", () => {
      store?.addSong(mockSong1);
      store?.removeSong(mockSong1);
      expect(store?.isPlaying).toBeFalsy();
    });
    it("should check if song in playlist", () => {
      expect(store?.isSongInPlaylist(mockSong1)).toBeFalsy();
      store?.addSong(mockSong1);
      expect(store?.isSongInPlaylist(mockSong1)).toBeTruthy();
    });
  });

  describe("utils", () => {
    describe("togglePlay", () => {
      it("works fine when activeurl is not null", () => {
        store?.addSong(mockSong1);
        store?.togglePlay();
        expect(store?.isPlaying).toBeFalsy();
        store?.togglePlay();
        expect(store?.isPlaying).toBeTruthy();
      });
      it("doesn't do anything whene activeurl is null", () => {
        store?.togglePlay();
        expect(store?.isPlaying).toBeFalsy();
      });
    });
    it("should loop song via toggleLoop", () => {
      store?.toggleLoop();
      expect(store?.isLooped).toBeTruthy();
      store?.toggleLoop();
      expect(store?.isLooped).toBeFalsy();
    });
    it("setNewActiveurl", () => {
      store?.setNewActiveurl("test-url");
      expect(store?.activeurl).toBe("test-url");
    });
    describe("setNextSong", () => {
      it("should do nothing when activeurl is null", () => {
        store?.setNextSong();
        expect(store?.isPlaying).toBeFalsy();
        expect(store?.playlist.length).toBe(0);
      });
      it("should set isPlaying = false when there is no next songs", () => {
        store?.setIsPlaying(true);
        store?.setNewActiveurl("test-url");
        store?.setNextSong();
        expect(store?.isPlaying).toBeFalsy();
      });
    });
    it("setAudioDurationMS", () => {
      store?.setAudioDurationMS(100000);
      expect(store?.audioDurationMS).toBe(100000);
    });
    it("getCurrentAudioTimeMSByPercent", () => {
      store?.setAudioDurationMS(100000);
      expect(store?.getCurrentAudioTimeMSByPercent(60)).toBe(60000);
    });
    it("addSongNext does right order", () => {
      store?.addSong(mockSong1);
      store?.addSong(mockSong2);
      store?.setNewActiveurl(mockSong1.audio);
      store?.addSongNext(mockSong3);
      expect(store?.playlist.length).toBe(3);
      expect(store?.activeurl).toBe(mockSong1.audio);
      expect(store?.playlist[store?.currentlyPlayingSongIndex + 1].audio).toBe(
        mockSong3.audio,
      );
    });
    it("addSongNext uses removeSong when the given song is already in playlist", () => {
      store?.addSongNext(mockSong1);
      store?.addSongNext(mockSong1);
      expect(store?.playlist.length).toBe(1);
    });
    describe("addSongNextAndPlay", () => {
      it("adding song wasn't in playlist before", () => {
        store?.addSong(mockSong1);
        store?.addSongNextAndPlay(mockSong2);
        expect(store?.isPlaying).toBeTruthy();
        expect(store?.currenturl).toBe(mockSong2.audio);
      });
      it("adding song is in playlist already", () => {
        store?.addSong(mockSong1);
        store?.addSong(mockSong3);
        store?.addSong(mockSong2);
        store?.addSongNextAndPlay(mockSong2);
        expect(store?.playlist.length).toBe(3);
        expect(store?.isPlaying).toBeTruthy();
        expect(store?.currenturl).toBe(mockSong2.audio);
      });
    });
    it("removeSong when there is no next songs but there is a previous one", () => {
      store?.addSong(mockSong1);
      store?.addSongNextAndPlay(mockSong2);
      store?.removeSong(mockSong2);
      expect(store?.playlist.length).toBe(1);
      expect(store?.activeurl).toBe(mockSong1.audio);
    });
    describe("jumpSeconds", () => {
      it("the time is all right after a func call there (no overflow)", () => {
        store?.setAudioDurationMS(100000);
        store?.jumpSeconds(10);
        expect(store?.currentAudioTimeMS).toBe(10000);
      });
      it("the time is 0 when the time is <0 after a jump", () => {
        store?.setAudioDurationMS(100000);
        store?.setCurrentAudioTimeMS(10000);
        store?.jumpSeconds(-10000000);
        expect(store?.currentAudioTimeMS).toBe(0);
      });
      it("the time is set to audioDuration when the time is > audioDuration after a jump", () => {
        store?.setAudioDurationMS(100000);
        store?.setCurrentAudioTimeMS(10000);
        store?.jumpSeconds(10000000);
        expect(store?.currentAudioTimeMS).toBe(100000);
      });
    });
    describe("moveVolume", () => {
      it("the volume is all right after a func call there (no overflow)", () => {
        store?.moveVolume(-50);
        expect(store?.volume).toBe(0.5);
      });
      it("the volume is 0 when the volume is < 0 after a jump", () => {
        store?.moveVolume(-50000);
        expect(store?.volume).toBe(0);
      });
      it("the volume is 1 when the volume is > 1 after a jump", () => {
        store?.moveVolume(50000);
        expect(store?.volume).toBe(1);
      });
    });
    describe("changeSongById", () => {
      it("ID param is found in playlist", () => {
        store?.addSong(mockSong1);
        store?.changeSongById(mockSong2, "1");
        expect(store?.playlist.length).toBe(1);
        expect(store?.playlist[0].audio).toBe(mockSong2.audio);
      });
      it("ID param is not found in playlist", () => {
        store?.addSong(mockSong1);
        store?.changeSongById(mockSong2, "no-legit");
        expect(store?.playlist.length).toBe(1);
        expect(store?.playlist[0].audio).toBe(mockSong1.audio);
      });
    });
    describe("setPreviousSong", () => {
      it("nothing changes when activeurl is null", () => {
        store?.setPreviousSong();
        expect(store?.currenturl).toBeNull();
        expect(store?.playlist.length).toBe(0);
      });
      it("nothing happens when there's no previous songs", () => {
        store?.addSong(mockSong1);
        store?.setPreviousSong();
        expect(store?.playlist.length).toBe(1);
        expect(store?.currenturl).toBe(mockSong1.audio);
      });
    });
  });
});
