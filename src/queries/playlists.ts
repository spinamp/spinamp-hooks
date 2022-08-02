import {
  fetchCollectorPlaylists,
  fetchFeaturedPlaylists,
  fetchPlaylistById,
} from '@spinamp/spinamp-sdk';
import {useQuery} from '@tanstack/react-query';

import {QueryKeys} from '@/queries/QueryKeys';
import {queryConfig} from '@/queryClient';

export const useFeaturedPlaylistsQuery = () => {
  const result = useQuery(
    QueryKeys.featuredPlaylists(),
    () => fetchFeaturedPlaylists(),
    {
      ...queryConfig,
    },
  );

  return {
    playlists: result.data || [],
    ...result,
  };
};

export const usePlaylistDetailsQuery = (playlistId: string) => {
  const result = useQuery(
    QueryKeys.playlistDetails(playlistId),
    () => fetchPlaylistById(playlistId),
    {
      ...queryConfig,
    },
  );

  return {
    playlist: result.data?.playlist || null,
    playlistTracks: result.data?.playlistTracks || [],
    ...result,
  };
};

export const useCollectorPlaylistsQuery = (address: string) => {
  const result = useQuery(
    QueryKeys.collectorPlaylists(address),
    () => fetchCollectorPlaylists(address),
    {
      ...queryConfig,
    },
  );

  return {
    playlists: result.data || [],
    ...result,
  };
};
