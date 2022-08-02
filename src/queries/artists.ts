import {
  fetchAllArtists,
  fetchArtistByIdOrSlug,
  IApiListQueryParams,
  IApiListQueryResponse,
  IArtist,
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

export const useAllArtistsQuery = (
  params?: IApiListQueryParams,
  queryOptions: UseQueryOptions<IApiListQueryResponse<IArtist>> = {},
) => {
  const result = useQuery<IApiListQueryResponse<IArtist>>(
    QueryKeys.artists(params),
    () => fetchAllArtists(params),
    {
      ...queryOptions,
      ...queryConfig(),
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
  queryOptions: UseInfiniteQueryOptions<IApiListQueryResponse<IArtist>> = {},
) => {
  const result = useInfiniteQuery<IApiListQueryResponse<IArtist>>(
    QueryKeys.paginatedArtists(params),
    ({pageParam: after}) =>
      fetchAllArtists({...params, first: pageSize, after}),
    {
      ...queryOptions,
      getNextPageParam,
      ...queryConfig(),
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

export const useArtistQuery = (
  idOrSlug: string,
  queryOptions: UseQueryOptions<IArtist | null> = {},
) => {
  const result = useQuery<IArtist | null>(
    QueryKeys.artist(idOrSlug),
    () => fetchArtistByIdOrSlug(idOrSlug),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    artist: result.data || null,
    ...result,
  };
};
