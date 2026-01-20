"use server";

import { deleteCategory } from "@/http/delete-category";
import { storeCategory } from "@/http/store-category";
import { updateCategory } from "@/http/update-category";
import { actionClient } from "@/lib/safe-action";
import { AxiosError } from "axios";
import z from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
});

const updateCategorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "O nome é obrigatório"),
});

const deleteCategorySchema = z.object({
  id: z.uuid(),
});

export type StoreCategorySchema = z.infer<typeof categorySchema>;

export async function storeCategoryAction(data: FormData) {
  const result = categorySchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name } = result.data

  try {
    await storeCategory(name)
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = err.response?.data.error || 'An error occurred while saving the category.';

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the category.',
    errors: null,
  }
}

export async function updateCategoryAction(id: string, data: FormData) {
  const result = updateCategorySchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name } = result.data

  try {
    await updateCategory(id, name)
  } catch (err) {
    if (err instanceof AxiosError) {
      const { message } = err.response?.data.error || 'An error occurred while saving the category.';

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the category.',
    errors: null,
  }
}



export const deleteCategoryAction = actionClient.inputSchema(deleteCategorySchema).action(async ({ parsedInput }) => {
  const { id } = parsedInput;

  try {
    await deleteCategory(id);
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err;
    }

    console.error(err);
    throw new Error('Unexpected error, try again in a few minutes.');
  }
});
