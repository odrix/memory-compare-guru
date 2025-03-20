
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DisplaySettingsProps {
  showOfferTitles: boolean;
  onToggleOfferTitles: (checked: boolean) => void;
  showInTerabytes: boolean;
  onToggleTerabytes: (checked: boolean) => void;
}

const DisplaySettings: React.FC<DisplaySettingsProps> = ({
  showOfferTitles,
  onToggleOfferTitles,
  showInTerabytes,
  onToggleTerabytes
}) => {
  return (
    <div className="space-y-4 border-b border-border pb-4">
      <h3 className="text-md font-semibold">Affichage</h3>
      <div className="flex items-center justify-between">
        <Label htmlFor="show-offer-titles" className="text-sm">
          Afficher les titres des offres
        </Label>
        <Switch
          id="show-offer-titles"
          checked={showOfferTitles}
          onCheckedChange={onToggleOfferTitles}
          className="bg-gray-300 data-[state=checked]:bg-green-300"
        />
      </div>
      <div className="flex items-center justify-end">
        <Label htmlFor="show-in-terabytes" className="text-sm">
          Go
        </Label>
        <Switch
          id="show-in-terabytes"
          checked={showInTerabytes}
          onCheckedChange={onToggleTerabytes}
          className="bg-gray-300 mx-4
                    data-[state=checked]:bg-amber-600 
                    data-[state=unchecked]:bg-indigo-400"
        />
        <Label htmlFor="show-in-terabytes" className="text-sm mr-2">
          To
        </Label>
      </div>
    </div>
  );
};

export default DisplaySettings;
