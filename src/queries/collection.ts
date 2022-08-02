import {fetchCollectionForAddress} from '@spinamp/spinamp-sdk';
import {useQuery} from '@tanstack/react-query';

import {QueryKeys} from '@/queries/QueryKeys';
import {queryConfig} from '@/queryClient';

export const useCollectionQuery = (address: string) => {
  const result = useQuery(
    QueryKeys.collection(address),
    () => fetchCollectionForAddress(address),
    {
      ...queryConfig,
    },
  );

  return {
    collection: result.data || [],
    ...result,
  };
};
