import express from "express";
import * as user from "./user.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { userValidationSchema } from "./user.schema.validate.js";
import { fileUploadCloud } from "../../middleware/cloudinary.multer.upload.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    validation(userValidationSchema),
    user.addUser
  )
  .get(protectedRoutes, allowedTo("admin"), user.getAllUsers);

userRouter
  .route("/:id")
  .get(protectedRoutes, allowedTo("admin"), user.getOneUser)
  .put(protectedRoutes, allowedTo("admin", "user"), user.updateUser)
  .delete(protectedRoutes, allowedTo("admin"), user.deleteUser);

userRouter.route("/mail/:token").get(user.verifyMail);

userRouter
  .route("/profile-pic")
  .post(
    protectedRoutes,
    fileUploadCloud("profilePic", "profileImages"),
    user.userProfile
  );

export default userRouter;
