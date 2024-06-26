import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const response = await req.json();
  const items = response.products;
  const shipping = response.shipping

   
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.thumbnail],
          },
          unit_amount: item.price * 100, // price in cents
        },
        quantity: item.quantity,
       
      })),
      //NEXT_PUBLIC_BASE_URL
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/payment`,
   
        metadata: {
          shipping: JSON.stringify(shipping)
    
        },

    });

    return NextResponse.json(
      { sessionId: session.id, ok: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      error.message,
      { status: 500 }
    );
  }
}
