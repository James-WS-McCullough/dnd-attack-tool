import { Box, Button, HStack, Input, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { diceOptions } from "./dndTypes";

interface DiceInput {
    numberOfDice: number;
    typeOfDice: string;
  }
  
  const DamageDiceComponent: React.FC = () => {
    const [diceList, setDiceList] = React.useState<DiceInput[]>([
      { numberOfDice: 1, typeOfDice: 'd6' }
    ]);
    const [modifier, setModifier] = React.useState(0);
  
    const handleDiceChange = (index: number, field: keyof DiceInput, value: number | string) => {
      const newDiceList = diceList.map((entry, idx) => {
        if (idx === index) {
          return { ...entry, [field]: value };
        }
        return entry;
      });
      setDiceList(newDiceList);
    };
  
    const addDiceEntry = () => {
      setDiceList([...diceList, { numberOfDice: 1, typeOfDice: 'd6' }]);
    };
  
    const calculateAverageDamage = () => {
      const averageFromDice = diceList.reduce((acc, { numberOfDice, typeOfDice }) => {
        const diceMax = parseInt(typeOfDice.substring(1)); // Extract '6' from 'd6'
        const averagePerDie = (diceMax + 1) / 2; // Average roll of the dice
        return acc + (numberOfDice * averagePerDie);
      }, 0);
      return averageFromDice + modifier;
    };
  
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
        <HStack>
          <Input
            width="100px"
            value={modifier}
            onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
            type="number"
          />
        <Button onClick={addDiceEntry}>Add Dice</Button>
        <Text mt={2}>Average Damage: {calculateAverageDamage().toFixed(2)}</Text>
        </HStack>
        </HStack>
    );
  };

export default DamageDiceComponent;