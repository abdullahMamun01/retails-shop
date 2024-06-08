'use client'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import useQueryParams from "@/hooks/useQueryParams"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "./button"
import { useState } from "react"



export default function PaginationComponent({ totalPage = 10 }) {

    const { query, setQuery } = useQueryParams("page")
    const searchParam = useSearchParams()

    const handlePageParams = (pageNo) => {
        setQuery([pageNo])
    }

    const handleNexPage = () => {
        const currentPage = Number(query.toString()) || 1
        if (currentPage < totalPage) {
            setQuery([currentPage + 1])
        }
    }


    const handlePrevPage = () => {
        const currentPage = Number(query.toString()) || 1
        if (currentPage > 1) {
            setQuery([currentPage - 1])
        }
    }

    console.log(query)
    return (
        <div className='my-4 w-full'>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={handlePrevPage} className="cursor-pointer" />
                    </PaginationItem>
                    <PaginationItem>
                        {
                            [...new Array(totalPage)].map((_, idx) =>
                                <Button
                                    className={`border-0 bg-transparent ${ searchParam.get("page") == idx+1 ? "bg-sky-600" : "text-gray-500"} hover:bg-gray-100`}
                                    onClick={() => handlePageParams(idx + 1)} key={idx} href="/">
                                    {idx + 1}
                                </Button>)
                        }

                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={handleNexPage} className="cursor-pointer" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
