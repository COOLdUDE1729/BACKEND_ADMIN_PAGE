import { Router } from "express";
import { HealthController } from "../controllers/health.controller";
import { LoginController } from "../controllers/login.controller";
import { UserController } from "../controllers/user.controller";
import { SellerController } from "../controllers/seller.controller";
import { AddressController } from "../controllers/address.controller";
import { ProductController } from "../controllers/product.controller";
import { BrandController } from "../controllers/brand.controller";
import upload from "../../middlewares/upload.middleware"
import { CartController } from "../controllers/cart.controller";
import { StoreController } from "../controllers/store.controller";
import { uploadCsvFile } from "../../middlewares/multer.middleware";
import { guard } from "../../middlewares/jwt-gaurd.middleware";
import { securityCheck } from "../../middlewares/security.middleware";


const secret = process.env.ACCESS_TOKEN_SECRET??"d9c88113b44bc263987cac0c544ef3ea8c97c14811b50bbe24f91528a8e7c2f447754105852849b1dc18fc48e8e4add3466e6eaee9640278c219f743dc8d955f";

export class MainRoute {
  static register() {
    const router = Router();
    router.route("/api/v1/health").get(HealthController.health);
    router.route("/api/v1/login").post(LoginController.Login);
    router.route("/api/v1/:clientId/updatePasword").put(LoginController.updatePassword);
    router.route("/api/v1/userSignUp").post(UserController.create);
    router.route("/api/v1/:clientId/userAdd").post(guard(secret, "user_2"), securityCheck, UserController.add);
    router.route("/api/v1/:clientId/user").get(guard(secret, "user_2"), securityCheck, UserController.getAll);
    router.route("/api/v1/:clientId/user/:_id").get(guard(secret, "user_1"), securityCheck, UserController.getOne);
    router.route("/api/v1/:clientId/user/:_id").put(guard(secret, "user_1"), securityCheck, UserController.update);
    router.route("/api/v1/:clientId/user/:_id/status").delete(guard(secret, "user_1"), securityCheck, UserController.delete);
    router.route("/api/v1/:clientId/user/:_id").delete(guard(secret, "user_2"), securityCheck, UserController.revoke);

    router.route("/api/v1/sellerSignUp").post(SellerController.sellerSignUp);
    router.route("/api/v1/sellerAdd").post(guard(secret, "seller_2"), securityCheck, SellerController.createSeller);
    router.route("/api/v1/seller").get(guard(secret, "seller_2"), securityCheck, SellerController.getAllSeller);
    router.route("/api/v1/seller/:_id").get(guard(secret, "seller_1"), securityCheck, SellerController.getOneSeller);
    router.route("/api/v1/seller/:_id").put(guard(secret, "seller_2"), securityCheck, SellerController.updateSeller);
    router.route("/api/v1/seller/:_id/status").delete(guard(secret, "seller_1"), securityCheck, SellerController.deleteSeller);
    router.route("/api/v1/seller/:_id").delete(guard(secret, "seller_2"), securityCheck, SellerController.revokeSeller);


    // for offers get projects whose discount>0
    router.route("/api/v1/getAllOffers").get(ProductController.getAllOffers);
    // for offer deletion set discount=0
    router.route("/api/v1/deleteOffer/:productId").put(ProductController.deleteOffer);
    // router.route("/api/v1/deleteProduct/:_id").delete(guard(secret, "seller_2"), ProductController.revoke);

    router.route("/api/v1/addressCreation").post(guard(secret, "address_1"), securityCheck, AddressController.createAddress);
    router.route("/api/v1/address/:type/:refId").get(guard(secret, "address_1"), securityCheck, AddressController.getAddress);
    router.route("/api/v1/address").get(guard(secret, "address_2"), securityCheck, AddressController.getAllAddress);
    router.route("/api/v1/address/:_id").put(guard(secret, "address_1"), securityCheck, AddressController.updateAddress);
    router.route("/api/v1/address/:_id/status").delete(guard(secret, "address_1"), securityCheck, AddressController.deleteAddress);
    router.route("/api/v1/address/:_id").delete(guard(secret, "address_2"), securityCheck, AddressController.revokeAddress);


    router.route("/api/v1/addBrand").post(BrandController.addBrand);
    router.route("/api/v1/getBrand/:name").get(BrandController.getBrand);
    router.route("/api/v1/deleteBrand/:_id").delete(BrandController.deleteBrand);

    router.route("/api/v1/cart/:customerId").get(CartController.getCart);
    router.route("/api/v1/cart/addItem").post(CartController.addItem);
    router.route("/api/v1/cart/updateCount").put(CartController.updateCount);
    router.route("/api/v1/cart/deleteItem").put(CartController.deleteItem);


    // uploading files to mongoDB
    router.route("/api/v1/uploadFile").post(upload.single("file"), UserController.uploadFile);
  

    router.route("/api/v1/:sellerId/:storeId/addProduct").post(guard(secret, "seller_2"), securityCheck, ProductController.create);
    router.route("/api/v1/:sellerId/:storeId/products/:_id").get(guard(secret, "seller_1"), securityCheck, ProductController.getOne);
    router.route("/api/v1/:sellerId/:storeId/products").get(guard(secret, "seller_2"), securityCheck, ProductController.getAll);
    router.route("/api/v1/:sellerId/:storeId/updateProduct/:_id").put(guard(secret, "seller_2"), securityCheck, ProductController.update);
    router.route("/api/v1/:sellerId/:storeId/deleteProduct/:_id").delete(guard(secret, "seller_1"), securityCheck, ProductController.delete);
    router.route("/api/v1/deleteProduct/:_id").delete(guard(secret, "seller_2"), securityCheck, ProductController.revoke);
    router.route("/api/v1/:sellerId/:storeId/products/bulkUpload").post(guard(secret, "seller_2"), securityCheck, uploadCsvFile.single("file"), ProductController.bulkUpload);
    router.route("/api/v1/products/bulkUploadFormat").get(ProductController.bulkUploadFormat);

    router.route("/api/v1/productsByLetters").get(ProductController.getByLetters);
    router.route("/api/v1/productsByFilters").get(ProductController.getByFilters);

    router.route("/api/v1/products/:_id").get(ProductController.getOne2);
    router.route("/api/v1/products").get(ProductController.getAll2);


    return router;
  }
}
