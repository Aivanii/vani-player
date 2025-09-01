import type { Song } from "../../types";

interface RecommendationProps {
  playlist: Song[];
  setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
}

export type { RecommendationProps };
