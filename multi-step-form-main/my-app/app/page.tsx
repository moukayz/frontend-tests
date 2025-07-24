"use client";

import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import SwitchButton from "./SwitchButton";

type PlanType = "monthly" | "yearly";

type RegisterInfo = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  addons: string[];
  planType: PlanType;
};

type StepButtonProps = {
  step: number;
  selected: boolean;
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
  onChange: (value: string) => void;
};

const InputBox = ({ label, placeholder, value, onChange }: InputBoxProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-blue-950 font-medium tracking-tighter">
        {label}
      </span>
      <textarea
        name="name"
        className="border border-grey-500 px-4 py-2 rounded-md font-medium "
        placeholder={placeholder}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
};

type PersonalInfoBlockProps = {
  registerInfo: RefObject<RegisterInfo>;
};

const PersonalInfoBlock = ({ registerInfo }: PersonalInfoBlockProps) => {
  const [name, setName] = useState(registerInfo.current.name);
  const [email, setEmail] = useState(registerInfo.current.email);
  const [phone, setPhone] = useState(registerInfo.current.phone);

  return (
    <div className="shadow-lg mx-4 rounded-lg bg-white px-6 py-8 flex flex-col gap-4">
      <span className="text-blue-950 text-2xl font-bold">Personal info</span>
      <span className="text-grey-500">
        Please provide your name, email address, and phone number
      </span>

      <InputBox
        label="Name"
        placeholder="e.g. Stephen King"
        value={name}
        onChange={(value) => {
          registerInfo.current.name = value;
          setName(value);
        }}
      />
      <InputBox
        label="Email Address"
        placeholder="e.g. stephenking@lorem.com"
        value={email}
        onChange={(value) => {
          registerInfo.current.email = value;
          setEmail(value);
        }}
      />
      <InputBox
        label="Phone Number"
        placeholder="e.g. +1 234 567 890"
        value={phone}
        onChange={(value) => {
          registerInfo.current.phone = value;
          setPhone(value);
        }}
      />
    </div>
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
      className={`p-4 border border-grey-500 flex gap-4 rounded-lg cursor-pointer ${
        selected ? "bg-blue-100 border-purple-600" : ""
      }`}
      onClick={onSelect}
    >
      <Image
        src={planInfo.avatar}
        alt={name}
        width={40}
        height={40}
        className="w-10"
      />
      <div className="flex flex-col">
        <span className="text-blue-950 font-bold">{name}</span>
        <span className="text-grey-500 text-sm">
          ${planType === "monthly" ? planInfo.monthly : planInfo.yearly}/
          {planType === "monthly" ? "mo" : "yr"}
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

type SelectPlanBlockProps = {
  registerInfo: RefObject<RegisterInfo>;
};

const SelectPlanBlock = ({ registerInfo }: SelectPlanBlockProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    registerInfo.current.plan
  );
  const [planType, setPlanType] = useState<PlanType>(
    registerInfo.current.planType
  );

  return (
    <div className="shadow-lg mx-4 rounded-lg bg-white px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-blue-950 text-2xl font-bold">
          Select your plan
        </span>
        <span className="text-grey-500">
          You have the option of monthly or yearly billing.
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {Object.keys(planPriceMap).map((name) => (
          <PlanItem
            key={name}
            name={name}
            selected={selectedPlan === name}
            planType={planType}
            onSelect={() => {
              registerInfo.current.plan = name;
              setSelectedPlan(name);
            }}
          />
        ))}
      </div>

      <div className="rounded-lg bg-blue-100 py-4 flex justify-center items-center gap-6">
        <PlanTypeLabel currentPlanType={planType} label="Monthly" />
        <SwitchButton
          size="md"
          checked={planType === "yearly"}
          onChange={(checked) => {
            registerInfo.current.planType = checked ? "yearly" : "monthly";
            setPlanType(checked ? "yearly" : "monthly");
          }}
          className="bg-blue-950"
          noColorChange={true}
        />
        <PlanTypeLabel currentPlanType={planType} label="Yearly" />
      </div>
    </div>
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
      className={`p-4 flex items-center gap-4 border border-grey-500 rounded-lg tracking-tight ${
        selected ? "bg-blue-100 border-purple-600" : ""
      }`}
      onClick={onSelect}
    >
      <button
        className={`w-6 h-6 aspect-square rounded-md border border-grey-500
      ${selected ? "bg-purple-600 border-none" : ""}
        `}
      >
        {selected && (
          <Image
            src="/images/icon-checkmark.svg"
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
        +${addon.price[planType]}/${planType === "monthly" ? "mo" : "yr"}
      </span>
    </div>
  );
};

type AddOnsBlockProps = {
  registerInfo: RefObject<RegisterInfo>;
};

const AddOnsBlock = ({ registerInfo }: AddOnsBlockProps) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    registerInfo.current.addons
  );
  const planType = registerInfo.current.planType;

  const addOrRemoveAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      const newAddons = selectedAddons.filter((a) => a !== addon);
      registerInfo.current.addons = newAddons;
      setSelectedAddons(newAddons);
    } else {
      const newAddons = [...selectedAddons, addon];
      registerInfo.current.addons = newAddons;
      setSelectedAddons(newAddons);
    }
  };

  return (
    <div className="shadow-lg mx-4 rounded-lg bg-white px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-blue-950 text-2xl font-bold">Pick add-ons</span>
        <span className="text-grey-500">
          Add-ons help enhance your gaming experience.
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {addons.map((addon) => (
          <AddonItem
            key={addon.name}
            name={addon.name}
            planType={planType}
            selected={selectedAddons.includes(addon.name)}
            onSelect={() => addOrRemoveAddon(addon.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [step, setStep] = useState(2);
  const registerInfo = useRef<RegisterInfo>({
    name: "",
    email: "",
    phone: "",
    plan: "",
    addons: [],
    planType: "monthly",
  });

  return (
    <div className="h-screen flex flex-col">
      <div className="py-8 flex justify-center items-center gap-4">
        <StepButton step={1} selected={step === 1} />
        <StepButton step={2} selected={step === 2} />
        <StepButton step={3} selected={step === 3} />
      </div>

      {step === 1 && <PersonalInfoBlock registerInfo={registerInfo} />}
      {step === 2 && <SelectPlanBlock registerInfo={registerInfo} />}
      {step === 3 && <AddOnsBlock registerInfo={registerInfo} />}

      <div className="mt-auto drop-shadow-lg bg-white shadow-lg p-4 flex justify-between items-center">
        <button
          className={`text-grey-500 font-medium ${step === 1 ? "hidden" : ""} `}
          onClick={() => setStep(step - 1)}
        >
          Go Back
        </button>

        <button
          className="ml-auto rounded-md bg-blue-950 text-white font-medium px-4 py-2"
          onClick={() => setStep(step + 1)}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
