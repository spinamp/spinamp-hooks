# spinamp-hooks

Set of react hooks for fetching data from spinamp pipeline built on top of react-query and spinamp-sdk. It gives quick and easy access to data from spinamp db and handles all loading & refetching stuff with the power of react-query., 

### Installation

```
yarn add @spinamp/spinamp-hooks
```

or

```
npm i -s @spinamp/spinamp-hooks
```

## Basic usage

The only thing required to make the lib work is to wrap whole app with the `SpinampProvider` component. Once it's done, all hooks can be used in all children components!

```
import {SpinampProvider, useAllTracksQuery} from "@spinamp/spinamp-hooks";

function App() {
  return (
    // Wrap whole app with the SpinampProvider
    <SpinampProvider>
      <TracksList />
    </SpinampProvider>
  )
}

function TracksList() {
  const {tracks, isLoading, isError} = useAllTracksQuery();

  if (isLoading) {
    return <p>Loading!</p>;
  }
  
  if (isError) {
    return <p>Ups! Something went wrong</p>;
  }
  
  return (
    <div>
      <p>All tracks list!</p>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>{track.title}</li>
        ))}
      </ul>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```

## Hooks

Hooks give easy and quick way to access particular data types from spinamp database. Every hook is built on top of `useQuery` or `useInfiniteQuery` hooks from 'react-query' (https://tanstack.com/query/v4/docs/reference/useQuery). It returns all properties returned from wrapped hooks, extended with some direct accessible data like `tracks`, `artist`, etc. Moreover, every hook takes optional `UseQueryOptions` object as the last argument, which can be used to set some specific `react-query` options.

Below is a list of all hooks APIs, grouped by referencing data types.  
Documentation off query parameters and all returned data interfaces can be found on `@spinamp/spinamp-sdk` repo:  
https://github.com/spinamp/spinamp-sdk/blob/main/README.md

### Tracks

#### useAllTracksQuery(params?: [IApiListQueryParams](https://github.com/spinamp/spinamp-sdk/blob/main/README.md#iapilistqueryparams), queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {tracks: ITrack[], ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying list of all tracks. If no `params` are provided, it will return list of <b>all</b> tracks existing in the database, which will result in huge request. For pagination/infinite scroll queries, `usePaginatedTracksQuery` is recommended.

#### usePaginatedTracksQuery(pageSize? = 20, params?: Pick<[IApiListQueryParams](https://github.com/spinamp/spinamp-sdk/blob/main/README.md#iapilistqueryparams), 'filter' | 'orderBy'>, queryOptions?: [UseInfiniteQueryOptions](https://tanstack.com/query/v4/docs/reference/useInfiniteQuery)): {tracks: ITrack[], totalCount: number | null, ...[UseInfiniteQueryResult](https://tanstack.com/query/v4/docs/reference/useInfiniteQuery )},

Used for querying list of all tracks in chunks, e.g. for infinity list. Returns flat `tracks` array with all fetched items, `totalCount` and all `UseInfiniteQueryResul` properties including `fetchNextPage` and `hasNextPage` properties for pagination.

#### useTrackQuery(idOrSlug: string, queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {track: ITrack | null, ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying details of specific track based on provided `id` or `slug`.


### Artists

#### useAllArtistsQuery(params?: [IApiListQueryParams](https://github.com/spinamp/spinamp-sdk/blob/main/README.md#iapilistqueryparams), queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {artists: IArtist[], ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying list of all artists. If no `params` are provided, it will return list of <b>all</b> artists existing in the database, which will result in huge request. For pagination/infinite scroll queries, `usePaginatedArtistsQuery` is recommended.

#### usePaginatedArtistsQuery(pageSize? = 20, params?: Pick<[IApiListQueryParams](https://github.com/spinamp/spinamp-sdk/blob/main/README.md#iapilistqueryparams), 'filter' | 'orderBy'>, queryOptions?: [UseInfiniteQueryOptions](https://tanstack.com/query/v4/docs/reference/useInfiniteQuery)): {artists: IArtist[], totalCount: number | null, ...[UseInfiniteQueryResult](https://tanstack.com/query/v4/docs/reference/useInfiniteQuery )},

Used for querying list of all artists in chunks, e.g. for infinity list. Returns flat `artists` array with all fetched items, `totalCount` and all `UseInfiniteQueryResul` properties including `fetchNextPage` and `hasNextPage` properties for pagination.

#### useArtistQuery(idOrSlug: string, queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {artist: IArtist | null, tracks: ITrack[] ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying details of specific artist based on provided `id` or `slug`. It also returns list of all tracks created by this artist.


### Platforms

#### usePlatformsQuery(queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {platforms: IMusicPlatformData[], ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying list of nft music platforms supported by spinamp.

#### usePlatformQuery(platformId: string, queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {platform: IMusicPlatformData | null, ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying nft music platform details based on provided id.


### Collection

#### useCollectionQuery(ethAddress: string, queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {collection: ICollectionTrack[], ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying tracks collection owned by user with provided ethereum address.


### Playlist

#### useFeaturedPlaylistsQuery(queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {playlists: IPlaylist[], ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying list of playlists, which are currently marked as featured on spinamp.

#### usePlaylistDetailsQuery(playlistId: string, queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {playlist: IPlaylist | null, playlistTracks: ITrack[], ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying playlist details based on provided playlist id. It returns `playlist` object and `playlistTracks` array containing list of full tracks objects belonging to provided playlist.

#### useCollectorPlaylistsQuery(ethAddress: string, queryOptions?: [UseQueryOptions](https://tanstack.com/query/v4/docs/reference/useQuery)): {playlists: IPlaylist[], ...[UseQueryResult](https://tanstack.com/query/v4/docs/reference/useQuery )},

Used for querying list of playlists, created by user with provided ethereum address

## Advanced usage

Main goal of this SDK is to provide simple, zero-config hooks API to make interaction with spinamp database quick and easy. However, there are several possibilities to take more control and configure it with the same freedom, as by using react-query directly.

- Every `use[Whatever]Query` hook exposed from this library takes react-query `UseQueryOptions / UseInfiniteQueryOptions` object as the last argument. It also returns all properties returned from react-query extended with some directly accessible entities like `tracks`, `artist`, etc (https://tanstack.com/query/v4/docs/reference/useQuery). 
- There is `setSpinampClientOptions` function exposed, which allows to set some defaults on `QueryClient` instance (https://tanstack.com/query/v4/docs/reference/QueryClient#queryclientsetdefaultoptions). 
- If it's not enough, you can import `spinampQueryClient` directly and do whatever is possible with react-query API. For example, you can make your cache persistent by using `spinampQueryClient` with `persistQueryClient` function (https://tanstack.com/query/v4/docs/plugins/persistQueryClient).
- If you are using react-query in your app already, and you would like to keep `spinamp-hooks` data under the same `QueryClient` as the rest of the app, there is an option to do that in three steps:
  * Remove `SpinampProvider` component wrapper, so there is only one `QueryClientProvider`. 
  * Set `contextSharing` prop on your `QueryClientProvider` to `true`.
  * Call `enableCustomSpinampProvider()` from `spinamp-hooks` at the root of your app. It's needed to disable using internal context in `spinamp-hooks` and switch it to the default one.
