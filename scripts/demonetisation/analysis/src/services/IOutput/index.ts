import { injectable } from "inversify";

@injectable()
export abstract class IOutput {
  abstract load(d: { [key: string]: number }, outFile: string): void;
}
