export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0";

export const REQ_HEADERS = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent": USER_AGENT,
};

export const ANILIST_BASEURL = "https://graphql.anilist.co";

export const HIANIME_BASEURL = "https://hianime.to";


export const ANIME_QUERY = `query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    idMal
    title {
      romaji
      english
      native
      userPreferred
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    format
    description
    genres
    season
    episodes
    nextAiringEpisode {
      id
      timeUntilAiring
      airingAt
      episode
    }
    status
    duration
    seasonYear
    bannerImage
    favourites
    popularity
    averageScore
    trailer {
      id
      site
      thumbnail
    }
    startDate {
      year
      month
      day
    }
    countryOfOrigin
    recommendations(sort: RATING_DESC) {
      edges {
        node {
          mediaRecommendation {
            title {
              romaji
              english
              native
              userPreferred
            }
            format
            coverImage {
              extraLarge
              large
              medium
              color
            }
          }
        }
      }
    }
    relations {
      edges {
        id
        node {
          title {
            romaji
            english
            native
            userPreferred
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
        }
      }
    }
    characters(sort: FAVOURITES_DESC) {
      edges {
        role
        node {
          name {
            first
            middle
            last
            full
            native
            userPreferred
          }
          image {
            large
            medium
          }
        }
        voiceActors(sort: FAVOURITES_DESC) {
          name {
            first
            middle
            last
            full
            native
            userPreferred
          }
          image {
            large
            medium
          }
        }
      }
    }
  }
}
`
