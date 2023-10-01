import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { handleHttp } from "../utils/error.handle";
import {
  insertUser,
  returnUser,
  returnUsers,
  updateUser,
  removeUser,
  updatePasswordService,
  authService,
  returnSupervisores,
  resetPasswordService,
} from "../services/user.service";
import User from "../interfaces/user.interface";

const postUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { name, lastName1, lastName2, email, post, zone, station } = req.body;

    const getInitials = (name: string) => {
      const nameSplit = name.split(" ");
      const initials = nameSplit.map((n) => n[0]).join("");
      return initials;
    };

    let password = "1234";

    const initials = getInitials(name);
    const userName = initials.replace(/\s+/g, "") + "-" + uuidv4().slice(0, 4);
    const passwordHash = await bcrypt.hash(password, 10);

    const data: User = {
      name: name,
      lastName1: lastName1,
      lastName2: lastName2,
      userName: userName,
      email: email,
      password: passwordHash,
      post: post,
      zone: zone,
      station: station,
    };

    const user = await insertUser(data);
    res.status(200).send(user);
  } catch (error) {
    handleHttp(res, "ERROR_POST_USER", error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await returnUser(id);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_USER", error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await returnUsers();
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_USERS", error);
  }
};

const authUser = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    const result = await authService(userName, password);
    res.status(200).json(result);
  } catch (error) {
    handleHttp(res, "ERROR_AUTH", error);
  }
};

const updatePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    const response = await updatePasswordService(password, newPassword, id);
    return res.status(200).json({ message: response });
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_PASSWORD", error);
  }
};

const putUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const response = await updateUser(id, body);
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_USER", error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await removeUser(id);
    res.status(200).send({ message: response });
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_USER", error);
  }
};

const getSupervisores = async (req: Request, res: Response) => {
  try {
    const response = await returnSupervisores();
    res.status(200).send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_SUPERVISORES", error);
  }
}

const resetPassword = async (req: Request, res: Response) => {try {
  const id: string = req.params.id;
  const response = await resetPasswordService(id);
    res.status(200).send(response);
} catch (error) {
  handleHttp(res, "ERROR_RESET_PASSWORD", error);
}}

export { postUser, getUser, getUsers, deleteUser, putUser, authUser, updatePassword, getSupervisores, resetPassword };
