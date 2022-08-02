import {
  fetchAllTracks,
  fetchTrackByIdOrSlug,
  IApiListQueryParams,
  IApiListQueryResponse,
  ITrack,
} from '@spinamp/spinamp-sdk';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {useMemo} from 'react';

import {
  flattenPaginatedItems,
  getNextPageParam,
  getPaginatedTotalCount,
} from '@/helpers';
import {queryConfig} from '@/spinampQueryClient';

import {QueryKeys} from './QueryKeys';

export const useAllTracksQuery = (
  params?: IApiListQueryParams,
  queryOptions: UseQueryOptions<IApiListQueryResponse<ITrack>> = {},
) => {
  const result = useQuery<IApiListQueryResponse<ITrack>>(
    QueryKeys.tracks(params),
    () => fetchAllTracks(params),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    tracks: result.data?.items || [],
    ...result,
  };
};

export const usePaginatedTracksQuery = (
  pageSize = 20,
  params?: Pick<IApiListQueryParams, 'filter' | 'orderBy'>,
  queryOptions: UseInfiniteQueryOptions<IApiListQueryResponse<ITrack>> = {},
) => {
  const result = useInfiniteQuery<IApiListQueryResponse<ITrack>>(
    QueryKeys.paginatedTracks(params),
    ({pageParam: after}) => fetchAllTracks({...params, first: pageSize, after}),
    {
      ...queryOptions,
      getNextPageParam,
      ...queryConfig(),
    },
  );

  const tracks = useMemo(
    () => flattenPaginatedItems(result.data?.pages),
    [result.data?.pages],
  );

  return {
    tracks,
    totalCount: getPaginatedTotalCount(result.data?.pages),
    ...result,
  };
};

export const useTrackQuery = (
  idOrSlug: string,
  queryOptions: UseQueryOptions<ITrack | null> = {},
) => {
  const result = useQuery<ITrack | null>(
    QueryKeys.track(idOrSlug),
    () => fetchTrackByIdOrSlug(idOrSlug),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    track: result.data || null,
    ...result,
  };
};
