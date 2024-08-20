export interface GifType {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user: User;
  analytics_response_payload: string;
  analytics: Analytics;
  alt_text: string;
}
export interface Images {
  original: Original;
  fixed_height: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_height_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_height_small: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_width: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_width_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_width_small: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
}
export interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
}
export interface FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}
export interface FixedHeightDownsampledOrFixedWidthDownsampled {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
}
export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}
export interface Analytics {
  onload: OnloadOrOnclickOrOnsent;
  onclick: OnloadOrOnclickOrOnsent;
  onsent: OnloadOrOnclickOrOnsent;
}
export interface OnloadOrOnclickOrOnsent {
  url: string;
}
export interface GIFImageType {
  id: string;
  title: string;
  images: Images;
  alt: string;
  import_time: Date;
}