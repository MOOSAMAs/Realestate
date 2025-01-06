import { propertiesModel } from "../../../databases/models/propeties.model.js";
import { catchError } from "../../middleware/handleError.js";
import { apiFeature } from "../../utils/apiFeatures.js";
import { customError } from "../../utils/customError.js";
import { uploadImageToCloudinary } from "../../utils/upload.img.cloud.js";

const addProperty = catchError(async (req, res, next) => {
  req.body.owner = req.user.id;
  req.body.backgroundImage = req.files.backgroundImage[0].filename;
  req.body.images = req.files.images.map(image => image.filename);

  if (req.files && req.files.backgroundImage && req.files.backgroundImage.length > 0) {
    const backgroundImageUrl = await uploadImageToCloudinary(req.files.backgroundImage[0].path, "realestate/image");
    req.body.backgroundImage = backgroundImageUrl;
  }

  if (req.files && req.files.images && req.files.images.length > 0) {
    const imageUrls = await Promise.all(
      req.files.images.map(async (image) => {
        return await uploadImageToCloudinary(image.path, "realestate/gallery");
      })
    );
    req.body.images = imageUrls
  }
  const property = new propertiesModel(req.body);
  await property.save();
  res.status(201).json({ message: "Property added successfully", property });
});

const getAllProperties = catchError(async (req, res, next) => {
  const apiFeatures = new apiFeature(propertiesModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .sort()
    .search();
  const properties = await apiFeatures.mongooseQuery;
  res
    .status(201)
    .json({ message: "All properties", page: apiFeatures.page, properties });
});

const getOneProperty = catchError(async (req, res, next) => {
  const { id } = req.params;
  const result = await propertiesModel.findById(id);
  !result && next(new customError("Property not found", 404));
  result && res.status(201).json({ message: "Property", result });
});

const updatePropety = catchError(async (req, res, next) => {
  const { id } = req.params;
  const result = await propertiesModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !result && next(new customError("Property not found", 404));
  result && res.status(201).json({ message: "Property updated", result });
});

const deleteProperty = catchError(async (req, res, next) => {
  const { id } = req.params;
  const result = await propertiesModel.findByIdAndDelete(id);
  !result && next(new customError("Property not found", 404));
  result && res.status(201).json({ message: "Property deleted", result });
});

export {
  addProperty,
  getAllProperties,
  getOneProperty,
  updatePropety,
  deleteProperty,
};
