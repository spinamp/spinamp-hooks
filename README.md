# @spinamp/spinamp-hooks

Spinamp-Hooks is a set of react hooks for fetching data from Spindex, Spinamp's growing index of the growing web3 music ecosystem. It provides hooks for music nft activity, music content, metadata and playlists.

It is built on top of [react-query](https://tanstack.com/query/v4) and [spinamp-sdk](https://github.com/spinamp/spinamp-sdk). It gives quick and easy access to data and handles all loading & refetching with the power of react-query.


## Installation
The package can be installed using yarn or npm:
```
yarn add @spinamp/spinamp-hooks
```

or

```
npm i @spinamp/spinamp-hooks
```

## Usage
The only thing required to make the lib work is to wrap whole app with the SpinampProvider component. Once it's done, all hooks can be used in all children components:

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
  const {tracks, isLoading, isError, refetch} = useAllTracksQuery();

  if (isLoading) {
    return <p>Loading!</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Ups! Something went wrong</p>
        <button onPress={() => refetch()}>Try again</button>
      </div>
    );
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
  );
}

render(<App />, document.getElementById('root'));
```

For further usage examples and comprehensive API Reference, see the [documentation](https://spinamp.gitbook.io/spinamp-hooks/).
