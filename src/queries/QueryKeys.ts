export const QueryKeys = {
  tracks: (params?: unknown) => ['Tracks', params],
  paginatedTracks: (params?: unknown) => ['PaginatedTracks', params],
  track: (idOrSlug: string) => ['Track', idOrSlug],

  artists: (params?: unknown) => ['Artists', params],
  paginatedArtists: (params?: unknown) => ['PaginatedArtists', params],
  artist: (idOrSlug: string) => ['Artist', idOrSlug],

  platforms: () => ['Platforms'],
  platform: (platformId: string) => ['Platform', platformId],

  collection: (address: string) => ['Collection', address],

  featuredPlaylists: () => ['FeaturedPlaylists'],
  playlistDetails: (playlistId: string) => ['PlaylistDetails', playlistId],
  collectorPlaylists: (address: string) => ['CollectorPlaylists', address],
};
