export type TrackHistoryResponse = Record<string, UITrack>;

export interface UITrack {
  network_id: number;
  channel_id: number;
  artist: string;
  display_artist: string;
  title: string;
  display_title: string;
  track: string;
  length: number;
  duration: number;
  started: number;
  type: string;
  track_id: number;
  release: string;
  art_url: string;
  images: {
    default: string;
  };
}

export type Root = Root2[];

export interface Root2 {
  id?: number;
  ad_channels?: string;
  channel_director?: string;
  description_long?: string;
  description_short?: string;
  key?: string;
  name: string;
  track?: string;
  length: number;
  duration: number;
  started: number;
  public?: boolean;
  ad_dfp_unit_id?: string;
  network_id?: number;
  premium_id?: number;
  tracklist_server_id?: number;
  artists?: Artist[];
  asset_id?: number;
  asset_url?: string;
  banner_url?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  art_url?: string;
  similar_channels?: SimilarChannel[];
  images?: Images2;
}

export interface Artist {
  id: number;
  name: string;
  asset_url?: string;
  images: Images;
}

export interface Images {
  default?: string;
}

export interface SimilarChannel {
  id: number;
  similar_channel_id: number;
}

export interface Images2 {
  default?: string;
  square?: string;
  compact?: string;
  tall_banner?: string;
  horizontal_banner?: string;
  vertical?: string;
}
