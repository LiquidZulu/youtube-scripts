import { injectable } from "inversify";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import * as fs from "fs";
import { IOutput } from "./";

@injectable()
export class DurationBars extends IOutput {
  load(d: { [key: string]: number }, outFile: string) {
    const width = 720; //px
    const height = 480; //px
    const backgroundColour = "white"; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
    const chartJSNodeCanvas = new ChartJSNodeCanvas({
      width,
      height,
      backgroundColour,
    });

    const conf = {
      type: "bar",
      data: {
        datasets: [
          {
            data: Object.values(d),
          },
        ],
        labels: Object.keys(d),
      },
    };

    // conf as any because I cannot be bothered to pour through how they have defined their types
    const image = chartJSNodeCanvas.renderToBufferSync(conf as any);

    //fs.writeFileSync(outFile, image, "base64");
  }
}
