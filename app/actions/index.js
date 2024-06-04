"use server";

import { auth, signIn } from "@/auth";
import { updateAddress } from "@/database/queries";
import { loadStripe } from "@stripe/stripe-js";
import { revalidatePath } from "next/cache";

export async function login(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateAddressGeneric(formData, addressType) {
  const session = await auth();
  try {
    const address = {};
    const formEntries = formData.entries();
    for (let [key, value] of formEntries) {
      address[key] = value;
    }
    await updateAddress(addressType, session.user.id, address);
    revalidatePath("/");
  } catch (e) {
    console.log(e.message);
  }
  return;
}

export async function updateShippingAddress(formData) {
  await updateAddressGeneric(formData, "shipping");
}

export async function updateBillingAddress(formData) {
  await updateAddressGeneric(formData, "billing");
}

export async function doPayment( products,stripe) {

  try {
    const body = {
      products,
    };
    const response = await fetch("http://localhost:3000/api/stripe/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw Error("payment error");
    }
    const session = await response.json();
    //now we can call pdf send api request on the server if payment success
    await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  } catch (error) {
    console.log(error.message , ' from do payment')
  }
}
