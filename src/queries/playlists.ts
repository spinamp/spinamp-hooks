import {
  createPlaylist,
  fetchCollectorPlaylists,
  fetchFeaturedPlaylists,
  fetchPlaylistById,
  IPlaylist,
  ITrack,
  updatePlaylist,
} from '@spinamp/spinamp-sdk';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {Signer} from 'ethers';

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

interface ICreatePlaylistPayload {
  playlist: IPlaylist;
  signer: Signer;
}

export const useCreatePlaylistMutation = (
  mutationOptions: UseMutationOptions<
    {id: string},
    unknown,
    ICreatePlaylistPayload
  > = {},
) => {
  return useMutation<{id: string}, unknown, ICreatePlaylistPayload>(
    ({playlist, signer}: ICreatePlaylistPayload) =>
      createPlaylist(playlist, signer),
    {
      ...mutationOptions,
      ...queryConfig(),
    },
  );
};

interface IUpdatePlaylistPayload {
  id: string;
  playlist: Partial<IPlaylist>;
  signer: Signer;
}

export const useUpdatePlaylistMutation = (
  mutationOptions: UseMutationOptions<
    {id: string},
    unknown,
    IUpdatePlaylistPayload
  > = {},
) => {
  return useMutation<{id: string}, unknown, IUpdatePlaylistPayload>(
    ({id, playlist, signer}: IUpdatePlaylistPayload) =>
      updatePlaylist(id, playlist, signer),
    {
      ...mutationOptions,
      ...queryConfig(),
    },
  );
};
