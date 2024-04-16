import {
  IStatistic,
  EVideoType,
  TEnumStats,
  EReuse,
  EGenre,
  IVideo,
} from "../../../../types";
import { inject, injectable } from "inversify";
import { IStatisticDuration } from "./";
import { IDurationGetter } from "./IDurationGetter";

@injectable()
export class DurationSummer extends IStatisticDuration {
  constructor(@inject(IDurationGetter) durationGetter: IDurationGetter) {
    super();
    this.durationGetter = durationGetter;
  }

  grab(
    DATA: Array<IVideo>,
    // eg. [ "EVideoType", EVideoType.short ]
    enumStat: [TEnumStats, EVideoType | EReuse | EGenre]
  ): IStatistic<number> {
    const identifier = {
      EVideoType: "videoType",
      EReuse: "reuse",
      EGenre: "genre",
    };

    return {
      data: DATA
        // array of relevant entries
        .filter((i) => i[identifier[enumStat[0]]] === enumStat[1])

        // sum the durations of said entries
        .reduce((a, v) => a + this.durationGetter.getDuration(v.duration), 0),
    };
  }
  private durationGetter: IDurationGetter;
}
