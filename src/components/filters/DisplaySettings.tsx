
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DisplaySettingsProps {
  showOfferTitles: boolean;
  onToggleOfferTitles: (checked: boolean) => void;
}

const DisplaySettings: React.FC<DisplaySettingsProps> = ({
  showOfferTitles,
  onToggleOfferTitles
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
    </div>
  );
};

export default DisplaySettings;
