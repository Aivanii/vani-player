const AudioPlayer = () => {
  return (
    <div className="w-full max-w-4xl p-6 flex justify-center items-center flex-col border-standart-border border-1 rounded-md shadow-standart bg-entity-bg 
    entity">
      <div className="flex justify-between items-center">
        <div className="inline-block">
          <img
            className="w-32 h-32 rounded-md object-cover shadow-[0_0_0_4px_#ffffff1f]"
            src="https://i.ytimg.com/vi/N3I7V6zvnVI/maxresdefault.jpg"
            alt="alt"
          />
        </div>
        <div>

            <button>&lt;</button>
            <button>||</button>
            <button>&gt;</button>

        </div>
      </div>
    </div>
  );
};

export { AudioPlayer };
