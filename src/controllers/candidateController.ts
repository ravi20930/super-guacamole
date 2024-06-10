import { Request, Response, NextFunction } from "express";
import { responseHandler } from "../utils/handler";
import * as candidateService from "../services/candidateService";

export const createCandidateResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, skillId, difficultyLevel, question, response } = req.body;
  try {
    const candidateResponse = await candidateService.createCandidateResponse(
      userId,
      skillId,
      difficultyLevel,
      question,
      response
    );
    const apiResponse = responseHandler(
      201,
      "Candidate response created successfully",
      candidateResponse
    );
    res.status(apiResponse.statusCode).json(apiResponse);
  } catch (err) {
    next(err);
  }
};

export const getCandidateResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.userId);
  try {
    const candidateResponses = await candidateService.getCandidateResponses(
      userId
    );
    const response = responseHandler(
      200,
      "Candidate responses fetched successfully",
      candidateResponses
    );
    res.status(response.statusCode).json(response);
  } catch (err) {
    next(err);
  }
};

export const rateCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const responseId = parseInt(req.params.id);
  const { rating } = req.body;
  try {
    const ratedResponse = await candidateService.rateCandidate(
      responseId,
      rating
    );
    if (ratedResponse) {
      const response = responseHandler(
        200,
        "Candidate response rated successfully",
        ratedResponse
      );
      res.status(response.statusCode).json(response);
    } else {
      const response = responseHandler(404, "Candidate response not found");
      res.status(response.statusCode).json(response);
    }
  } catch (err) {
    next(err);
  }
};

export const getAggregatedSkillRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.userId);
  try {
    const aggregatedSkillRating =
      await candidateService.getAggregatedSkillRating(userId);
    const response = responseHandler(
      200,
      "Aggregated skill rating fetched successfully",
      aggregatedSkillRating
    );
    res.status(response.statusCode).json(response);
  } catch (err) {
    next(err);
  }
};
