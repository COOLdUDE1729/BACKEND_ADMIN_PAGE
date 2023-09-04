import { Document } from "mongoose";

export interface ICategoryDetails extends Document {
  name: string;
  subCategory?: string[];
}