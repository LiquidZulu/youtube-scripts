import { TDuration } from "../../../../../types";
import { injectable } from "inversify";

@injectable()
export abstract class IDurationGetter {
  abstract getDuration(d: TDuration): number;
}
