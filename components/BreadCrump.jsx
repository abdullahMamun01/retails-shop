'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { SlashIcon } from 'lucide-react';


export default function BreadCrump() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {

    const pathWithoutQuery = pathname.split('?')[0]; // Ignore query params for path segments
    const pathSegments = pathWithoutQuery.split('/').filter((segment) => segment);

    const breadcrumbPaths = pathSegments.map((segment, index) => {
      return {
        breadcrumb: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
      };
    });

    setBreadcrumbs(breadcrumbPaths);
  }, [pathname]);

  return (
    <div className="container py-4 flex items-center gap-3">
      <Breadcrumb className="list-none">

        {breadcrumbs.slice(1).map((breadcrumb, index) => (
          <BreadcrumbItem key={index}>
            {
              index === breadcrumbs.length - 2 ?
                <BreadcrumbPage className="text-gray-600 font-bold">{breadcrumb.breadcrumb}</BreadcrumbPage>
                :
                <>
                  <BreadcrumbLink className="text-sky-600 font-bold" href={`/en/${breadcrumb.breadcrumb.toLowerCase()}`}>{breadcrumb.breadcrumb}</BreadcrumbLink>
                  <BreadcrumbSeparator className="mx-2">
                    <SlashIcon />
                  </BreadcrumbSeparator>
                </>

            }
          </BreadcrumbItem>


        ))}
      </Breadcrumb>
    </div>
  )
}
