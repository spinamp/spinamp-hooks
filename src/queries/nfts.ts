import {
  fetchArtistNfts,
  fetchArtistNftsOwners,
  fetchTrackNfts,
  fetchTrackNftsOwners,
} from '@spinamp/spinamp-sdk';
import {INft, ITrackNft} from '@spinamp/spinamp-sdk/lib/types';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {queryConfig} from '@/spinampQueryClient';

import {QueryKeys} from './QueryKeys';

export const useTrackNftsQuery = (
  trackId: string,
  queryOptions: UseQueryOptions<INft[]> = {},
) => {
  const result = useQuery<INft[]>(
    QueryKeys.trackNfts(trackId),
    () => fetchTrackNfts(trackId),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    nfts: result.data || [],
    ...result,
  };
};

export const useTrackNftsOwnersQuery = (
  trackId: string,
  queryOptions: UseQueryOptions<string[]> = {},
) => {
  const result = useQuery<string[]>(
    QueryKeys.trackNftsOwners(trackId),
    () => fetchTrackNftsOwners(trackId),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    owners: result.data || [],
    ...result,
  };
};

export const useArtistNftsQuery = (
  artistId: string,
  queryOptions: UseQueryOptions<ITrackNft[]> = {},
) => {
  const result = useQuery<ITrackNft[]>(
    QueryKeys.artistNfts(artistId),
    () => fetchArtistNfts(artistId),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    nfts: result.data || [],
    ...result,
  };
};

export const useArtistNftsOwnersQuery = (
  artistId: string,
  queryOptions: UseQueryOptions<string[]> = {},
) => {
  const result = useQuery<string[]>(
    QueryKeys.artistNftsOwners(artistId),
    () => fetchArtistNftsOwners(artistId),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    owners: result.data || [],
    ...result,
  };
};
