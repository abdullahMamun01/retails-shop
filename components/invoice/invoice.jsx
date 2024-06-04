'use client'
import React, { useEffect, useState } from 'react';

import { useCart } from '@/hooks/useCart';
import { generatePDF } from '@/utils';


const InvoicePDF = () => {
  const { cart } = useCart()
 

  
  return (
    <div>

      <button onClick={() => generatePDF(cart).save()}>Download PDF</button>
    </div>
  );
};

export default InvoicePDF;
