import Brand from "../models/brand.model";
import { IBrand } from "../interfaces/brand.interface";

export class BrandService{
    async addBrand(data: IBrand, language?: string) {
        const brand = new Brand(data);
        return brand.save();
    }    
    async getBrand(name: string){
        const brand = await Brand.findOne({name:name}).exec();
        if(!brand){
            throw{message: "Brand not found"};
          }
        return brand;
    }
    async deleteBrand(brandId: string) {
        return await Brand.findByIdAndRemove({_id:brandId}).exec();
    }    
}