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
      expect(store?.playlist).toEqual([]);
      expect(store?.activeurl).toBeNull();
      expect(store?.isPlaying).toBeFalsy();
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
    it("should add activeurl when song was added to empty playlist", () => {
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
    it("should set active url to null when all songs are deleted", () => {
      store?.addSong(mockSong1);
      store?.removeSong(mockSong1);
      expect(store?.activeurl).toBeNull();
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
});
