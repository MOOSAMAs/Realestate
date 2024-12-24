import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import { customError } from '../utils/customError.js';

const options = (folderName)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
          cb(null, uuidv4() + '-' + file.originalname)
        }
      })

      function fileFilter (req, file, cb) {
       if(file.mimetype.startsWith('image')){
         cb(null, true)
       } else {
        cb(new customError('Pls place an image' , 402) , false)
       }
    }
      return multer({ storage , fileFilter })
}

export const uploadSingleImage = (folderName , fieldName) => options(folderName).single(fieldName)

export const uploadMixOfImage = (folderName , fieldName) => options(folderName).fields(arrayOfFields)
