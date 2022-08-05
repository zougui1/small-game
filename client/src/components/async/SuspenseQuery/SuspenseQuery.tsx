import { UseQueryResult } from '@tanstack/react-query';

import { Suspense, SuspenseProps } from '~/components/async/Suspense';

export function SuspenseQuery<TData = unknown>({ query, render, errorMessage }: SuspenseQueryProps<TData>) {
  return (
    <Suspense
      isLoading={query.isLoading}
      error={Boolean(query.error)}
      data={query.data}
      render={render}
      errorMessage={errorMessage}
    />
  );
}

export interface SuspenseQueryProps<TData> {
  query: UseQueryResult<TData>,
  render: SuspenseProps<TData>['render'],
  errorMessage?: string | undefined;
}
