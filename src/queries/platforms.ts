import {
  fetchAllPlatforms,
  fetchPlatformById,
  IMusicPlatformData,
} from '@spinamp/spinamp-sdk';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {QueryKeys} from '@/queries/QueryKeys';
import {queryConfig} from '@/spinampQueryClient';

export const usePlatformsQuery = (
  queryOptions: UseQueryOptions<IMusicPlatformData[]>,
) => {
  const result = useQuery<IMusicPlatformData[]>(
    QueryKeys.platforms(),
    () => fetchAllPlatforms(),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    platforms: result.data || [],
    ...result,
  };
};

export const usePlatformQuery = (
  platformId: string,
  queryOptions: UseQueryOptions<IMusicPlatformData> = {},
) => {
  const result = useQuery<IMusicPlatformData>(
    QueryKeys.platform(platformId),
    () => fetchPlatformById(platformId),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    platform: result.data || null,
    ...result,
  };
};
