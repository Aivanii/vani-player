const formatTime = (ms: number): string => {
  let secs: number | string = Math.floor(ms / 1000);
  let mins: number | string = Math.floor(secs / 60);

  secs = secs % 60;

  if (String(mins).length < 2) mins = `0${mins}`;
  if (String(secs).length < 2) secs = `0${secs}`;

  if (+mins > 99) {
    mins = 99;
    secs = "59+";
  }

  return `${mins}:${secs}`;
};

export { formatTime };
