
import React from "react";

import dynamic from "next/dynamic";
// import Invoice from "@/components/invoice/invoice";

const InvoicePDF = dynamic(() => import("@/components/invoice/invoice"), {
    ssr: false,
  });

export default function page() {
 

  return (
   <InvoicePDF/>
  );
}
