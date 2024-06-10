import CandidateResponse from "../models/candidateResponse.model";

const getDifficultyWeight = (
  difficultyLevel: "easy" | "medium" | "hard"
): number => {
  switch (difficultyLevel) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
    default:
      return 0;
  }
};

export const calculateSkillRating = (
  candidateResponses: CandidateResponse[]
) => {
  const skillRatings: {
    [skillId: number]: { totalWeightedScore: number; totalWeight: number };
  } = {};
  for (const response of candidateResponses) {
    const { skillId, difficultyLevel, rating } = response;
    const weight = getDifficultyWeight(difficultyLevel);
    if (!skillRatings[skillId]) {
      skillRatings[skillId] = { totalWeightedScore: 0, totalWeight: 0 };
    }

    if (rating !== null) {
      skillRatings[skillId].totalWeightedScore += weight * rating;
      skillRatings[skillId].totalWeight += weight;
    }
  }
  const aggregatedSkillRatings = Object.entries(skillRatings).map(
    ([skillId, { totalWeightedScore, totalWeight }]) => ({
      skillId: parseInt(skillId),
      rating: totalWeight > 0 ? totalWeightedScore / totalWeight : 0,
    })
  );
  return aggregatedSkillRatings;
};
