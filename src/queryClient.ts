import {QueryClient} from '@tanstack/react-query';
import {createContext} from 'react';

export const QueryContext = createContext<QueryClient | undefined>(undefined);

export const queryClient = new QueryClient();

export const queryConfig = {
  context: QueryContext,
};
