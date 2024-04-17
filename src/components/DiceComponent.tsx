import React, { useState, useEffect } from "react";
import { HStack, Input, Select, IconButton, Text } from "@chakra-ui/react";
import { diceOptions } from "../dndTypes";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

type DiceComponentProps = {
  onChange: (diceString: string) => void;
};

const DiceComponent = ({ onChange }: DiceComponentProps) => {
  const [diceList, setDiceList] = useState([{ numberOfDice: 1, typeOfDice: 'd6' }]);
  const [modifier, setModifier] = useState(0);

  useEffect(() => {
    const diceString = diceList.map(({ numberOfDice, typeOfDice }) => `${numberOfDice}${typeOfDice}`).join('+') + (modifier > 0 ? `+${modifier}` : '');
    onChange(diceString);
  }, [diceList, modifier]);

  const handleDiceChange = (index : number, field : string, value : any) => {
    setDiceList(diceList => diceList.map((entry, idx) => idx === index ? { ...entry, [field]: value } : entry));
  };

  const addDiceEntry = () => {
    setDiceList(diceList => [...diceList, { numberOfDice: 1, typeOfDice: 'd6' }]);
  };

  const removeDiceEntry = (index : number) => {
    setDiceList(diceList => diceList.filter((_, idx) => idx !== index));
  };

  const calculateMin = () => {
    let min = 0;
    diceList.forEach(dice => {
      min += dice.numberOfDice;
    });
    min += modifier;
    return min;
  }

  const calculateAverage = () => {
    let average = 0;
    diceList.forEach(dice => {
      average += (dice.numberOfDice * (parseInt(dice.typeOfDice.slice(1)) + 1)) / 2;
    });
    average += modifier;
    return average;
  }

  const calculateMax = () => {
    let max = 0;
    diceList.forEach(dice => {
      max += dice.numberOfDice * parseInt(dice.typeOfDice.slice(1));
    });
    max += modifier;
    return max;
  }

  return (
    <HStack>
      {diceList.map((dice, index) => (
        <HStack key={index}>
          <Input
            width="50px"
            value={dice.numberOfDice}
            onChange={(e) => handleDiceChange(index, 'numberOfDice', parseInt(e.target.value))}
            type="number"
            min={0}
          />
          <Select
            width="80px"
            value={dice.typeOfDice}
            onChange={(e) => handleDiceChange(index, 'typeOfDice', e.target.value)}
          >
            {diceOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Select>
          <Text>+</Text>
        </HStack>
      ))}
      <Input
        width="70px"
        value={modifier}
        onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
        type="number"
      />
      <IconButton
        onClick={addDiceEntry}
        colorScheme="green"
        aria-label="Add Dice"
        icon={<AddIcon />}
      />
      { diceList.length > 0 &&
      <IconButton 
        onClick={() => removeDiceEntry(diceList.length - 1)}
        colorScheme="red"
        aria-label="Remove Dice"
        icon={<MinusIcon />}
      />
      }
      <Text
      fontStyle="italic"
      whiteSpace="nowrap"
      color={"gray.500"}
      > ({calculateMin()}, {calculateAverage()}, {calculateMax()}) 
      </Text>
    </HStack>
  );
};

export default DiceComponent;
