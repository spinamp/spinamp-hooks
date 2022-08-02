import {
  fetchAllTracks,
  fetchTrackById,
  fetchTrackBySlug,
} from '@spinamp/spinamp-sdk';
import {useQuery} from '@tanstack/react-query';

import {queryOptions} from '../queryClient';

import {QueryKeys} from './QueryKeys';

export const useAllTracksQuery = () => {
  const result = useQuery(QueryKeys.tracks(), () => fetchAllTracks(), {
    ...queryOptions,
  });

  return {
    tracks: result.data?.items || [],
    ...result,
  };
};

export const useTrackByIdQuery = (trackId: string) => {
  const result = useQuery(
    QueryKeys.track(trackId),
    () => fetchTrackById(trackId),
    {...queryOptions},
  );

  return {
    track: result.data,
    ...result,
  };
};

export const useTrackBySlugQuery = (slug: string) => {
  const result = useQuery(QueryKeys.track(slug), () => fetchTrackBySlug(slug), {
    ...queryOptions,
  });

  return {
    track: result.data,
    ...result,
  };
};
