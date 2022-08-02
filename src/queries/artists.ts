import {
  fetchAllArtists,
  fetchArtistByIdOrSlug,
  IApiListQueryParams,
} from '@spinamp/spinamp-sdk';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

import {flattenPaginatedItems, getPaginatedTotalCount} from '@/helpers';
import {queryConfig} from '@/queryClient';

import {QueryKeys} from './QueryKeys';

export const useAllArtistsQuery = (params?: IApiListQueryParams) => {
  const result = useQuery(
    QueryKeys.artists(params),
    () => fetchAllArtists(params),
    {
      ...queryConfig,
    },
  );

  return {
    artists: result.data?.items || [],
    ...result,
  };
};

export const usePaginatedArtistsQuery = (
  pageSize = 20,
  params?: Pick<IApiListQueryParams, 'filter' | 'orderBy'>,
) => {
  const result = useInfiniteQuery(
    QueryKeys.paginatedArtists(params),
    ({pageParam: after}) =>
      fetchAllArtists({...params, first: pageSize, after}),
    {
      getNextPageParam: lastPage =>
        lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
      ...queryConfig,
    },
  );

  const artists = useMemo(
    () => flattenPaginatedItems(result.data?.pages),
    [result.data?.pages],
  );

  return {
    artists,
    totalCount: getPaginatedTotalCount(result.data?.pages),
    ...result,
  };
};

export const useArtistQuery = (idOrSlug: string) => {
  const result = useQuery(
    QueryKeys.artist(idOrSlug),
    () => fetchArtistByIdOrSlug(idOrSlug),
    {...queryConfig},
  );

  return {
    track: result.data || null,
    ...result,
  };
};
