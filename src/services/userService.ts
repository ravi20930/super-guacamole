import User from "../models/user.model";

export const createUser = async (
  name: string,
  role: "candidate" | "reviewer"
) => {
  const user = await User.create({ name, role });
  return user;
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
