import {
  fetchCollectorPlaylists,
  fetchFeaturedPlaylists,
  fetchPlaylistById,
  IPlaylist,
  ITrack,
} from '@spinamp/spinamp-sdk';
import {useQuery, UseQueryOptions} from '@tanstack/react-query';

import {QueryKeys} from '@/queries/QueryKeys';
import {queryConfig} from '@/spinampQueryClient';

export const useFeaturedPlaylistsQuery = (
  queryOptions: UseQueryOptions<IPlaylist[]> = {},
) => {
  const result = useQuery<IPlaylist[]>(
    QueryKeys.featuredPlaylists(),
    () => fetchFeaturedPlaylists(),
    {...queryOptions, ...queryConfig()},
  );

  return {
    playlists: result.data || [],
    ...result,
  };
};

export const usePlaylistDetailsQuery = (
  playlistId: string,
  queryOptions: UseQueryOptions<{
    playlist: IPlaylist;
    playlistTracks: ITrack[];
  }> = {},
) => {
  const result = useQuery<{playlist: IPlaylist; playlistTracks: ITrack[]}>(
    QueryKeys.playlistDetails(playlistId),
    () => fetchPlaylistById(playlistId),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    playlist: result.data?.playlist || null,
    playlistTracks: result.data?.playlistTracks || [],
    ...result,
  };
};

export const useCollectorPlaylistsQuery = (
  address: string,
  queryOptions: UseQueryOptions<IPlaylist[]>,
) => {
  const result = useQuery<IPlaylist[]>(
    QueryKeys.collectorPlaylists(address),
    () => fetchCollectorPlaylists(address),
    {
      ...queryOptions,
      ...queryConfig(),
    },
  );

  return {
    playlists: result.data || [],
    ...result,
  };
};
