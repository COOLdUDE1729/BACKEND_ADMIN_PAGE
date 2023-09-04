import {Model, model, Schema} from 'mongoose'

const brandSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    video: {
        type: String,
        required: false,
      },
});

const Brand: Model<any> = model<any>("brand", brandSchema);
export default Brand;