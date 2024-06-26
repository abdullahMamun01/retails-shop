import { dbConnect } from "@/services/dbConnect";
import { UserModel } from "../models/user-model";
import { Order } from "../models/payment-mode";

const {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} = require("@/utils/data-utils");
const { ProductModel } = require("../models/product-model");

const selectedFields = {
  name: 1,
  price: 1,
  totalRatings: 1,
  thumbnail: 1,
  discountPercentage: 1,
};

export const getTopNewArrivals = async () => {
  await dbConnect();
  const products = await ProductModel.find({}, selectedFields)
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return replaceMongoIdInArray(products);
};

export const getTrendingProducts = async () => {
  await dbConnect();
  const products = await ProductModel.find({}, selectedFields)
    .sort({ totalRatings: -1 })
    .limit(10)
    .lean();
  return replaceMongoIdInArray(products);
};

export const getSingleProduct = async (id) => {
  await dbConnect();
  const product = await ProductModel.findById(id).lean();
  return replaceMongoIdInObject(product);
};

//get related product by tags and category both
export const getRelatedProducts = async (productId, category, tags) => {
  await dbConnect();
  const products = await ProductModel.find(
    {
      _id: { $ne: productId },
      category: category,
      tags: { $in: tags },
    },
    selectedFields
  ).lean();

  return replaceMongoIdInArray(products);
};

//get all product list from database
export const getAllProducts = async ({ category, min, max, search ,page=1, limit=9}) => {
  await dbConnect();

  const filter = {};
  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { brand: { $regex: search } },
    ];
  }
  
  if (category) {
    // Assuming `category` is an array of categories
    // filter.category = { $in: category.split("|") };
    filter.$or = [{ category: category.split("|") }];
  }

  if (min) {
    filter.price = { ...filter.price, $gte: Number(min) };
  }

  if (max) {
    filter.price = { ...filter.price, $lte: Number(max) };
  }
  const totalPage  = await getTotalPage(Number(limit))
  const skip =( Number(page) - 1) * Number(limit)
  
  const products = await ProductModel.find(filter)
  .skip(skip)
  .limit(limit)
  .sort({ price: 1 })
  .lean();


  return replaceMongoIdInArray(products);
};


//get total product length
export async function getTotalPage(limit = 9){
  const totalProducts = await ProductModel.countDocuments()
  const totalPage = Math.ceil(totalProducts / limit)
  return totalPage
}

// product category list
export const getProductCategoryList = async () => {
  await dbConnect();
  const categories = await ProductModel.aggregate([
    {
      //step 1 : counting category
      $group: {
        _id: "$category",
        count: {
          $sum: 1,
        },

        thumbnail: { $first: "$thumbnail" },
        categoryName: { $first: "$category" },
      },
    },
    //step 2 sort by counting
    {
      $sort: { count: -1 },
    },
  ]);

  return categories;
};

//update user shipping address

export const updateAddress = async (fieldName, userId, address) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("user not found");
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    { [fieldName]: address },
    { new: true }
  ).lean();

  return updatedUser;
};

export async function getUser(userId) {
  const user = await UserModel.findById(userId)
    .select({ name: 1, email: 1, billing: 1, shipping: 1, phoneNumber: 1 })
    .lean();

  if (!user) return null;
  return replaceMongoIdInObject(user);
}

export const userOrderList = async (userId) => {
  const findUser = await UserModel.findById(userId);
  if (!findUser) return null;
  const orderList = await Order.find({ userId });
  return orderList;
};

export const updateProductQuantity = async (orders) => {


  if(orders.length === 0) return null
  const bulkOperations = orders.map((order) => ({
    updateOne: {
      filter: { _id : order.id },
      update: { $inc: { quantity: -order.quantity } },
    },
  }));

  await ProductModel.bulkWrite(bulkOperations);
};



export const getOrderList = async (userId) => {
  const user = await UserModel.findById(userId)
  if(!user) return null
  const orderList = await Order.find({userId : userId}).
  select({totalAmount:1 , paymentStatus:1 , orderedItems: 1}).lean()
  
  return orderList
}