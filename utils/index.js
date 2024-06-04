import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


export const generatePDF = (orderDetails) => {
  const subTotal = orderDetails.reduce((acc,pd) => acc + pd.price , 0)
  const doc = new jsPDF();
  const skyColor = [38, 53, 93]; // RGB for sky blue
  doc.setFillColor(...skyColor);
  doc.rect(0, 0, doc.internal.pageSize.width, 8, 'F'); 



  //company name
  autoTable(doc, {
    startY: 10,
    body: [
      [
        {
          content: "LWS-KART",
          styles: {
            halign: 'left',
            fontSize: 15,
            textColor: [135, 206, 235]
          }
        },
        {
          content: "INVOICE",
          styles: {
            halign: 'right',
            fontSize: 15,
            textColor: "#000000",

          }
        }
      ]
    ],
    
  })
  
  //adding date



  //billing info
  autoTable(doc, {
    body: [
      [
        {
          content: "BILLED TO : ",
          styles: {
            halign: 'left',
            fontSize: 10,
            textColor: "#000000"
          }
        },
      ]
    ],
    
    theme: 'plain'
  })


  // autoTable(doc, {
  //   startY: 35,
  //   body: [
  //     [
  //       {
  //         content: `customer \n\n STREET: Chittagong,bangladesh  \n\nCITY:Chittagong , Country: Bangladesh \n\nzip:4335`,
  //         styles: {
  //           halign: 'left',
  //           fontSize: 8,
  //           textColor: "#000000"
  //         }
  //       }
  //     ]
  //   ],
  //   theme: 'plain'
  // })


  autoTable(doc, {

    head: [['Product Name', 'quantity', 'price']],
    body: orderDetails.map(pd => [pd.name, pd.quantity, pd.amount]),
    theme: 'striped',
    headStyles: {
      fillColor: "#26355D",
    }
  })


  autoTable(doc, {
    headStyles: {
      fillColor: "#26355D",
    },
    head: [
      ["Sub Total", "             ", `${subTotal}`]
    ],
    theme: 'striped',
  })


  return doc
  
};