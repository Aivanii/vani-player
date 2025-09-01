interface ChangeAudioVolumeByUser {
  (
    audioVolumeBarStatic: HTMLDivElement,
    setAudioVolume: React.Dispatch<React.SetStateAction<number>>
  ): ((event: { clientX: number }) => void) | undefined;
}

const changeAudioVolumeByUser: ChangeAudioVolumeByUser = ({
  audioVolumeBarStatic,
  setAudioVolume,
}: ChangeAudioVolumeByUser) => {
  if (!audioVolumeBarStatic || !setAudioVolume) return undefined;

  const handleClick = (event: { clientX: number }) => {
    const rect = audioVolumeBarStatic.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    //[0-1]
    const percentage = clickX / rect.width;
    setAudioVolume(percentage);
  };

  return handleClick;
};

export { changeAudioVolumeByUser };
