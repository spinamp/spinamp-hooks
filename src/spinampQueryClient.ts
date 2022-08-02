import {DefaultOptions, QueryClient} from '@tanstack/react-query';
import {createContext} from 'react';

let useCustomProvider = false;

export const QueryContext = createContext<QueryClient | undefined>(undefined);

export const spinampQueryClient = new QueryClient();

export const setSpinampClientOptions = (options: DefaultOptions) =>
  spinampQueryClient.setDefaultOptions(options);

export const enableCustomSpinampProvider = () => {
  useCustomProvider = true;
};

export const queryConfig = () => ({
  context: useCustomProvider ? undefined : QueryContext,
});
