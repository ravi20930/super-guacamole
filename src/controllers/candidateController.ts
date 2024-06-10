import { Request, Response } from "express";
import * as candidateService from "../services/candidateService";

export const createCandidateResponse = async (req: Request, res: Response) => {
  const { userId, skillId, difficultyLevel, question, response } = req.body;
  try {
    const candidateResponse = await candidateService.createCandidateResponse(
      userId,
      skillId,
      difficultyLevel,
      question,
      response
    );
    res.status(201).json(candidateResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to create candidate response" });
  }
};

export const getCandidateResponses = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const candidateResponses = await candidateService.getCandidateResponses(
      userId
    );
    res.status(200).json(candidateResponses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch candidate responses" });
  }
};

export const rateCandidate = async (req: Request, res: Response) => {
  const responseId = parseInt(req.params.id);
  const { rating } = req.body;
  try {
    const ratedResponse = await candidateService.rateCandidate(
      responseId,
      rating
    );
    if (ratedResponse) {
      res.status(200).json(ratedResponse);
    } else {
      res.status(404).json({ error: "Candidate response not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to rate candidate" });
  }
};

export const getAggregatedSkillRating = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const aggregatedSkillRating =
      await candidateService.getAggregatedSkillRating(userId);
    res.status(200).json(aggregatedSkillRating);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch aggregated skill rating" });
  }
};
