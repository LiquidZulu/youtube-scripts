import { makeProject, FullSceneDescription } from "@motion-canvas/core";
import { ValueDispatcher } from "@motion-canvas/core/lib/events";
import { quoteScenes } from "./scenes/quotes";
import makeFootnote from "mcas/lib/scenes/footnote";

import hierarchyOfPhilosophy from "./scenes/hierarchy-of-philosophy?scene";
import example from "./scenes/example?scene";
import reasonsPeopleArentAnarchists from "./scenes/reasons-people-arent-anarchists?scene";
import substitutingResultForDefinition from "./scenes/substituting-result-for-definition?scene";
import definitionAnarchism from "./scenes/definition-anarchism?scene";
import legalAnarchismNeNoLaws from "./scenes/legal-anarchism-ne-no-laws?scene";
import ancapSubsetAnarchism from "./scenes/ancap-subset-anarchism?scene";
import stickScarce from "./scenes/stick-scarce?scene";

const footnotesScenes = new Array(999)
  .fill(0)
  .map((_, i) => i + 1)
  .filter((x) => x > 91)
  .map((footnoteNumber) => ({
    footnoteNumber,
    scene: makeFootnote(footnoteNumber),
  }))
  .map(({ scene, footnoteNumber }) => {
    const description = scene as FullSceneDescription;
    description.name = `footnotes/footnote-${footnoteNumber}`;
    description.onReplaced = new ValueDispatcher<FullSceneDescription>(
      description.config as any,
    );
    return description;
  });

export default makeProject({
  scenes: [
    stickScarce,
    //ancapSubsetAnarchism,
    //legalAnarchismNeNoLaws,
    //definitionAnarchism,
    //substitutingResultForDefinition,
    //reasonsPeopleArentAnarchists,
    //hierarchyOfPhilosophy,
    //example,
    //...quoteScenes,
    //...footnotesScenes,
  ],
});
