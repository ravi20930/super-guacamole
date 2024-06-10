import { Request, Response, NextFunction } from "express";
import { log, error } from "../utils/logger";
import { responseHandler, throwError } from "../utils/handler";
import { generateToken } from "../utils/auth";
import { checkPassword, createUser } from "../services/userService";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      throwError(400, "Email and password are required");
    }
    log("Creating new user: {}");
    await createUser(email, password, role);
    const response = responseHandler(200, "User successfully created.");
    res.status(response.statusCode).json(response);
  } catch (err) {
    next(err);
  }
};

export const normalSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if the username and password are provided
    if (!email || !password) {
      throwError(400, "Email and password are required");
    }
    const { user, passwordMatch } = await checkPassword(email, password);
    if (!passwordMatch) {
      throwError(401, "Invalid username or password");
    }
    const token = generateToken(user!, "access");
    const response = responseHandler(200, "Sign in successful.", {
      token,
    });
    res.status(response.statusCode).json(response);
  } catch (err) {
    error(req, err);
    next(err);
  }
};
