import { UserModel } from "@/database/models/user-model";
import { dbConnect } from "@/services/dbConnect";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";
import { NextResponse } from "next/server";




export const GET = async (_req , {params}) => {
    try {
     await dbConnect()
      // find user from database
      const user = await UserModel.findById(params.userId).lean();
        if(!user){
            return NextResponse.json("User not found", { status: 401 });
        }
        const {password , ...res} = user
        
      return NextResponse.json(replaceMongoIdInObject(res), { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json("Internal server error", { status: 500 });
    }
  };
  