function App() {
  return (
    <div className="m-auto py-4 px-4 flex flex-col items-center justify-start h-screen  text-primary w-full md:w-1/2">
      <img src="/images/logo-full.svg" alt="logo" className="w-40" />

      <div className="flex flex-col py-8 px-6 text-center">
        <div className="text-2xl font-extrabold">
          Your Journey to Coding Conf 2025 Starts Here!
        </div>
        <div className="pt-4 text-secondary ">
          Secure your spot at next year's biggest coding conference.
        </div>
      </div>

      {/* Avatar Upload */}
      <div className="flex flex-col gap-2 justify-start items-start w-full text-xl">
        <span>Upload Avatar</span>
        <div className="w-full items-center justify-start flex flex-col p-4 bg-surface/20 rounded-lg border-2 border-dashed border-surface">
          <div className="flex space-y-2">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer bg-surface/20 border border-surface-secondary rounded-lg p-2"
            >
              <img src="/images/icon-upload.svg" alt="upload" className="w-8" />
            </label>
            <input type="file" id="avatar-upload" className="hidden" />
          </div>
          <span className="text-secondary pt-2 text-lg">
            Drag and drop or click to upload
          </span>
        </div>
        <span className="pt-2 flex items-center gap-2">
          <img src="/images/icon-info.svg" alt="info" className="w-4" />
          <span className="text-secondary  text-xs font-light">
            Upload your photo (PNG or JPG, max size 500KB).
          </span>
        </span>
      </div>
    </div>
  );
}

export default App;
