import { string } from "joi";

export interface ISeller extends Document{
    phone_number?: string;
    email?: string;
    name?: string;
    password?: string;
    profilePic?: string;
    gstId?: string;
    language?: string[];
}

export interface ISellerUpdate {
    phone_number?: string;
    name?: string;
    password?: string;
    profilePic?: string;
    language?: string[];
}