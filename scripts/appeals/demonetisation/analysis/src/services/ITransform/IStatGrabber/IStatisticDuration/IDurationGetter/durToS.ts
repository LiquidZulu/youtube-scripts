import { IDurationGetter } from "./";
import { injectable } from "inversify";
import { TDuration } from "../../../../../types";

@injectable()
export class durToS implements IDurationGetter {
  getDuration(d: TDuration): number {
    const splitD = d.split(":");
    switch (splitD.length) {
      // mins:secs
      case 2: {
        return Number(splitD[0]) * 60 + Number(splitD[1]);
      }

      // hours:mins:secs
      case 3: {
        return (
          Number(splitD[0]) * 60 * 60 +
          Number(splitD[1]) * 60 +
          Number(splitD[2])
        );
      }
    }
  }
}
