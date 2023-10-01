import User from "../interfaces/user.interface";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model";

const insertUser = async (user: User) => {
  const response = userModel.create(user);
  return response;
};

const returnUser = async (id: string) => {
  const response = userModel.findById(id);
  return response;
};

const returnUsers = async () => {
  const response = userModel.find();
  return response;
};

const returnSupervisores = async () => {
  const response = userModel.find({post: "Supervisor"});
  return response;
};

const updateUser = async (id: string, data: User) => {
  const userFound = await userModel.findById(id);
  if (!userFound) {
    throw new Error("User not found");
  }

  for (const key in data) {
    switch (key) {
      case "name":
        userFound.name = data.name;
        break;
      case "lastName1":
        userFound.lastName1 = data.lastName1;
        break;
      case "lastName2":
        userFound.lastName2 = data.lastName2;
        break;
      case "email":
        userFound.email = data.email;
        break;
      case "post":
        userFound.post = data.post;
        break;
      case "zone":
        userFound.zone = data.zone;
        break;
      case "station":
        userFound.station = data.station;
        break;
    }
  }

  await userFound.save();
  return "User updated successfully";
};

const removeUser = async (id: string) => {
  const response = await userModel.findByIdAndRemove(id);
  if (!response) {
    throw new Error("Error delete user");
  }
  return "User deleted successfully";
};

const authService = async (userName: string, password: string) => {
  const userFound = await userModel.findOne({ userName });
  if (!userFound) {
    throw new Error("The username or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    throw new Error("The username or password is incorrect");
  }

  const result = {
    id: userFound._id,
    name: userFound.name,
    userName: userFound.userName,
    post: userFound.post,
    zone: userFound.zone,
    station: userFound.station,
  };

  return result;
};

const resetPasswordService = async (id: string) => {
  if(!id){
    throw new Error("User id is required");
  }
  const userFound = await userModel.findById(id);
  if (!userFound) {
    throw new Error("User not found");
  }
  let password = "1234";
  const newPasswordHash = await bcrypt.hash(password, 10);
  userFound.password = newPasswordHash;
  await userFound.save();
  return "password updated successfully";
}

const updatePasswordService = async (
  password: string,
  newPassword: string,
  id: string
) => {
  if (!password || !newPassword) {
    throw new Error("Both current and new passwords are required");
  }

  const userFound = await userModel.findById(id);
  if (!userFound) {
    throw new Error("User not found or incorrect credentials");
  }

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    throw new Error("User not found or incorrect credentials");
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  userFound.password = newPasswordHash;
  await userFound.save();
  return "password updated successfully";
};

export {
  insertUser,
  returnUser,
  returnUsers,
  updateUser,
  removeUser,
  authService,
  updatePasswordService,
  returnSupervisores,
  resetPasswordService,
};
