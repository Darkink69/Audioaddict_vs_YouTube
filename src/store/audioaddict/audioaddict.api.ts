import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { UITrack } from "../../models/models";
import { TrackHistoryResponse, Root2 } from "../../models/models.ts";

// const siteName = localStorage.getItem("site");
// const channel_id = "69";

export const audioaddictApi = createApi({
  reducerPath: "audioaddict/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.audioaddict.com/v1/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    trackHistory: build.query<TrackHistoryResponse, string>({
      query: (site) => ({
        url: `${site}/track_history.json`,
        // params: {
        //     q: tracks,
        //     per_page: 10
        // }
      }),
      //transformResponse: (response: TrackHistoryResponse) => Object.values(response)
    }),
    getNameStation: build.query<Root2[], string>({
      query: (siteName) => ({
        url: `${siteName}/channels.json`,
      }),
    }),
    getChannelHistory: build.query<
      Root2[],
      { site: string; channel_id: string }
    >({
      query: ({ channel_id, site }) => ({
        url: `${site}/track_history/channel/${channel_id}.json`,
      }),
    }),
  }),
});

export const {
  useTrackHistoryQuery,
  useLazyTrackHistoryQuery,
  useGetNameStationQuery,
  useGetChannelHistoryQuery,
} = audioaddictApi;
