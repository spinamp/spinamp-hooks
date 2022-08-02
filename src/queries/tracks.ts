import {
  fetchAllTracks,
  fetchTrackByIdOrSlug,
  IApiListQueryParams,
} from '@spinamp/spinamp-sdk';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

import {
  flattenPaginatedItems,
  getNextPageParam,
  getPaginatedTotalCount,
} from '@/helpers';
import {queryConfig} from '@/queryClient';

import {QueryKeys} from './QueryKeys';

export const useAllTracksQuery = (params?: IApiListQueryParams) => {
  const result = useQuery(
    QueryKeys.tracks(params),
    () => fetchAllTracks(params),
    {
      ...queryConfig,
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
) => {
  const result = useInfiniteQuery(
    QueryKeys.paginatedTracks(params),
    ({pageParam: after}) => fetchAllTracks({...params, first: pageSize, after}),
    {
      getNextPageParam,
      ...queryConfig,
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

export const useTrackQuery = (idOrSlug: string) => {
  const result = useQuery(
    QueryKeys.track(idOrSlug),
    () => fetchTrackByIdOrSlug(idOrSlug),
    {...queryConfig},
  );

  return {
    track: result.data || null,
    ...result,
  };
};
