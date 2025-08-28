"use client";

import Image from "next/image";
import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SwitchButton from "./SwitchButton";
import nextConfig from "@/next.config";

const basePath = nextConfig.basePath ?? "";

type PlanType = "monthly" | "yearly";

type RegisterInfo = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  addons: string[];
  planType: PlanType;
  validator: () => boolean;
};

type StepButtonProps = {
  step: number;
  selected: boolean;
};

type BasicFormPageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const BasicFormPage = ({
  title,
  description,
  children,
}: BasicFormPageProps) => {
  return (
    <div className="shadow-lg md:shadow-none mx-auto rounded-lg bg-white px-6 py-8 flex flex-col gap-6 md:gap-8 w-full md:px-20 md:justify-evenly">
      <div className="flex flex-col gap-2">
        <span className="text-blue-950 text-2xl font-bold">{title}</span>
        <span className="text-grey-500">{description}</span>
      </div>
      {children}
    </div>
  );
};

const StepButton = ({ step, selected }: StepButtonProps) => (
  <button
    className={`rounded-full border border-white w-8 aspect-square font-medium ${
      selected ? "bg-blue-200 text-blue-950 border-none" : "text-white"
    }`}
  >
    {step}
  </button>
);

type InputBoxProps = {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

const InputBox = ({
  label,
  placeholder,
  value,
  error = "",
  onChange,
}: InputBoxProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center text-sm font-medium tracking-tighter">
        <span className=" text-blue-950">{label}</span>
        {error.length > 0 && <span className="text-red-500">{error}</span>}
      </div>
      <textarea
        name="name"
        className={`border border-grey-500 px-4 py-2 rounded-md font-medium
          resize-none focus:outline-purple-600
          ${error.length > 0 ? "border-red-500" : ""}
           `}
        placeholder={placeholder}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
};

type ValidatorFunc = () => boolean;

type PersonalInfoBlockProps = {
  registerValidator: (key: string, fn: ValidatorFunc) => void;
};

const PersonalInfoBlock = ({ registerValidator }: PersonalInfoBlockProps) => {
  const [error, setError] = useState<{
    name: string;
    email: string;
    phone: string;
  }>({
    name: "",
    email: "",
    phone: "",
  });

  const { registerInfo, updateRegisterInfo } = useContext(RegisterInfoContext);
  const infoValidator = useCallback(() => {
    console.log("infoValidator", registerInfo);
    const info = registerInfo;
    const newError = { name: "", email: "", phone: "" };
    if (info.name.length === 0) {
      newError.name = "Name is required";
    }
    if (info.name.length < 3 || info.name.length > 20) {
      newError.name = "Name must be between 3 and 20 characters";
    }
    if (info.email.length === 0) {
      newError.email = "Email is required";
    }
    if (!info.email.includes("@")) {
      newError.email = "Invalid email address";
    }
    if (info.phone.length === 0) {
      newError.phone = "Phone is required";
    }
    if (info.phone.length < 10 || info.phone.length > 15) {
      newError.phone = "Phone must be between 10 and 15 characters";
    }
    console.log(newError);
    setError(newError);

    return Object.values(newError).every((error) => error === "");
  }, [registerInfo]);

  console.log(error);

  useEffect(() => {
    console.log("registerValidator", registerValidator);
    registerValidator("personalInfo", infoValidator);
  }, [infoValidator, registerValidator]);

  return (
    <BasicFormPage
      title="Personal info"
      description="Please provide your name, email address, and phone number"
    >
      <InputBox
        label="Name"
        error={error.name}
        placeholder="e.g. Stephen King"
        value={registerInfo.name}
        onChange={(value) => {
          updateRegisterInfo({ name: value });
        }}
      />
      <InputBox
        label="Email Address"
        error={error.email}
        placeholder="e.g. stephenking@lorem.com"
        value={registerInfo.email}
        onChange={(value) => {
          updateRegisterInfo({ email: value });
        }}
      />
      <InputBox
        label="Phone Number"
        error={error.phone}
        placeholder="e.g. +1 234 567 890"
        value={registerInfo.phone}
        onChange={(value) => {
          updateRegisterInfo({ phone: value });
        }}
      />
    </BasicFormPage>
  );
};

const planPriceMap: Record<
  string,
  { monthly: number; yearly: number; avatar: string }
> = {
  Arcade: {
    monthly: 9,
    yearly: 90,
    avatar: "/images/icon-arcade.svg",
  },
  Advanced: {
    monthly: 12,
    yearly: 120,
    avatar: "/images/icon-advanced.svg",
  },
  Pro: {
    monthly: 15,
    yearly: 150,
    avatar: "/images/icon-pro.svg",
  },
};

interface PlanItemProps {
  name: string;
  selected: boolean;
  planType: PlanType;
  onSelect: () => void;
}

const PlanItem = ({ name, selected, planType, onSelect }: PlanItemProps) => {
  const planInfo = planPriceMap[name];
  return (
    <div
      className={`p-4 border border-grey-500 flex gap-4 rounded-lg cursor-pointer
        md:flex-col md:gap-16 md:flex-1
        hover:border-purple-600 hover:border-1
         ${selected ? "bg-blue-100 border-purple-600" : ""}`}
      onClick={onSelect}
    >
      <Image
        src={`${basePath}${planInfo.avatar}`}
        alt={name}
        width={40}
        height={40}
        className="w-10"
      />
      <div className="flex flex-col">
        <span className="text-blue-950 font-bold">{name}</span>
        <span className="text-grey-500 text-sm">
          ${getPlanPrice(name, planType)}/${getPlanSuffix(planType)}
        </span>
      </div>
    </div>
  );
};

type PlanTypeLabelProps = {
  currentPlanType: PlanType;
  label: string;
};

const PlanTypeLabel = ({ currentPlanType, label }: PlanTypeLabelProps) => {
  return (
    <span
      className={`${
        currentPlanType.toLowerCase() === label.toLowerCase()
          ? "text-blue-950"
          : "text-grey-500"
      }  font-medium `}
    >
      {label}
    </span>
  );
};

// type SelectPlanBlockProps = {
//   registerInfo: RefObject<RegisterInfo>;
// };

const SelectPlanBlock = () => {
  const { registerInfo, updateRegisterInfo } = useContext(RegisterInfoContext);

  return (
    <BasicFormPage
      title="Select your plan"
      description="You have the option of monthly or yearly billing."
    >
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        {Object.keys(planPriceMap).map((name) => (
          <PlanItem
            key={name}
            name={name}
            selected={registerInfo.plan === name}
            planType={registerInfo.planType}
            onSelect={() => {
              updateRegisterInfo({ plan: name });
            }}
          />
        ))}
      </div>

      <div className="rounded-lg bg-blue-100 py-4 flex justify-center items-center gap-6">
        <PlanTypeLabel
          currentPlanType={registerInfo.planType}
          label="Monthly"
        />
        <SwitchButton
          size="md"
          checked={registerInfo.planType === "yearly"}
          onChange={(checked) => {
            updateRegisterInfo({ planType: checked ? "yearly" : "monthly" });
          }}
          className="bg-blue-950"
          noColorChange={true}
        />
        <PlanTypeLabel currentPlanType={registerInfo.planType} label="Yearly" />
      </div>
    </BasicFormPage>
  );
};

const addons: {
  name: string;
  description: string;
  price: { monthly: number; yearly: number };
}[] = [
  {
    name: "Online service",
    description: "Access to multiplayer games",
    price: {
      monthly: 1,
      yearly: 10,
    },
  },
  {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
];

const getAddonPrice = (name: string, planType: PlanType) => {
  const addon = addons.find((addon) => addon.name === name);
  if (!addon) return 0;
  return addon.price[planType];
};

const getPlanSuffix = (planType: PlanType) => {
  return planType === "monthly" ? "mo" : "yr";
};

const getPlanPrice = (name: string, planType: PlanType) => {
  const planInfo = planPriceMap[name];
  if (!planInfo) return 0;
  return planInfo[planType];
};

interface AddonItemProps {
  name: string;
  planType: PlanType;
  selected: boolean;
  onSelect: () => void;
}
const AddonItem = ({ name, planType, selected, onSelect }: AddonItemProps) => {
  const addon = addons.find((addon) => addon.name === name);
  if (!addon) return null;
  return (
    <div
      className={`p-4 flex items-center gap-4 border border-grey-500 rounded-lg tracking-tight 
        hover:border-purple-600 cursor-pointer
        ${selected ? "bg-blue-100 border-purple-600" : ""}`}
      onClick={onSelect}
    >
      <button
        className={`w-6 h-6 aspect-square rounded-md border border-grey-500
      ${selected ? "bg-purple-600 border-none" : ""}
        `}
      >
        {selected && (
          <Image
            src={`${basePath}/images/icon-checkmark.svg`}
            alt="checkmark"
            width={16}
            height={16}
            className="m-auto"
          />
        )}
      </button>
      <div className="flex flex-col">
        <span className="text-blue-950 font-medium">{name}</span>
        <span className="text-grey-500 text-xs text-nowrap">
          {addon.description}
        </span>
      </div>
      <span className="ml-auto text-purple-600 font-medium text-sm">
        +${getAddonPrice(name, planType)}/${getPlanSuffix(planType)}
      </span>
    </div>
  );
};

// type AddOnsBlockProps = {
//   registerInfo: RefObject<RegisterInfo>;
// };

const AddOnsBlock = () => {
  const { registerInfo, updateRegisterInfo } = useContext(RegisterInfoContext);
  const planType = registerInfo.planType;

  const addOrRemoveAddon = (addon: string) => {
    if (registerInfo.addons.includes(addon)) {
      const newAddons = registerInfo.addons.filter((a) => a !== addon);
      updateRegisterInfo({ addons: newAddons });
    } else {
      const newAddons = [...registerInfo.addons, addon];
      updateRegisterInfo({ addons: newAddons });
    }
  };

  return (
    <BasicFormPage
      title="Pick add-ons"
      description="Add-ons help enhance your gaming experience."
    >
      <div className="flex flex-col gap-3">
        {addons.map((addon) => (
          <AddonItem
            key={addon.name}
            name={addon.name}
            planType={planType}
            selected={registerInfo.addons.includes(addon.name)}
            onSelect={() => addOrRemoveAddon(addon.name)}
          />
        ))}
      </div>
    </BasicFormPage>
  );
};

const RegisterInfoContext = createContext<{
  registerInfo: RegisterInfo;
  updateRegisterInfo: (info: Partial<RegisterInfo>) => void;
}>({
  registerInfo: {
    name: "",
    email: "",
    phone: "",
    plan: "",
    addons: [],
    planType: "monthly",
    validator: () => true,
  },
  updateRegisterInfo: () => {},
});

const RegisterInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    name: "",
    email: "",
    phone: "",
    plan: "",
    addons: [],
    planType: "monthly",
    validator: () => true,
  });

  const updateRegisterInfo = (info: Partial<RegisterInfo>) => {
    setRegisterInfo((prev) => ({ ...prev, ...info }));
  };

  return (
    <RegisterInfoContext value={{ registerInfo, updateRegisterInfo }}>
      {children}
    </RegisterInfoContext>
  );
};

