type tdigit = 0 | 1 | 2 | 3 | 4 | 5;
type digit = tdigit | 6 | 7 | 8 | 9;

export type TDuration =
  | `${digit}:${tdigit}${digit}`
  | `${tdigit}${digit}:${tdigit}${digit}`
  | `${number}:${tdigit}${digit}:${tdigit}${digit}`;

export enum EVideoType {
  video,
  short,
  stream,
}

export enum EReuse {
  none,
  light,
  heavy,
}

export enum EGenre {
  debate,
  meme,
  thesis,
  misc,
}

export type TEnumStats = "EVideoType" | "EReuse" | "EGenre";

export interface IVideo {
  id: string;
  duration: TDuration;
  videoType: EVideoType;
  reuse: EReuse;
  genre: EGenre;
}

export interface IStatistic<T> {
  data: T;
}
