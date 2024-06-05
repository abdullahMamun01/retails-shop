import Stripe from "stripe";
import { NextResponse } from "next/server";
import { UserModel } from "@/database/models/user-model";
import { Order } from "@/database/models/payment-mode";
import { generatePDF } from "@/utils";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { sessionId, userId } = await req.json();
  try {
    const listLineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    const retrieve = await stripe.checkout.sessions.retrieve(sessionId);

    //check payment is valid
    if(!listLineItems || !retrieve){
        return NextResponse.json({message: 'Invalid payment Id!'} , {status: 401});
    }

    //check user valid
    const findUser = await UserModel.findById(userId)
    if(!findUser){
        return NextResponse.json({message: 'Invalid user id'} , {status: 401});
    }
    
    //product purchase items
    const items = listLineItems.data;
    const orderedItems = items.map((item) => ({
      name: item.description,
      quantity: item.quantity,
      amount: Math.floor(item.amount_total / 100),
    }));

   
    // //save on database
    const shipping  = JSON.parse(retrieve.metadata.shipping)
    const products = JSON.parse(retrieve.metadata.products)
    console.log(products , ' from success')
    const totalAmount  = orderedItems.reduce((acc,pd) => acc + Number(pd.amount) , 0)
    const order =  new Order({
        userId ,
        sessionId ,
        orderedItems,
        shipping,
        paymentStatus: "completed",
        totalAmount
    })
    const saveOrder = await order.save()
    
    //generate pdf to send the mail
    const invoiceDoc = generatePDF(orderedItems , shipping);
    const pdfBuffer =  Buffer.from(invoiceDoc.output("arraybuffer"));

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "abdullah.mamun.0110@gmail.com",
        pass: process.env.APP_PASS, 
      },
    });


    const mailOptions = {
      from: '"lws-kart" <no-replay@lwsKart.com>',
      to: shipping.email,
      subject: "Your Product Information",
      text: "Please find attached the product information PDF.",
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };
    const nodeMail = await transporter.sendMail(mailOptions);

    return NextResponse.json(`payment success . download your invoice!`);

  } catch (error) {
    return NextResponse.json(error.message, { status: "500" });
  }
}
