import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { getNewTokens } from "@/utils/getNewTokens";
import { UserModel } from "@/database/models/user-model";
import { dbConnect } from "@/services/dbConnect";



export async function POST(req) {
  await dbConnect()
  const { email, password } = await req.json();
  try {
    const user = await UserModel.findOne({ email: email }).lean();
    console.log({user})

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    const payload = {
        id : user._id.toString() ,
        name: user.name ,
        email: user.email
    };

    const token =  getNewTokens(payload);


    return NextResponse.json({...payload, ...token} ,{
        status: 200
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid credential" }, { status: 500 });
  }
}
