import { Box, Button, HStack, Input, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { DamageEntry, damageTypeEmojis, damageTypes, diceOptions } from "../dndTypes";
import DiceComponent from "./DiceComponent";

export const DamageDiceComponent = ({ onChange, damageEntry }: { onChange: (entry: DamageEntry) => void, damageEntry: DamageEntry }) => {
  const handleDiceChange = (dice: string) => {
    onChange({ ...damageEntry, dice });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...damageEntry, damageType: event.target.value as keyof typeof damageTypes });
  };

  return (
    <HStack>
      <DiceComponent onChange={handleDiceChange} dice={damageEntry.dice} />
      <HStack>
        <Text>Type of Damage:</Text>
        <Select value={damageEntry.damageType} onChange={handleTypeChange}>
          {Object.entries(damageTypeEmojis).map(([type, emoji]) => (
            <option key={type} value={type}>{emoji} {damageTypes[type as keyof typeof damageTypes]}</option>
          ))}
        </Select>
      </HStack>
    </HStack>
  );
};

export default DamageDiceComponent;