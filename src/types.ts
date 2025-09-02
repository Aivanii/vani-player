export interface Song {
  authorName: string | undefined;
  songName: string | undefined;
  songThumbnail: string | undefined;
  songUrl: string;
  index?: number;
}

export interface ContextMenuItem {
  label: string;
  action: () => void;
}
