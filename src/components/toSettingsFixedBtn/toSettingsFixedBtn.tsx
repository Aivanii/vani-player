const ToSettingsFixedBtn = () => {
  return (
    <div className="fixed right-8 bottom-8">
      <button title="to settings page">
        <a href="settings">
          <img
            className="invert-icon aspect-square w-20"
            src="./icons/settings.png"
            alt="to settings page"
          />
        </a>
      </button>
    </div>
  );
};

export default ToSettingsFixedBtn;
