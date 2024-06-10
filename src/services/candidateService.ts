import CandidateResponse from "../models/candidateResponse.model";
import { calculateSkillRating } from "../utils/calculateSkillRating";

export const createCandidateResponse = async (
  userId: number,
  skillId: number,
  difficultyLevel: "easy" | "medium" | "hard",
  question: string,
  response: string
) => {
  const candidateResponse = await CandidateResponse.create({
    userId,
    skillId,
    difficultyLevel,
    question,
    response,
  });
  return candidateResponse;
};

export const getCandidateResponses = async (userId: number) => {
  const candidateResponses = await CandidateResponse.findAll({
    where: { userId },
  });
  return candidateResponses;
};

export const rateCandidate = async (id: number, rating: number) => {
  const candidateResponse = await CandidateResponse.findByPk(id);
  if (candidateResponse) {
    candidateResponse.rating = rating;
    await candidateResponse.save();
    return candidateResponse;
  }
  return null;
};

export const getAggregatedSkillRating = async (userId: number) => {
  const candidateResponses = await CandidateResponse.findAll({
    where: { userId },
  });
  const skillRating = calculateSkillRating(candidateResponses);
  return skillRating;
};
