import bcrypt from "bcrypt";
import User from "../models/user.model";
import { throwError } from "../utils/handler";

export const createUser = async (
  email: string,
  password: string,
  role: "candidate" | "reviewer"
) => {
  let user = await User.findOne({ where: { email } });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = User.build({
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
  } else {
    throwError(409, "User with the provided email already exists.");
  }
};

export const checkPassword = async (
  email: string,
  password: string
): Promise<{ user: User | null; passwordMatch: boolean }> => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return { user: null, passwordMatch: false };
  }
  if (!user.password) {
    return { user: null, passwordMatch: false };
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  return { user, passwordMatch };
};

export const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

export const getUserById = async (id: number) => {
  const user = await User.findByPk(id);
  return user;
};

export const updateUser = async (
  id: number,
  name: string,
  role: "candidate" | "reviewer"
) => {
  const user = await User.findByPk(id);
  if (user) {
    user.name = name;
    user.role = role;
    await user.save();
    return user;
  }
  return null;
};

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
};
