# Hianime-mapper

This API is used to fetch episodes and streaming url from https://hianime.to by using anilist Ids. It is built on [Node.js](https://nodejs.org) using the web framework [Hono.js](https://hono.dev) to serve the API.

## Run Locally

Clone the project

```bash
  git clone https://github.com/IrfanKhan66/hianime-mapper.git
```

Go to the project directory

```bash
  cd hianime-mapper
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run dev
```

## Documentation

**Get routes info & status of API**

_request url_

```url
https://hianime-mapper.vercel.app/

```

_response_

```json
{
  "about": "This API maps anilist anime to https://hianime.to and also returns the M3U8 links !",
  "status": 200,
  "routes": [
    "/anime/info/:anilistId",
    "/anime/servers/:episodeId",
    "/anime/sources?serverId={server_id}&episodeId={episode_id}"
  ]
}
```

**Get info of anime from anilist with hianime episode mappings**

_request url_

```url
https://hianime-mapper.vercel.app/anime/info/:anilistId

example : https://hianime-mapper.vercel.app/anime/info/20
```

_response_

```javascript

{
  data: {
    id: number;
    idMal: number;
    title: {
      romaji: string;
      english: string;
      native: string;
      userPreferred: string;
    };
    coverImage: {
      extraLarge: string;
      large: string;
      medium: string;
      color: string;
    };
    format: string;
    description: string;
    genres: string[];
    season: string;
    episodes: number;
    nextAiringEpisode: {
      id: number;
      timeUntilAiring: number;
      airingAt: number;
      episode: number;
    };
    status: string;
    duration: number;
    seasonYear: number;
    bannerImage: string;
    favourites: number;
    popularity: number;
    averageScore: number;
    trailer: {
      id: number;
      site: string;
      thumbnail: string;
    };
    startDate: {
      year: number;
      month: number;
      day: number;
    };
    countryOfOrigin: string;
    recommendations: {
      title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
      };
      format: string;
      coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string;
      };
    }[];
    relations: {
      id: number;
      title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
      };
      coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string;
      };
    }[];
    characters: {
      role: string;
      name: {
        first: string;
        middle: string;
        last: string;
        full: string;
        native: string;
        userPreferred: string;
      };
      image: {
        large: string;
        medium: string;
      };
      voiceActors: {
        name: {
          first: string;
          middle: string;
          last: string;
          full: string;
          native: string;
          userPreferred: string;
        };
        image: {
          large: string;
          medium: string;
        };
      }[];
    }[];
    episodesList: {
      id: string;
      episodeId: number;
      title: string;
      number: number;
    }[];
  };
}


```

**Get servers**

_request url_

```url
https://hianime-mapper.vercel.app/anime/servers/:episodeId

example : https://hianime-mapper.vercel.app/anime/servers/12352
```

_response_

```javascript
{
    data: {
        sub: {
            serverId: string;
            serverName: string;
        }[],
        dub: {
            serverId: string;
            serverName: string;
        }[]
    }
}
```

**Get sources**

_request url_

```url
https://hianime-mapper.vercel.app/anime/sources?serverId={server_id}&episodeId={episode_id}

example : https://hianime-mapper.vercel.app/anime/sources?serverId=662001&episodeId=12352

```

_response_

```javascript
 {
     data:{
    intro: {
      start: number;
      end: number;
    };
    outro: {
      start: number;
      end: number;
    };
    sources: {
      url: string;
      type: string;
      isM3U8: boolean;
    }[];
    tracks: {
      file: string;
      kind: string;
      label?: string;
      default?: boolean;
    }[];
    server: number;
  }
 }
```

## Acknowledgements

- [Consumet](https://github.com/consumet/consumet.ts)
