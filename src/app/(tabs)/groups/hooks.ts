const useGroups = () => {
  const owed = 102.28;
  const own = 76.84;

  const onSettleUp = () => {
    console.log('Settle up');
  };

  const onViewDetails = () => {
    console.log('View details');
  };

  const onBalance = () => {
    console.log('Balance');
  };

  return { owed, own, onBalance, onSettleUp, onViewDetails };
};

export { useGroups };
