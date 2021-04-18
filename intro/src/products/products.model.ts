import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
}

// export class Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;

//   constructor(id: string, name: string, desc: string, price: number) {
//     this.id = id;
//     this.name = name;
//     this.description = desc;
//     this.price = price;
//   }
// }

//TS provide us better syntax to do it
// export class Product {
//   constructor(
//     public id: string,
//     public name: string,
//     public description: string,
//     public price: number,
//   ) {}
// }

//here public means value are getting outside from class and it will store with same name in class
