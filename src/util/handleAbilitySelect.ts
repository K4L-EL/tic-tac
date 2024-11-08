export const handleAbilitySelect = (
    ability: 'destroy' | 'convert',
    setSelectedAbility: (ability: 'destroy' | 'convert' | null) => void
  ) => {
    setSelectedAbility(ability);
  };
  