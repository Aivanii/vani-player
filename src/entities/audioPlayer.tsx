const AudioPlayer = () => {
  return (
    <main className="w-full max-w-4xl p-6 flex justify-center items-center flex-col border-standart-border border-1 rounded-md shadow-standart bg-entity-bg">
      
      <div className="flex justify-between items-center">
        <div className="inline-block">
          <img
            className="w-32 h-32 rounded-md object-cover shadow-[0_0_0_4px_#ffffff1f]"
            src="https://i.ytimg.com/vi/N3I7V6zvnVI/maxresdefault.jpg"
            alt="alt"
          />
        </div>
        <div className="inline-flex gap-6 items-center">
          <button className="aspect-square h-12">
            <img
              className="invert-100"
              width="32"
              height="32"
              src="https://img.icons8.com/ios/32/left--v1.png"
              alt="left--v1"
            />
          </button>
          <button className="aspect-square h-16">
            <img
              className="invert-100"
              width="32"
              height="32"
              src="https://img.icons8.com/puffy/32/play.png"
              alt="play"
            />
          </button>
          <button className="aspect-square h-12">
            <img
              className="invert-100"
              width="32"
              height="32"
              src="https://img.icons8.com/ios/32/right--v1.png"
              alt="right--v1"
            />
          </button>
        </div>
      </div>
    </main>
  );
};

export { AudioPlayer };