type NavFooterProps = {
  first?: boolean;
  last?: boolean;
  onBack: () => void;
  onNext: () => void;
};

const NavFooter = ({
  first = false,
  last = false,
  onBack,
  onNext,
}: NavFooterProps) => {
  return (
    <div
      className="fixed  left-0 bottom-0 md:relative w-screen md:w-full mt-auto bg-white shadow-lg md:shadow-none p-4 flex justify-center items-center
    md:px-20 md:pt-12
    "
    >
      <button
        className={`cursor-pointer hover:text-purple-600 text-grey-500 font-medium ${
          first ? "hidden" : ""
        } `}
        onClick={onBack}
      >
        Go Back
      </button>

      <button
        className={`cursor-pointer ml-auto rounded-md bg-blue-950 text-white font-medium px-4 py-2 
          hover:bg-blue-950/80
          ${last ? "bg-purple-600 hover:bg-purple-600/80" : ""}`}
        onClick={onNext}
      >
        {last ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
};

const ThankYouBlock = () => {
  return (
    <div className="shadow-lg md:shadow-none mx-4 rounded-lg bg-white px-6 py-20 flex flex-col justify-center items-center gap-6">
      <Image
        src={`${basePath}/images/icon-thank-you.svg`}
        alt="thank you"
        width={80}
        height={80}
        className="w-12 h-12"
      />
      <span className="text-blue-950 text-2xl font-bold">Thank you!</span>
      <span className="text-grey-500 text-center ">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </span>
    </div>
  );
};

type FinishBlockProps = {
  onChangePlan: () => void;
};

const FinishBlock = ({ onChangePlan }: FinishBlockProps) => {
  const { registerInfo } = useContext(RegisterInfoContext);
  const currentPlanType = registerInfo.planType;
  const currentPlanPrice = getPlanPrice(registerInfo.plan, currentPlanType);
  const currentAddons = registerInfo.addons
    .map((addon) => {
      const addonInfo = addons.find((a) => a.name === addon);
      if (!addonInfo) return null;
      return {
        name: addonInfo.name,
        price: getAddonPrice(addonInfo.name, currentPlanType),
      };
    })
    .filter((addon) => addon !== null);
  const suffix = getPlanSuffix(currentPlanType);
  const totalPrice =
    currentPlanPrice +
    currentAddons.reduce((acc, addon) => acc + addon.price, 0);

  return (
    <BasicFormPage
      title="Finishing up"
      description="Double check everything looks OK before confirming."
    >
      <div className="bg-blue-100 p-4 rounded-lg flex flex-col gap-3 text-blue-950">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <span className="font-bold">
              {registerInfo.plan} (
              {currentPlanType === "monthly" ? "Monthly" : "Yearly"})
            </span>
            <button
              onClick={onChangePlan}
              className="text-grey-500 text-sm underline font-medium hover:text-purple-600 cursor-pointer"
            >
              Change
            </button>
          </div>
          <span className="font-bold text-sm ">
            ${currentPlanPrice}/${suffix}
          </span>
        </div>

        <div className="h-0 border-b border-grey-500"></div>

        <>
          {currentAddons.map((addon) => {
            if (!addon) return null;
            return (
              <div
                key={addon.name}
                className="flex justify-between items-center"
              >
                <span className="text-grey-500">{addon.name}</span>
                <span className="text-blue-950 text-sm">
                  +${addon.price}/${suffix}
                </span>
              </div>
            );
          })}
        </>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-grey-500">
          Total (per {registerInfo.planType === "monthly" ? "month" : "year"})
        </span>
        <span className="text-purple-600 font-bold">
          ${totalPrice}/${suffix}
        </span>
      </div>
    </BasicFormPage>
  );
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const validators = useRef<Record<string, ValidatorFunc>>({});
  const handleRegisterValidator = useCallback(
    (key: string, fn: ValidatorFunc) => {
      validators.current[key] = fn;
    },
    []
  );

  console.log("home render");

  const blocks = [
    <PersonalInfoBlock
      key="personal-info"
      registerValidator={handleRegisterValidator}
    />,
    <SelectPlanBlock key="select-plan" />,
    <AddOnsBlock key="add-ons" />,
    <FinishBlock
      key="finish"
      onChangePlan={() => {
        setStep(2);
      }}
    />,
  ];

  return (
    <div
      className=" w-full grid grid-cols-1 items-start  px-4 mx-auto 
    md:bg-white md:rounded-lg md:p-4 md:grid-cols-[1fr_2fr] md:grid-rows-[1fr_auto] md:h-[70vh] md:min-h-[550px] max-w-md md:max-w-5xl md:items-stretch
    "
    >
      <div
        className="py-8 flex justify-center items-center gap-4 md:bg-sidebar-desktop 
      md:bg-cover md:bg-center md:bg-no-repeat md:w-full grow-0 shrink-0 md:flex-col md:p-10 md:items-start md:justify-start md:gap-8 md:rounded-lg
      md:row-span-2"
      >
        {blocks.map((block, index) => (
          <StepButton
            key={index}
            step={index + 1}
            selected={step === index + 1}
          />
        ))}
      </div>

      <RegisterInfoProvider>
        {!isConfirmed && <>{blocks[step - 1]}</>}
        {isConfirmed && <ThankYouBlock />}
      </RegisterInfoProvider>

      {!isConfirmed && (
        <NavFooter
          first={step === 1}
          last={step === 4}
          onBack={() => {
            setStep(step - 1);
          }}
          onNext={() => {
            console.log("current validators", validators.current);
            if (step === 4) {
              setIsConfirmed(true);
              return;
            }

            if (Object.values(validators.current).every((fn) => fn())) {
              setStep(step + 1);
            }
          }}
        />
      )}
    </div>
  );
}
