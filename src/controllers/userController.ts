import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { responseHandler } from "../utils/handler";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    const response = responseHandler(200, "Users fetched successfully", users);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await userService.getUserById(userId);
    if (user) {
      const response = responseHandler(200, "User fetched successfully", user);
      res.status(response.statusCode).json(response);
    } else {
      const response = responseHandler(404, "User not found");
      res.status(response.statusCode).json(response);
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.id);
  const { name, role } = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, name, role);
    if (updatedUser) {
      const response = responseHandler(
        200,
        "User updated successfully",
        updatedUser
      );
      res.status(response.statusCode).json(response);
    } else {
      const response = responseHandler(404, "User not found");
      res.status(response.statusCode).json(response);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.id);
  try {
    const deleted = await userService.deleteUser(userId);
    if (deleted) {
      const response = responseHandler(200, "User deleted successfully");
      res.status(response.statusCode).json(response);
    } else {
      const response = responseHandler(404, "User not found");
      res.status(response.statusCode).json(response);
    }
  } catch (error) {
    next(error);
  }
};
