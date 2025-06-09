import {
  FullSceneDescription,
  makeProject,
  ValueDispatcher,
} from "@motion-canvas/core";
import audio from "./audio.wav";

import example from "./scenes/example?scene";
import brickWall from "./scenes/brick-wall?scene";
import requirementsOfMansSurvival from "./scenes/requirements-of-mans-survival?scene";
import leaveWellEnoughAlone from "./scenes/leave-well-enough-alone?scene";
import lifeMagazine from "./scenes/life-magazine?scene";
import nineteenEightyFour from "./scenes/1984?scene";
import gropingInTheDark from "./scenes/groping-in-the-dark?scene";
import howDareYou from "./scenes/how-dare-you?scene";
import frisco from "./scenes/frisco?scene";
import ceylon from "./scenes/ceylon?scene";
import humanistEnvironmentalism from "./scenes/humanist-environmentalism?scene";
import randQuote from "./scenes/rand-quote?scene";
import scientism from "./scenes/scientism?scene";
import scientismEthic from "./scenes/scientism-ethic?scene";
import sanction from "./scenes/sanction?scene";
import co2Chart from "./scenes/co2-chart?scene";
import end from "./scenes/end?scene";
import makeFootnote from "mcas/lib/scenes/footnote";

const foonotesScenes = new Array(33)
  .fill(0)
  .map((_, i) => i + 1)
  .map((footnoteNumber) => ({
    footnoteNumber,
    scene: makeFootnote(footnoteNumber),
  }))
  .map(({ scene, footnoteNumber }) => {
    const description = scene as FullSceneDescription;
    description.name = `footnote-${footnoteNumber}`;
    description.onReplaced = new ValueDispatcher<FullSceneDescription>(
      description.config as any,
    );
    return description;
  });

export default makeProject({
  scenes: [
    ...foonotesScenes,
    //end,
    // co2Chart,
    //// misc
    // brickWall,
    // requirementsOfMansSurvival
    // leaveWellEnoughAlone,
    // lifeMagazine,
    // nineteenEightyFour,
    // gropingInTheDark,
    // howDareYou,
    // frisco,
    // ceylon,
    // humanistEnvironmentalism,
    // randQuote,
    // scientism,
    // scientismEthic,
    // sanction,
    ////
  ],
  //audio,
});
