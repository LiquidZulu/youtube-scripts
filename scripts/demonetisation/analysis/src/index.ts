import { Container, inject, injectable } from "inversify";
import "reflect-metadata";
import { Videos } from "./data";
import { IVideo } from "./types";
import { ITransform } from "./services/ITransform";
import { RuntimeByStatistics } from "./services/ITransform/RuntimeByStatistics";
import { IStatisticDuration } from "./services/ITransform/IStatGrabber/IStatisticDuration";
import { DurationSummer } from "./services/ITransform/IStatGrabber/IStatisticDuration/DurationSummer";
import { IDurationGetter } from "./services/ITransform/IStatGrabber/IStatisticDuration/IDurationGetter";
import { durToS } from "./services/ITransform/IStatGrabber/IStatisticDuration/IDurationGetter/durToS";
import { IOutput } from "./services/IOutput";
import { DurationBars } from "./services/IOutput/DurationBars";

const C = new Container();

@injectable()
class Application {
  constructor(
    @inject(ITransform) transformer: ITransform
    //@inject(IOutput) outputter: IOutput
  ) {
    this.transformer = transformer;
    //this.outputter = outputter;
    this.DATA = Videos;
  }

  public run() {
    // Transform
    const procData = this.transformer.proc(this.DATA);

    // Output
    /*
     * NOTE: there is some funnybuisness happening wrt NixOS
     * which means that this.outputter does not work.
     *
     * The error is (I believe) that libuuid needs to be
     * available in LD_LIBRARY_PATH. Valen suggested using
     * a devshell, but I do not know how those work. So for
     * now I will just manually create the graphs with the
     * information provided by the console.table below.
     *
     * Relevant information is as follows:
     * + https://github.com/Automattic/node-canvas/issues/1947
     * + https://github.com/Automattic/node-canvas/issues/1893
     * + https://discourse.nixos.org/t/node2nix-issues/10762/2
     *
     * I cannot make any heads or tails of it though.
     * -- <2023-02-28>
     * */

    console.table(procData);
    /*
    this.outputter.load(
      {
        video: procData["EVideoType.video"].data as number,
        livestream: procData["EVideoType.stream"].data as number,
        shorts: procData["EVideoType.short"].data as number,
      },
      `${process.cwd()}/out/videoType.png`
    );

    this.outputter.load(
      {
        heavy: procData["EReuse.heavy"].data as number,
        light: procData["EReuse.light"].data as number,
        none: procData["EReuse.none"].data as number,
      },
      `${process.cwd()}/out/reuse.png`
    );

    this.outputter.load(
      {
        debate: procData["EGenre.debate"].data as number,
        meme: procData["EGenre.meme"].data as number,
        thesis: procData["EGenre.thesis"].data as number,
        misc: procData["EGenre.misc"].data as number,
      },
      `${process.cwd()}/out/genre.png`
    );*/
  }

  private DATA: Array<IVideo>;
  private transformer: ITransform;
  //private outputter: IOutput;
}

// Transform
C.bind(ITransform).to(RuntimeByStatistics);
C.bind(IStatisticDuration).to(DurationSummer);
C.bind(IDurationGetter).to(durToS);

// Output
//C.bind(IOutput).to(DurationBars);

// Application
C.bind(Application).toSelf();

const app = C.get(Application);
app.run();
