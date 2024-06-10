import express from "express";
import * as candidateController from "../controllers/candidateController";

const router = express.Router();

router.post(
  "/candidate-responses",
  candidateController.createCandidateResponse
);
router.get(
  "/candidate-responses/:userId",
  candidateController.getCandidateResponses
);
router.put("/candidate-responses/:id/rate", candidateController.rateCandidate);
router.get(
  "/candidate-responses/:userId/rating",
  candidateController.getAggregatedSkillRating
);

export default router;
