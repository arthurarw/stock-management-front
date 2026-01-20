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
import { getCategories } from "@/http/get-categories";
import StoreCategoryButton from "./_components/store-category-button";
import { categoriesTableColumns } from "./_components/table-columns";

const CategoriesPage = async () => {
  const categories = await getCategories();

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
        <DataTable data={categories} columns={categoriesTableColumns} />
      </PageContent>
    </PageContainer>
  );
};

export default CategoriesPage;
