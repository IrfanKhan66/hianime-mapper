interface Title {
  english: string;
  romaji: string;
  native: string;
  userPreferred: string;
};

interface AnilistAnime {
  Media: {
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
      edges: {
        node: {
          mediaRecommendation: {
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
          };
        };
      }[];
    };
    relations: {
      edges: {
        id: number;
        node: {
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
        };
      }[];
    };
    characters: {
      edges: {
        role: string;
        node: {
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
    };
  };
};

interface Sourcedata {
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
};
