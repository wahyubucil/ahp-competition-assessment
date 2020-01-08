const AHP = require("ahp");
const _ = require("lodash");
const weightClassification = require("./weightClassification");

// Uncomment line below to test with the dummy data
// const dummy = require("./dummy");

exports.getData = (req, res) => {
  const ahpContext = new AHP();

  const teams = req.body.teams;
  const teamNames = teams.map(team => team.name);
  ahpContext.addItems(teamNames);

  const IDEA_VALIDATION = "ideaValidation";
  const PITCH_DECK = "pitchDeck";
  const PROTOTYPE = "prototype";
  ahpContext.addCriteria([IDEA_VALIDATION, PITCH_DECK, PROTOTYPE]);

  const ideaValidations = [];
  const handleIdeaValidations = (itemX, itemY) => {
    const weight = weightClassification(
      itemX.ideaValidation,
      itemY.ideaValidation
    );
    ideaValidations.push([itemX.name, itemY.name, weight]);
  };

  const pitchDecks = [];
  const handlePitchDecks = (itemX, itemY) => {
    const weight = weightClassification(itemX.pitchDeck, itemY.pitchDeck);
    pitchDecks.push([itemX.name, itemY.name, weight]);
  };

  const prototypes = [];
  const handlePrototypes = (itemX, itemY) => {
    const weight = weightClassification(itemX.prototype, itemY.prototype);
    prototypes.push([itemX.name, itemY.name, weight]);
  };

  for (let i = 0; i < teams.length - 1; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      handleIdeaValidations(teams[i], teams[j]);
      handlePitchDecks(teams[i], teams[j]);
      handlePrototypes(teams[i], teams[j]);
    }
  }

  ahpContext.rankCriteriaItem(IDEA_VALIDATION, ideaValidations);
  ahpContext.rankCriteriaItem(PITCH_DECK, pitchDecks);
  ahpContext.rankCriteriaItem(PROTOTYPE, prototypes);

  ahpContext.rankCriteria([
    [IDEA_VALIDATION, PITCH_DECK, 3],
    [IDEA_VALIDATION, PROTOTYPE, 5],
    [PITCH_DECK, PROTOTYPE, 3]
  ]);

  const output = ahpContext.run();
  let analyticContext = ahpContext.debug();
  for (let key in analyticContext) {
    console.log(`${key}: `, analyticContext[key], "\n");
  }

  const rankScores = output.rankedScoreMap;

  // Change format for return purpose
  const rankScoresFormat = Object.entries(rankScores).map(item => {
    const [name, score] = item;
    return { name, score };
  });

  // Sort by highest
  const rankScoresSort = _.sortBy(rankScoresFormat, "score").reverse();

  res.send(rankScoresSort);
};
