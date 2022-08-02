import {QueryClientProvider} from '@tanstack/react-query';
import React, {FC, ReactNode} from 'react';

import {queryClient, QueryContext} from '../queryClient';

interface IProps {
  children: ReactNode;
}

const SpinampProvider: FC<IProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient} context={QueryContext}>
      {children}
    </QueryClientProvider>
  );
};

export default SpinampProvider;
