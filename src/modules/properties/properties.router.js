import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import * as property from "./properties.controller.js";
import { uploadMixOfFilesCloud } from "../../middleware/cloudinary.multer.upload.js";

let data = [
  { name: "backgroundImage", maxCount: 1 },
  { name: "images", maxCount: 7 },
];

const propertyRouter = express.Router();

propertyRouter
  .route("/")
  .post(
    protectedRoutes,
    uploadMixOfFilesCloud(data, "property"),
    property.addProperty
  )
  .get(protectedRoutes, property.getAllProperties);

propertyRouter
  .route("/:id")
  .get(protectedRoutes, property.getOneProperty)
  .put(protectedRoutes, property.updatePropety)
  .delete(protectedRoutes, property.deleteProperty);

export default propertyRouter;
