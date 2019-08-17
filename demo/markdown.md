# liri-node-app
## Overview
Liri is a precursor demo of a natural language personal assistant application similar to Siri. It reaches out to a few web resources to retrieve requested information.
## Current features
Liri currently supports three types of requests:
- Information on an artist's next concert from the artist name
- Information on a song from its title
- Information on a movie from its title

...as well as a bonus request that performs a mystery song search based on the contents of a text file in the directory.

## Installation
Liri requires Node and is run from its own directory on the command line.
The following will get you started:
```
$ git clone https://github.com/jcherven/liri-node-app.git
$ cd liri-node-app
$ npm install
```
### Other requirements
A Spotify API token is required to use the track title search functionality. You'll need to apply for API access with your Spotify account and make note of the secrets you receive.

In the root application directory, create a .env file like below, filling in your own API access secrets:
```
# Spotify API keys

SPOTIFY_ID=
SPOTIFY_SECRET=
```

## Usage
```
$ node liri <option> <argument>
```
### Options
Options currently available are:
- `concert-this`
- `spotify-this-song`
- `movie-this`
- `do-what-it-says` (no argument)
- `help`

### Arguments
Liri respects Unix conventions and prefers quoted arguments for predictable behavior:
```
$ node liri movie-this eraserhead
$ node liri concert-this "negative gemini"
$ node liri spotify-this-song "everybody (backstreet's back)"
```

## Demonstration
![liri](./screenshots/00.png)
![liri](./screenshots/01.png)
![liri](./screenshots/02.png)
![liri](./screenshots/03.png)
![liri](./screenshots/04.png)
![liri](./screenshots/05.png)
![liri](./screenshots/06.png)

Click the image below for an external link to a live asciinema demo:
[![asciicast](https://asciinema.org/a/OVFOoUO0znglYW3uBeblYX6mL.png)](https://asciinema.org/a/OVFOoUO0znglYW3uBeblYX6mL)

