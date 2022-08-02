const prefix = 'spinamp__';

const getPrefixedKey = (key: string) => `${prefix}${key}`;

export const QueryKeys = {
  tracks: (params?: unknown) => [getPrefixedKey('Tracks'), params],
  paginatedTracks: (params?: unknown) => [
    getPrefixedKey('PaginatedTracks'),
    params,
  ],
  track: (idOrSlug: string) => [getPrefixedKey('Track'), idOrSlug],

  artists: (params?: unknown) => [getPrefixedKey('Artists'), params],
  paginatedArtists: (params?: unknown) => [
    getPrefixedKey('PaginatedArtists'),
    params,
  ],
  artist: (idOrSlug: string) => [getPrefixedKey('Artist'), idOrSlug],

  platforms: () => [getPrefixedKey('Platforms')],
  platform: (platformId: string) => [getPrefixedKey('Platform'), platformId],

  collection: (address: string) => [getPrefixedKey('Collection'), address],

  featuredPlaylists: () => [getPrefixedKey('FeaturedPlaylists')],
  playlistDetails: (playlistId: string) => [
    getPrefixedKey('PlaylistDetails'),
    playlistId,
  ],
  collectorPlaylists: (address: string) => [
    getPrefixedKey('CollectorPlaylists'),
    address,
  ],
};
