import { IStatGrabber } from "../";
import {
  IVideo,
  IStatistic,
  TEnumStats,
  EVideoType,
  EReuse,
  EGenre,
} from "../../../../types";
import { injectable } from "inversify";

@injectable()
export abstract class IStatisticDuration extends IStatGrabber<number> {
  abstract grab(
    DATA: Array<IVideo>,
    // eg. [ "EVideoType", EVideoType.short ]
    enumStat: [TEnumStats, EVideoType | EReuse | EGenre]
  ): IStatistic<number>;
}
