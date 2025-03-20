import { useNavigate, useParams } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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

  const { deviceType } = useParams();

  return (
    <div className="flex justify-center border-b border-border">
      <NavigationMenu>
        <NavigationMenuList>
          {deviceTypes.map((type) => (
            <NavigationMenuItem key={type.value}>
              <NavigationMenuLink
                href = {`/type/${type.value}`}
                active = {deviceType === type.value}
                className="cursor-pointer"
              >
                {type.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DeviceTypeMenu;
