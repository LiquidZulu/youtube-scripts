import {
  IVideo,
  IStatistic,
  TEnumStats,
  EVideoType,
  EReuse,
  EGenre,
} from "../../../types";
import { injectable } from "inversify";

@injectable()
export abstract class IStatGrabber<T> {
  abstract grab(
    videos: Array<IVideo>,
    // eg. [ "EVideoType", EVideoType.short ]
    enumStat: [TEnumStats, EVideoType | EReuse | EGenre]
  ): IStatistic<T>;
}
