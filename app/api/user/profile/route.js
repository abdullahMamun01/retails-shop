import { verify } from "jsonwebtoken"; // For JWT verification

import { UserModel } from "@/database/models/user-model";
import { NextResponse } from "next/server";

// export const POST = async (req, res) => {
//   try {
//     // Verify JWT in the Authorization header:
//     const authorization = req.headers.authorization;
//     if (!authorization || !authorization.startsWith("Bearer ")) {
//       return NextResponse.json("Missing or invalid access token", {
//         status: 401,
//       });
//     }

//     const token = authorization.split(" ")[1]; // Extract token
//     const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify using secret

//     // Extract user ID from the decoded token:
//     const userId = decoded.userId;

//     //  Validate user input from the request body:
//     const { name, email } = req.body; // Example fields

//     if (!name || !email) {
//       return NextResponse.json("Missing required fields", { status: 400 });
//     }

//     // find user from database
//     const user = await UserModel.findOne({ _id: userId });
//     if (!user) {
//       return NextResponse.json("user not found", { status: 401 });
//     }

//     const updatedUser = await UserModel.updateOne(
//       { _id: userId },
//       { $set: { name, email } } // Update specific fields
//     );

//     if (!updatedUser.modifiedCount) {
//       return NextResponse.json("User profile not update", { status: 401 });
//     }

//     return NextResponse.json("Profile updated successfully", { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json("Internal server error", { status: 500 });
//   }
// };


export const GET = async (req, res , params) => {
  try {
   


    console.log(params)

    // find user from database
    // const user = await UserModel.findOne({  });
    // if (!user) {
    //   return NextResponse.json("user not found", { status: 401 });
    // }

    // const updatedUser = await UserModel.updateOne(
    //   { _id: userId },
    //   { $set: { name, email } } // Update specific fields
    // );

    // if (!updatedUser.modifiedCount) {
    //   return NextResponse.json("User profile not update", { status: 401 });
    // }

    return NextResponse.json("Profile updated successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

