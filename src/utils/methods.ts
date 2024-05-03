import { client } from "./client";
import { ANILIST_BASEURL, ANIME_QUERY, HIANIME_BASEURL } from "./constant";
import { load } from "cheerio";
import match from "string-similarity-js";
import { Megacloud } from "../extractors/megacloud";

// fetchAnilistInfo and call hianmie endpoints and return info with eps from hianime
export const fetchAnilistInfo = async (id: number) => {
  try {
    let infoWithEp;

    const resp = await client.post<any, { data: { data: AnilistAnime } }>(
      ANILIST_BASEURL,
      {
        query: ANIME_QUERY,
        variables: {
          id,
        },
      }
    );
    const data = resp.data.data.Media;

    const eps = await searchNScrapeEPs(data.title);
    infoWithEp = {
      ...data,
      recommendations: data.recommendations.edges.map(
        (el) => el.node.mediaRecommendation
      ),
      relations: data.relations.edges.map((el) => ({ id: el.id, ...el.node })),
      characters: data.characters.edges.map((el) => ({
        role: el.role,
        ...el.node,
        voiceActors: el.voiceActors,
      })),
      episodesList: eps,
    };

    return infoWithEp;
  } catch (err: any) {
    console.error(err);
    return null;
  }
};

// search with title in hianime and call ep scraping func
export const searchNScrapeEPs = async (searchTitle: Title) => {
  try {
    const resp = await client.get(
      `${HIANIME_BASEURL}/search?keyword=${searchTitle.english}`
    );
    if (!resp) return console.log("No response from hianime !");
    const $ = load(resp.data);
    let similarTitles: { id: string; title: string; similarity: number }[] = [];
    $(".film_list-wrap > .flw-item .film-detail .film-name a")
      .map((i, el) => {
        const title = $(el).text();
        const id = $(el).attr("href")!.split("/").pop()?.split("?")[0] ?? "";
        const similarity = Number(
          (
            match(
              title.replace(/[\,\:]/g, ""),
              searchTitle.english || searchTitle.native
            ) * 10
          ).toFixed(2)
        );
        similarTitles.push({ id, title, similarity });
      })
      .get();

    similarTitles.sort((a, b) => b.similarity - a.similarity);

    if (
      (searchTitle.english.match(/\Season(.+?)\d/) &&
      similarTitles[0].title.match(/\Season(.+?)\d/)) || (!searchTitle.english.match(/\Season(.+?)\d/) && !similarTitles[0].title.match(/\Season(.+?)\d/))
    )
      return getEpisodes(similarTitles[0].id);
    else return getEpisodes(similarTitles[1].id);
  } catch (err) {
    console.error(err);
    return null;
  }
};

// calls ep watch endpoint in hianmie and scrapes all eps and returns them in arr
export const getEpisodes = async (animeId: string) => {
  try {
    const resp = await client.get(
      `${HIANIME_BASEURL}/ajax/v2/episode/list/${animeId.split("-").pop()}`,
      {
        headers: {
          referer: `${HIANIME_BASEURL}/watch/${animeId}`,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    const $ = load(resp.data.html);
    let episodesList: {
      id: string;
      episodeId: number;
      title: string;
      number: number;
    }[] = [];
    $("#detail-ss-list div.ss-list a").each((i, el) => {
      episodesList.push({
        id: $(el).attr("href")?.split("/").pop() ?? "",
        episodeId: Number($(el).attr("href")?.split("?ep=").pop()),
        title: $(el).attr("title") ?? "",
        number: i + 1,
      });
    });

    return episodesList;
  } catch (err) {
    console.error(err);
    return { episodesList: null };
  }
};

// call server to get ep servers
export const getServers = async (epId: string) => {
  try {
    const resp = await client(
      `${HIANIME_BASEURL}/ajax/v2/episode/servers?episodeId=${epId}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          referer: `${HIANIME_BASEURL}/watch/${epId}`,
        },
      }
    );

    const $ = load(resp.data.html);

    let servers: {
      sub: { serverId: string | null; serverName: string }[];
      dub: { serverId: string | null; serverName: string }[];
    } = {
      sub: [],
      dub: [],
    };

    $(".ps_-block.ps_-block-sub .ps__-list .server-item").each((i, el) => {
      const $parent = $(el).closest(".servers-sub, .servers-dub");
      const serverType = $parent.hasClass("servers-sub") ? "sub" : "dub";
      servers[serverType].push({
        serverId: $(el).attr("data-id") ?? null,
        serverName: $(el).text().replaceAll("\n", "").trim(),
      });
    });

    return servers;
  } catch (err) {
    console.error(err);
    return { servers: null };
  }
};

// get sources of ep
export const getSources = async (serverId: string, epId: string) => {
  try {
    const res = await client(
      `${HIANIME_BASEURL}/ajax/v2/episode/sources?id=${serverId}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          referer: `${HIANIME_BASEURL}/watch/${epId}`,
        },
      }
    );

    const link = res.data.link;
    if (!link) return { sources: null };

    let sources!: Sourcedata | { sources: null };
    if (String(link).includes("megacloud"))
      sources = await new Megacloud(res.data.link).scrapeMegaCloud();
    else if (String(link).includes("watchsb")) sources = { sources: null };
    else if (String(link).includes("streamtape")) sources = { sources: null };
    else {
      sources = { sources: null };
      console.log("Unknown link !");
    }
    return sources;
  } catch (err) {
    console.error(err);
    return { sources: null };
  }
};
