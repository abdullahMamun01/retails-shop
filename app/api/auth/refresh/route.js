import { UserModel } from '@/database/models/user-model'
import { dbConnect } from '@/services/dbConnect'
import { getNewTokens } from '@/utils/getNewTokens'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(req){
    await dbConnect()
    const {refresh_token } = await req.json()

    if(!refresh_token){
        return NextResponse.json(' refresh token is required' , {status : 401})
    }
    try{
        const decode = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
     
        if(!decode){
            return NextResponse.json('Invalid refresh token' , {status : 403})
        }
        
        const user  = await UserModel.findById(decode.id)
        if(!user || user.email != decode.email){
            return NextResponse.json('Invalid refresh token' , {status : 403})
        }
        const tokens = getNewTokens()

        return NextResponse.json(tokens , {status: 200})

    }catch(e){
         return NextResponse.json( "Invalid refresh token" , { status: 500 });
    }
}