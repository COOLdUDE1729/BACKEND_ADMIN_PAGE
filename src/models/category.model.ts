import { Model, model, Schema } from "mongoose";

export const categoryDetails = new Schema({
  name: { type: String, required : true},
  subCategory: [{ type: String ,required : false}]
});

const Category: Model<any> = model<any>("category", categoryDetails);
export default Category;
