import {fetchAllPlatforms, fetchPlatformById} from '@spinamp/spinamp-sdk';
import {useQuery} from '@tanstack/react-query';

import {QueryKeys} from '@/queries/QueryKeys';
import {queryConfig} from '@/queryClient';

export const usePlatformsQuery = () => {
  const result = useQuery(QueryKeys.platforms(), () => fetchAllPlatforms(), {
    ...queryConfig,
  });

  return {
    platforms: result.data || [],
    ...result,
  };
};

export const usePlatformQuery = (platformId: string) => {
  const result = useQuery(
    QueryKeys.platform(platformId),
    () => fetchPlatformById(platformId),
    {
      ...queryConfig,
    },
  );

  return {
    platform: result.data || null,
    ...result,
  };
};
