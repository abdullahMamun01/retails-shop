import { NextResponse } from "next/server"
import bcryptJs from 'bcryptjs'
import { UserModel } from "@/database/models/user-model";
import { dbConnect } from "@/services/dbConnect";


export async function POST(req){
    const {name ,email,password} = await req.json()

    await dbConnect()
    try {
        const hashedPassword = await bcryptJs.hash(password, 8);
       await UserModel.create({
            name ,
            email ,
            password: hashedPassword
        })
        
        return new NextResponse('user has been created on database' , {
            status: 201
        })
    } catch (error) {
            console.log(error.message)
    }
}