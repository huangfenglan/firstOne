import { useReducer } from 'react';

export const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((x: any) => x + 1, 0);
  return forceUpdate;
};
