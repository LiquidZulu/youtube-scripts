import { IVideo, IStatistic } from "../../types";
import { injectable } from "inversify";

@injectable()
export abstract class ITransform {
  abstract proc<T>(DATA: Array<IVideo>): {
    // eg. { "total shorts duration": {data: 3}, "longest video": {data: ["some ID", 300]} }
    [key: string]: IStatistic<T>;
  };
}
