import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Heading, IconButton, Input, Select, StackDivider, Textarea, VStack, Wrap, WrapItem, useToast
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { Attack, damageTypes, damageTypeEmojis, conditions, stats, statEmojis, statColors, WeaponAttack, AttackType, WeaponSubType, SpellAttack, SpellSubType, AoEAttack, AoESubType, DamageEntry } from './dndTypes';
import DamageDiceComponent from './components/DamageDiceComponent';
const AttackForm: React.FC = () => {
  const [attacks, setAttacks] = useState<Attack[]>([]);

  const addAttack = () => {
    const newAttack: WeaponAttack = {
      id: attacks.length + 1,
      name: '',
      type: AttackType.Weapon,
      subType: WeaponSubType.Melee,
      toHit: '',
      reachOrRange: '',
      targets: '',
      hitDamage: '',
      damageType: damageTypes.SLASHING,
      description: ''
    };
    setAttacks([...attacks, newAttack]);
  };

  const handleInputChange = (id: number, field: string, value: any) => {
    setAttacks(attacks => attacks.map(attack => {
        if (attack.id === id) {
            return { ...attack, [field]: value };
        }
        return attack;
    }));
};

  const renderAttackFields = (attack: Attack) => {
    switch (attack.type) {
      case AttackType.Weapon:
        const weaponAttack = attack as WeaponAttack;
        return (
          <>
            <FormControl>
              <FormLabel>Sub-Type</FormLabel>
              <Select value={weaponAttack.subType} onChange={(e) => handleInputChange(attack.id, 'subType', e.target.value)}>
                {Object.values(WeaponSubType).map(subType => (
                  <option key={subType} value={subType}>{subType}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>To Hit Modifier</FormLabel>
              <Input value={weaponAttack.toHit} onChange={(e) => handleInputChange(attack.id, 'toHit', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Reach or Range</FormLabel>
              <Input value={weaponAttack.reachOrRange} onChange={(e) => handleInputChange(attack.id, 'reachOrRange', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Targets</FormLabel>
              <Input value={weaponAttack.targets} onChange={(e) => handleInputChange(attack.id, 'targets', e.target.value)} />
            </FormControl>
          </>
        );
      case AttackType.Spell:
        const spellAttack = attack as SpellAttack;
        return (
          <>
            <FormControl>
              <FormLabel>Sub-Type</FormLabel>
              <Select value={spellAttack.subType} onChange={(e) => handleInputChange(attack.id, 'subType', e.target.value)}>
                {Object.values(SpellSubType).map(subType => (
                  <option key={subType} value={subType}>{subType}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Spell Save DC (if applicable)</FormLabel>
              <Input value={spellAttack.spellSaveDC || ''} placeholder="Only for Saving Throw Spells" onChange={(e) => handleInputChange(attack.id, 'spellSaveDC', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Effect Description</FormLabel>
              <Textarea value={spellAttack.effectDescription} onChange={(e) => handleInputChange(attack.id, 'effectDescription', e.target.value)} />
            </FormControl>
          </>
        );
      case AttackType.AoE:
        const aoeAttack = attack as AoEAttack;
        return (
          <>
            <FormControl>
              <FormLabel>Sub-Type</FormLabel>
              <Select value={aoeAttack.subType} onChange={(e) => handleInputChange(attack.id, 'subType', e.target.value)}>
                {Object.values(AoESubType).map(subType => (
                  <option key={subType} value={subType}>{subType}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Range/Area</FormLabel>
              <Input value={aoeAttack.range} onChange={(e) => handleInputChange(attack.id, 'range', e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Effect Description</FormLabel>
              <Textarea value={aoeAttack.effectDescription} onChange={(e) => handleInputChange(attack.id, 'effectDescription', e.target.value)} />
            </FormControl>
          </>
        );
      // Implement cases for ConditionEffect and Utility as needed
      default:
        return null;
    }
  };

  return (
    <Box>
      {attacks.map((attack) => (
        <VStack key={attack.id} divider={<StackDivider borderColor="gray.200" />} p={5}>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={attack.name} onChange={(e) => handleInputChange(attack.id, 'name', e.target.value)} />
          </FormControl>
          <FormControl>
              <FormLabel>Hit Damage</FormLabel>
              <DamageDiceComponent
                damageEntry={{ dice: '1d6', damageType: 'SLASHING' }}
                onChange={(entry) => handleInputChange(attack.id, 'hitDamage', entry)}
              />
            </FormControl>
          <FormControl>
            <FormLabel>Attack Type</FormLabel>
            <Select value={attack.type} onChange={(e) => handleInputChange(attack.id, 'type', e.target.value as AttackType)}>
              {Object.values(AttackType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Select>
          </FormControl>
          {renderAttackFields(attack)}
        </VStack>
      ))}
      <Button onClick={addAttack}>Add Attack</Button>
    </Box>
  );
};

export default AttackForm;