interface InputBlockProps {
  title: string;
  placeholder: string;
}

const InputBlock: React.FC<InputBlockProps> = ({
  title,
  placeholder,
}: InputBlockProps) => {
  return (
    <div className="flex flex-col pt-4 gap-2 justify-start items-start w-full text-xl ">
      <span>{title}</span>
      <div className="w-full">
        <textarea
          rows={1}
          className="w-full py-2 pl-2 rounded-lg bg-surface/20 border-2 border-surface-secondary text-sm resize-none hover-effect focus-outline "
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

const AvatarUploader: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 justify-start items-start w-full text-xl">
      <span>Upload Avatar</span>
      <div className="w-full items-center justify-start flex flex-col p-4 bg-surface/20 rounded-lg border-2 border-dashed border-surface focus-outline">
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
  );
};

function App() {
  return (
    <div className="overflow-y-auto mx-auto pt-4 pb-20 px-4 flex flex-col items-center justify-start h-screen  text-primary w-full md:w-1/2">
      <img src="/images/logo-full.svg" alt="logo" className="w-40" />

      <div className="flex flex-col py-8 px-6 text-center">
        <div className="text-2xl font-extrabold">
          Your Journey to Coding Conf 2025 Starts Here!
        </div>
        <div className="pt-4 text-secondary ">
          Secure your spot at next year's biggest coding conference.
        </div>
      </div>

      <AvatarUploader />

      <InputBlock title="Full Name" placeholder="" />
      <InputBlock title="Email Address" placeholder="example@gmail.com" />
      <InputBlock title="Github Username" placeholder="@yourusename" />

      <button className="w-full mt-4 p-2 text-xl font-bold bg-orange-500 rounded-lg text-black focus-outline">
        <span className="">Generate My Ticket</span>
      </button>
    </div>
  );
}

export default App;
