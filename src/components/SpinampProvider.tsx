import {QueryClientProvider} from '@tanstack/react-query';
import React, {FC, ReactNode} from 'react';

import {spinampQueryClient, QueryContext} from '@/spinampQueryClient';

interface IProps {
  children: ReactNode;
}

const SpinampProvider: FC<IProps> = ({children}) => {
  return (
    <QueryClientProvider client={spinampQueryClient} context={QueryContext}>
      {children}
    </QueryClientProvider>
  );
};

export default SpinampProvider;
