import { useEffect, useState } from "react";
import type { Song } from "../types";

interface MusicApiResponse {
  results: Song[];
}

const useMusicAPI = (endpoint: string) => {
  const [data, setData] = useState<MusicApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const handleFetch = async () => {
      if (!endpoint) return;
      setIsLoading(true);
      setError(null);
      try {
        const url = `/api/${endpoint}${endpoint.includes("?") ? "&" : "?"}client_id=01b9424c&format=jsonpretty&limit=5`;
        const response = await fetch(url);
        console.log(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetch();
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useMusicAPI;
