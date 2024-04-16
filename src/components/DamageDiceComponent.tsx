import { Box, Button, HStack, Input, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { damageTypeEmojis, damageTypes, diceOptions } from "../dndTypes";
import DiceComponent from "./DiceComponent";

export const DamageDiceComponent: React.FC = () => {
  const [damageType, setDamageType] = useState<string>('SLASHING');

  return (
    <Box>
      <HStack mt={4}>
      <DiceComponent />
        <Select 
        value={damageType} onChange={(e) => setDamageType(e.target.value)} 
        width="150px"
        >
          {Object.entries(damageTypes).map(([key, type]) => (
            <option key={key} value={key}>
              {damageTypeEmojis[key as keyof typeof damageTypeEmojis]} {type}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};

export default DamageDiceComponent;