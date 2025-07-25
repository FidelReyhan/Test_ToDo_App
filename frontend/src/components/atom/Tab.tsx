import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "./Card";

const tabs: { label: string; url: string }[] = [
  { label: "Overview", url: "/overview" },
  { label: "Claim Details", url: "/overview" },
  { label: "Utilization Details", url: "/overview" },
  { label: "Activation Details", url: "/overview" },
];

export const Tab = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className='flex gap-4'>
      {tabs.map((tab, index) => (
        <TabCard
          key={`tab-${index}`}
          label={tab.label}
          url={tab.url}
          isActive={activeTab === index}
          onClick={() => setActiveTab(index)}
        />
      ))}
    </div>
  );
};

const TabCard = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  url?: string;
  isActive?: boolean;
  onClick: () => void;
}) => {
  return (
    <Card
      className={twMerge(
        "glass cursor-pointer w-full p-2 flex justify-center transition-colors items-center text-sm rounded-lg",
        isActive
          ? "bg-primary text-white font-semibold"
          : "bg-white text-primary hover:bg-primary hover:text-white hover:font-semibold"
      )}
      onClick={onClick}
    >
      {label}
    </Card>
  );
};
