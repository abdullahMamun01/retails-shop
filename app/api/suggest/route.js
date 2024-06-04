import { ProductModel } from "@/database/models/product-model";
import { dbConnect } from "@/services/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {

  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("query")

  try {
    await dbConnect()
    const suggestions = await ProductModel.aggregate(

        [
            //stage-1 
            {
              $search: {
                index: "default",
                text: {
                  query: query,
                  path: {
                    wildcard: "*"
                },
                 // it will find accurate value if speling mistake user
                 fuzzy: {
                    maxEdits: 2, // Adjust the maximum number of edits (distance) allowed
                    prefixLength: 1 // Number of characters that must match exactly at the start
                  }
                }
              }
            },
            
            //stage-2
            {$limit : 10} ,
           { $project : {name:1 ,brand:1}}
          ]
       
      );

    console.log(suggestions);
    if (!suggestions)
      return NextResponse.json("suggestions not found!", { status: 404 });
    console.log("ok");
    return NextResponse.json(suggestions, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json("Invalid request", { status: 500 });
  }
}
