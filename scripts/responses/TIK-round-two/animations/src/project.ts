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
import tikDefAnarchism from "./scenes/tik-def-anarchism?scene";
import publicPrivatePackageDeals from "./scenes/public-private-package-deals?scene";
import bignessVsSmallness from "./scenes/bigness-vs-smallness?scene";
import tikPrivateFalseAlternative from "./scenes/tik-private-false-alternative?scene";
import collectiveReal from "./scenes/collective-real?scene";
import abstraction from "./scenes/abstraction?scene";
import materialism from "./scenes/materialism?scene";
import sensualistSenseImpressions from "./scenes/sensualist-sense-impressions?scene";
import primarySecondaryQualityDistinction from "./scenes/primary-secondary-quality-distinction?scene";
import stateMonopolyUseForce from "./scenes/state-monopoly-use-force?scene";
import wrongToDefineStateCoercive from "./scenes/wrong-to-define-state-coercive?scene";
import epilology from "./scenes/epilology?scene";
import falseVsTrueAlternatives from "./scenes/false-vs-true-alternatives?scene";
import determinismSelfDefeat from "./scenes/determinism-self-defeat?scene";
import anarchismIffCapitalism from "./scenes/anarchism-iff-capitalism?scene";
import collectiveMythArgument from "./scenes/collective-myth-argument?scene";
import rightsProtectingViolatorOfRights from "./scenes/rights-protecting-violator-of-rights?scene";
import warfareBetweenStates from "./scenes/warfare-between-states?scene";
import menNaturallyBrutish from "./scenes/men-naturally-brutish?scene";
import dealWithRisk from "./scenes/deal-with-risk?scene";
import objectivismGenusDifferentia from "./scenes/objectivism-genus-differentia?scene";
import objectivismPhilosophyPoe from "./scenes/objectivism-philosophy-poe?scene";
import murderology from "./scenes/murderology?scene";
import packagedBranchDefinitions from "./scenes/packaged-branch-definitions?scene";
import threeAnswersToLaw from "./scenes/three-answers-to-law?scene";
import merePossessor from "./scenes/mere-possessor?scene";
import ownershipNePossession from "./scenes/ownership-ne-possession?scene";
import rightsScepticism from "./scenes/rights-scepticism?scene";
import mixedLawSystems from "./scenes/mixed-law-systems?scene";

export default makeProject({
  scenes: [
    mixedLawSystems,
    //rightsScepticism,
    //ownershipNePossession,
    //merePossessor,
    //threeAnswersToLaw,
    //packagedBranchDefinitions,
    //murderology,
    //objectivismPhilosophyPoe,
    //objectivismGenusDifferentia,
    //dealWithRisk,
    //menNaturallyBrutish,
    //warfareBetweenStates,
    //rightsProtectingViolatorOfRights,
    //collectiveMythArgument,
    //anarchismIffCapitalism,
    //determinismSelfDefeat,
    //falseVsTrueAlternatives,
    //epilology,
    //wrongToDefineStateCoercive,
    //stateMonopolyUseForce,
    //primarySecondaryQualityDistinction,
    //sensualistSenseImpressions,
    //materialism,
    //abstraction,
    //collectiveReal,
    //tikPrivateFalseAlternative,
    //bignessVsSmallness,
    //publicPrivatePackageDeals,
    //tikDefAnarchism,
    //stickScarce,
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
