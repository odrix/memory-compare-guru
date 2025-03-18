import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DeviceTypeMenu = () => {
  const navigate = useNavigate();
  const deviceTypes = [
    { label: "HDD", value: "hdd" },
    { label: "SSD", value: "nvme" },
    { label: "SATA", value: "sata" },
  ];

  const handleTypeSelect = (type: string) => {
    navigate(`/type/${type}`);
  };

  return (
    <div className="flex justify-center border-b border-border">
      <NavigationMenu>
        <NavigationMenuList>
          {deviceTypes.map((type) => (
            <NavigationMenuItem key={type.value}>
              <NavigationMenuTrigger
                onClick={() => handleTypeSelect(type.value)}
                className="cursor-pointer"
              >
                {type.label}
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DeviceTypeMenu;
