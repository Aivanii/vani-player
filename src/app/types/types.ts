export interface Song {
  id: string | undefined;
  artist_name: string | undefined;
  artist_id: string | undefined;
  name: string | undefined;
  album_image: string | undefined;
  album_name: string | undefined;
  audio: string;
  file?: File;
  isAddedByUser?: boolean;
  index?: number;
}

export interface ContextMenuItem {
  label: string;
  action: () => void;
  icon?: string;
}

export interface KeyboardNavigationConfig {
  onLeft?: () => void; // <-
  onRight?: () => void; // ->
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onSpace?: () => void;
  onEnter?: () => void;
  onKeyM?: () => void;

  onComma?: () => void; // ,
  onPeriod?: () => void; // .

  onDigit1?: () => void;
  onDigit2?: () => void;
  onDigit3?: () => void;
  onDigit4?: () => void;
  onDigit5?: () => void;
  onDigit6?: () => void;
  onDigit7?: () => void;
  onDigit8?: () => void;
  onDigit9?: () => void;
}
