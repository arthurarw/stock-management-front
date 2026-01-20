import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/interfaces/category";
import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCategoryAction } from "../actions";
import UpsertCategoryForm from "./upsert-category-form";

interface Props {
  category: Category;
}

const CategoriesTableActions = ({ category }: Props) => {
  const router = useRouter();

  const [openEditModal, setOpenEditModal] = useState(false);

  const deleteCategory = useAction(deleteCategoryAction, {
    onSuccess: () => {
      toast.success("Categoria removida com sucesso!");
      router.push("/dashboard/categories");
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao deletar a categoria. Tente novamente.");
    },
  });

  const handleDelete = (id: string) => {
    if (!id) return;
    deleteCategory.execute({ id });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenEditModal(true)}>
            <EditIcon />
            Editar
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <TrashIcon />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja deletar esse usuário?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser revertida. Isso irá deletar todos os
                  dados associados a ele.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(category.id)}>
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <UpsertCategoryForm
          category={category}
          onSuccess={() => setOpenEditModal(false)}
        />
      </Dialog>
    </>
  );
};

export default CategoriesTableActions;
