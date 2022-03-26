export interface ProductGetDto{
    id:number;
    name:string;
    brandId:number;
    genderId:number;
    salePrice:number;
    discountPercent:number;
    image:string;
    productFunctionalityId:number;
    createDate:Date;
}