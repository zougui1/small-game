import { useEffect } from 'react';

import { useId } from '~/hooks/useId';

import { useDropdownActions } from './context';

export const DropdownRoot = ({ id }: DropdownRootProps) => {
  const dropdownId = useId(id);
  const actions = useDropdownActions();

  useEffect(() => {
    actions.updateId(dropdownId);
  }, [dropdownId, actions]);

  return <></>;
}

export interface DropdownRootProps {
  id?: string;
}
