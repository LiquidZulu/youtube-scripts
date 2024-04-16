import { ITransform } from "./";
import { inject, injectable } from "inversify";
import { IStatisticDuration } from "./IStatGrabber/IStatisticDuration";
import { IVideo, IStatistic, EVideoType, EReuse, EGenre } from "../../types";

@injectable()
export class RuntimeByStatistics extends ITransform {
  constructor(@inject(IStatisticDuration) durationSummer: IStatisticDuration) {
    super();
    this.durationSummer = durationSummer;
  }

  proc<T = number>(DATA: Array<IVideo>): { [key: string]: IStatistic<T> } {
    return {
      //
      // videoType
      //
      "EVideoType.video": this.durationSummer.grab(DATA, [
        "EVideoType",
        EVideoType.video,
      ]),
      "EVideoType.stream": this.durationSummer.grab(DATA, [
        "EVideoType",
        EVideoType.stream,
      ]),
      "EVideoType.short": this.durationSummer.grab(DATA, [
        "EVideoType",
        EVideoType.short,
      ]),
      //
      // reuse
      //
      "EReuse.heavy": this.durationSummer.grab(DATA, ["EReuse", EReuse.heavy]),
      "EReuse.light": this.durationSummer.grab(DATA, ["EReuse", EReuse.light]),
      "EReuse.none": this.durationSummer.grab(DATA, ["EReuse", EReuse.none]),
      //
      // genre
      //
      "EGenre.debate": this.durationSummer.grab(DATA, [
        "EGenre",
        EGenre.debate,
      ]),
      "EGenre.meme": this.durationSummer.grab(DATA, ["EGenre", EGenre.meme]),
      "EGenre.thesis": this.durationSummer.grab(DATA, [
        "EGenre",
        EGenre.thesis,
      ]),
      "EGenre.misc": this.durationSummer.grab(DATA, ["EGenre", EGenre.misc]),
    } as any as { [key: string]: IStatistic<T> };
  }

  private durationSummer: IStatisticDuration;
}
