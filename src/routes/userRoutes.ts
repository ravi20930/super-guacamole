import express from "express";
import * as userController from "../controllers/userController";
import * as candidateController from "../controllers/candidateController";
import { verifyAccessToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", verifyAccessToken("reviewer"), userController.getAllUsers);
router.get("/:id", verifyAccessToken(), userController.getUserById);
router.put("/:id", verifyAccessToken(), userController.updateUser);
router.delete("/:id", verifyAccessToken(), userController.deleteUser);

// Route accessible only to candidates
router.post(
  "/candidate-responses",
  verifyAccessToken("candidate"),
  candidateController.createCandidateResponse
);

// Route accessible to both candidates and reviewers
router.get(
  "/candidate-responses/:userId",
  verifyAccessToken("candidate", "reviewer"),
  candidateController.getCandidateResponses
);

// Route accessible only to reviewers
router.put(
  "/candidate-responses/:id/rate",
  verifyAccessToken("reviewer"),
  candidateController.rateCandidate
);

// Route accessible to both candidates and reviewers
router.get(
  "/candidate-responses/:userId/rating",
  verifyAccessToken("candidate", "reviewer"),
  candidateController.getAggregatedSkillRating
);

export default router;
