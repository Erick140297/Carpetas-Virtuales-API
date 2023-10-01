import { Router } from "express";
import {
  getUser,
  getUsers,
  postUser,
  deleteUser,
  putUser,
  authUser,
  updatePassword,
  getSupervisores,
  resetPassword,
} from "../controllers/user.controller";

const router = Router();

router.get("/get-user/:id", getUser);

router.get("/get-users", getUsers);

router.post("/post-user", postUser);

router.put("/update-user/:id", putUser);

router.delete("/delete-user/:id", deleteUser);

router.post("/auth", authUser);

router.put("/update-password/:id", updatePassword);

router.get("/get-supervisores", getSupervisores)

router.put("/reset-password/:id", resetPassword)

export { router };
