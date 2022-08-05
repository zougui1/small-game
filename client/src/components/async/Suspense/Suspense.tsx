import { CircularProgress, Typography } from '@mui/material';

const defaultErrorMessage = 'An error occured while fetching data';

export function Suspense<T>({ isLoading, error, errorMessage = defaultErrorMessage, data, render }: SuspenseProps<T>) {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="red">{errorMessage}</Typography>;
  }

  return (
    <>
      {data !== undefined
        ? render(data as Exclude<T, undefined>)
        : <Typography>No data found</Typography>
      }
    </>
  );
}

export interface SuspenseProps<T> {
  isLoading: boolean;
  error?: boolean | undefined;
  errorMessage?: string | undefined;
  data: T | undefined;
  render: (data: Exclude<T, undefined>) => React.ReactNode;
}
