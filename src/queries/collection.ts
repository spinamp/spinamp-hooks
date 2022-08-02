import {
  fetchCollectionForAddress,
  ICollectionTrack,
} from '@spinamp/spinamp-sdk';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {QueryKeys} from '@/queries/QueryKeys';
import {queryConfig} from '@/spinampQueryClient';

export const useCollectionQuery = (
  address: string,
  queryOptions: UseQueryOptions<ICollectionTrack[]> = {},
) => {
  const result = useQuery<ICollectionTrack[]>(
    QueryKeys.collection(address),
    () => fetchCollectionForAddress(address),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    collection: result.data || [],
    ...result,
  };
};
