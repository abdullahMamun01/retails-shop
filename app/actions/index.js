"use server";

import { auth, signIn } from "@/auth";
import { updateAddress } from "@/database/queries";

import { revalidatePath } from "next/cache";

export async function login(formData) {
  const {email ,password} = formData
  try {
    const response = await signIn("credentials", {
      email,
      password,
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
