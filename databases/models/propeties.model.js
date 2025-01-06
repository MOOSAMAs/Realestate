import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: true,
    },
    backgroundImage:String,
    location: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 300,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    ownerShip: {
      type: String,
      required: true,
      enum: ["primary", "resale"],
    },
    type: {
      type: String,
      required: true,
      enum: [" house", "apartment", "villa"],
    },
  },
  {
    timestamps: true,
  }
);

propertiesSchema.pre(/^find/ , function (){
    this.populate( 'owner' , '-_id name email' )  
})

// propertiesSchema.post('init' , function (doc){
//     doc.backgroundImage = process.env.BASE_URL + "/property/" + doc.backgroundImage
//     doc.images = doc.images.map(image => process.env.BASE_URL + "/property/" + image)
// })

export const propertiesModel = mongoose.model("properties", propertiesSchema);