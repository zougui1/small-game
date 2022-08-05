import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Guard = ({ guards, children }: GuardProps) => {
  const navigate = useNavigate();

  const failedGuard = guards.find(guard => !guard.condition());

  useEffect(() => {
    if (failedGuard) {
      navigate(failedGuard.redirectTo);
    }
  }, [failedGuard?.redirectTo]);

  if (failedGuard) {
    return <></>;
  }

  return <>{children}</>;
}

export interface GuardProps {
  guards: GuardType[];
  children?: React.ReactNode;
}

export interface GuardType {
  redirectTo: string;
  condition: () => boolean;
}
