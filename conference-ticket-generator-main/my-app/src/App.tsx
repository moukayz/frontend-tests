import { useState } from "react";

interface InputBlockProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const InputBlock: React.FC<InputBlockProps> = ({
  title,
  placeholder,
  value,
  onChange,
  error,
}: InputBlockProps) => {
  return (
    <div className="flex flex-col pt-4 gap-2 justify-start items-start w-full text-xl ">
      <span>{title}</span>
      <textarea
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full py-2 pl-2 rounded-lg bg-surface/20 border-2 border-surface-secondary text-sm resize-none hover-effect focus-outline ${
          error ? "border-orange-500" : ""
        }`}
        placeholder={placeholder}
      />
      {error && <HintMessage message={error} isError={true} />}
    </div>
  );
};

const ChangeButton = ({
  title,
  onUpload,
}: {
  title: string;
  onUpload: (file: File | undefined) => void;
}) => {
  return (
    <>
      <input
        type="file"
        id="avatar-upload"
        className="hidden"
        onChange={(e) => onUpload(e.target.files?.[0])}
      />
      <label htmlFor="avatar-upload" className="avatar-button">
        <span className="focus:border-b-1">{title}</span>
      </label>
    </>
  );
};

const RemoveButton = ({
  title,
  onRemove,
}: {
  title: string;
  onRemove: () => void;
}) => {
  return (
    <button className="avatar-button" onClick={onRemove}>
      <span className="focus:border-b-1">{title}</span>
    </button>
  );
};

interface AvatarUploadProps {
  avatarFile: File | null;
  error: string | null;
  onUpload: (file: File | undefined) => void;
  onRemove: () => void;
}

const AvatarUploader: React.FC<AvatarUploadProps> = ({
  avatarFile,
  error,
  onUpload,
  onRemove,
}) => {
  const avatarUrl = avatarFile ? URL.createObjectURL(avatarFile) : null;

  console.log("avatarUrl", avatarUrl);
  return (
    <div className="flex flex-col gap-2 justify-start items-start w-full text-xl">
      <span>Upload Avatar</span>
      <div className="w-full p-4 bg-surface/20 rounded-lg border-2 border-dashed border-surface focus-outline">
        {!avatarFile && FileUploadBlock()}

        {avatarUrl && (
          <div className="flex flex-col gap-4 items-center justify-start">
            <img
              src={avatarUrl}
              onLoad={() => URL.revokeObjectURL(avatarUrl)}
              alt="avatar"
              className="border border-surface-secondary w-12 h-12 rounded-lg"
            />
            <div className="flex gap-2 items-center justify-center text-xs">
              <RemoveButton title="Remove Image" onRemove={onRemove} />
              <ChangeButton title="Change Image" onUpload={onUpload} />
            </div>
          </div>
        )}
      </div>
      <HintMessage
        message={
          error ? error : "Upload your photo (PNG or JPG, max size 500KB)."
        }
        isError={error ? true : false}
      />
    </div>
  );

  function FileUploadBlock() {
    return (
      <div className="flex flex-col gap-2 items-center justify-start">
        <div className="flex space-y-2">
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer bg-surface/20 border border-surface-secondary rounded-lg p-2"
          >
            <img
              src={`${import.meta.env.BASE_URL}/images/icon-upload.svg`}
              alt="upload"
              className="w-8"
            />
          </label>
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            onChange={(e) => onUpload(e.target.files?.[0])}
          />
        </div>
        <span className="text-secondary pt-2 text-lg">
          Drag and drop or click to upload
        </span>
      </div>
    );
  }
};

const HintMessage = ({
  message,
  isError,
}: {
  message: string;
  isError: boolean;
}) => {
  return (
    <span
      className={`flex font-light  text-xs items-center gap-2 ${
        isError ? "text-orange-400" : "text-secondary"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
        />
        <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.004 10.462V7.596M8 5.569v-.042"
        />
      </svg>
      <span className={``}>{message}</span>
    </span>
  );
};

function UserRegisterPage() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [githubUsernameError, setGithubUsernameError] = useState<string | null>(
    null
  );
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const handleAvatarUpload = (file: File | undefined) => {
    setAvatarFile(file || null);
  };
  const handleAvatarRemove = () => {
    setAvatarFile(null);
  };

  const validateAvatar = (file: File | null) => {
    if (!file) return "Please upload an image";
    if (file.size > 500 * 1024) return "Image size must be less than 500KB";
    if (!file.type.includes("image")) return "Please upload a valid image file";
    return null;
  };

  const validateName = (name: string) => {
    if (!name) return "Please enter your name";
    if (name.length < 3) return "Name must be at least 3 characters long";
    return null;
  };

  const validateEmail = (email: string) => {
    if (!email) return "Please enter your email";
    if (!email.includes("@")) return "Please enter a valid email address";
    return null;
  };

  const handleSubmit = () => {
    const avatarError = validateAvatar(avatarFile);
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const githubUsernameError = validateName(githubUsername);
    setAvatarError(avatarError);
    setNameError(nameError);
    setEmailError(emailError);
    setGithubUsernameError(githubUsernameError);

    if (avatarError || nameError || emailError || githubUsernameError) {
      return;
    }

    console.log("Form submitted");
  };

  return (
    <div className="overflow-y-auto mx-auto pt-4 pb-20 px-4 flex flex-col items-center justify-start h-screen  text-primary w-full md:w-1/3 min-w-[320px]">
      <img
        src={`${import.meta.env.BASE_URL}/images/logo-full.svg`}
        alt="logo"
        className="w-40"
      />

      <div className="flex flex-col py-8 px-6 text-center">
        <div className="text-2xl font-extrabold">
          Your Journey to Coding Conf 2025 Starts Here!
        </div>
        <div className="pt-4 text-secondary ">
          Secure your spot at next year's biggest coding conference.
        </div>
      </div>

      <AvatarUploader
        avatarFile={avatarFile}
        error={avatarError}
        onUpload={handleAvatarUpload}
        onRemove={handleAvatarRemove}
      />

      <InputBlock
        title="Full Name"
        placeholder=""
        value={name}
        onChange={setName}
        error={nameError}
      />
      <InputBlock
        title="Email Address"
        placeholder="example@gmail.com"
        value={email}
        onChange={setEmail}
        error={emailError}
      />
      <InputBlock
        title="Github Username"
        placeholder="@yourusename"
        value={githubUsername}
        onChange={setGithubUsername}
        error={githubUsernameError}
      />

      <button
        className="w-full mt-4 p-2 text-xl font-bold bg-orange-500 rounded-lg text-black focus-outline active:outline-none active:bg-orange-700 active:inset-shadow-sm active:inset-shadow-orange-500"
        onClick={handleSubmit}
      >
        <span className="">Generate My Ticket</span>
      </button>
    </div>
  );
}

const TicketPage = () => {
  return (
    <div className="overflow-y-auto mx-auto pt-8 pb-20 px-4 flex flex-col items-center justify-start h-screen  text-primary w-full md:w-1/3 min-w-[320px]">
      <img
        src={`${import.meta.env.BASE_URL}/images/logo-full.svg`}
        alt="logo"
        className="w-40"
      />

      <div className="w-full text-4xl font-extrabold">
        <span>some hello hello abcd text </span>
        <span className="gradient-text">Gradient </span>
        <span className="gradient-text">Text </span>
        <span className="">some text</span>
      </div>
    </div>
  );
};

type UserInfo = {
  name: string;
  email: string;
  githubUsername: string;
  avatar: File | null;
};

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return !userInfo && <UserRegisterPage />;
  // return <TicketPage />;
}

export default App;
