"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { useCategories } from "@/hooks/use-categories";
import { useState } from "react";
import StoreCategoryButton from "./_components/store-category-button";
import { categoriesTableColumns } from "./_components/table-columns";

const CategoriesPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useCategories({
    includeProductCount: true,
    offset: pageIndex * pageSize,
    limit: pageSize,
  });

  const breadcrumbs = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Categorias</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <PageContainer breadcrumb={breadcrumbs}>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Categorias</PageTitle>
          <PageDescription>
            Gerencie as categorias dos seus produtos aqui.
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <StoreCategoryButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        {isLoading && <div>Carregando...</div>}
        {!isLoading && data && (
          <DataTable
            data={data}
            columns={categoriesTableColumns}
            pageIndex={pageIndex}
            pageSize={pageSize}
            hasMore={data.length === pageSize}
            onPageChange={setPageIndex}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPageIndex(0);
            }}
          />
        )}
      </PageContent>
    </PageContainer>
  );
};

export default CategoriesPage;
