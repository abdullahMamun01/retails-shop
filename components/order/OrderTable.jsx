import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getOrderList, getSingleProduct } from '@/database/queries'
import { auth } from '@/auth'

export default async function OrderTable() {
    const session = await auth()
    const orderList = await getOrderList(session.user.id)
    console.log(orderList , ' ordertable')
  return (
    <Table>
      <TableCaption>A list of your recent Order.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Quantity</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orderList.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="font-medium">{order?.orderedItems?.length}</TableCell>
            <TableCell>
                {
                    // order?.orderedItems?.map(pd => <ProductName key={pd._id} productId={pd._id}  />)
                }

            </TableCell>
            <TableCell className="text-right">${order?.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
  )
}



async function   ProductName (productId) {
    const product = await getSingleProduct(productId)

    return <TableBody>{product?.name} </TableBody>
}