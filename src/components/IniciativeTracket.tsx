import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, VStack, NumberInput, NumberInputField, IconButton, HStack,
  Text
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

// Define TypeScript interfaces for participant and props if necessary
interface Participant {
  id: number;
  name: string;
  initiative: number;
}

const InitiativeTracker: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState<string>('');
  const [newInitiative, setNewInitiative] = useState<string>('');

  const handleAddParticipant = (): void => {
    if (!newParticipant || newInitiative === '') return; // Prevent adding empty values
    const participant: Participant = {
      id: Date.now(), // simple unique identifier
      name: newParticipant,
      initiative: parseInt(newInitiative, 10)
    };
    setParticipants([...participants, participant]);
    setNewParticipant('');
    setNewInitiative('');
  };

  const handleRemoveParticipant = (id: number): void => {
    setParticipants(participants.filter(participant => participant.id !== id));
  };

  const updateInitiative = (id: number, value: string): void => {
    setParticipants(participants.map(participant => {
      if (participant.id === id) {
        return { ...participant, initiative: parseInt(value, 10) };
      }
      return participant;
    }));
  };

  // Sort participants by initiative before rendering
  participants.sort((a, b) => b.initiative - a.initiative);

return (
    <Box>
        <VStack margin={2}>
            {participants.map((participant) => (
                <HStack key={participant.id} 
                backgroundColor={"blue.800"} 
                padding={2}
                borderRadius="md"
                border="1px solid"
                >
                    <FormControl
                    width={20} // Update width to 20px
                    >
                        <NumberInput 
                            value={participant.initiative}
                            onChange={(valueString) => updateInitiative(participant.id, valueString)}
                            min={1}
                            width={20} // Update width to 20px
                        >
                            <NumberInputField 
                            textAlign={"center"}
                            width={20} // Update width to 20px
                            />
                        </NumberInput>
                    </FormControl>
                    <Text
                    width={40} // Update width to 40px
                    textAlign="start"
                    backgroundColor={"blue.700"}
                    >{participant.name}</Text>
                    <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Remove participant"
                        onClick={() => handleRemoveParticipant(participant.id)}
                    />
                    </HStack>
            ))}
            <FormControl>
                <FormLabel>Add new participant</FormLabel>
                <Input
                    placeholder="Name"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                />
                <NumberInput
                    value={newInitiative}
                    onChange={(valueString) => setNewInitiative(valueString)}
                    min={1}
                >
                    <NumberInputField />
                </NumberInput>
            </FormControl>
            <Button onClick={handleAddParticipant} colorScheme="blue">Add Participant</Button>
        </VStack>
    </Box>
);
};

export default InitiativeTracker;
