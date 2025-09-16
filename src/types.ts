export interface Song {
  id: string | undefined;
  artist_name: string | undefined;
  artist_id: string | undefined;
  name: string | undefined;
  album_image: string | undefined;
  album_name: string | undefined;
  audio: string;
  index?: number;
}

export interface ContextMenuItem {
  label: string;
  action: () => void;
  icon?: string;
}

export interface KeyboardNavigationConfig {
  onLeft?: () => void;
  onRight?: () => void;
  onSpace?: () => void;
  preventDefault?: boolean;
  enabled?: boolean;
}
