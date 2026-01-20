export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  productCount?: number;
}

export type GetCategoriesParams = {
  includeProductCount?: boolean
  offset?: number
  limit?: number
}
