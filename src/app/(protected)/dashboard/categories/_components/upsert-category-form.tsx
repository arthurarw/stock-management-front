import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Category } from "@/interfaces/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { storeCategoryAction, updateCategoryAction } from "../actions";

interface UpsertUserFormProps {
  onSuccess?: () => void;
  category?: Category;
}

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
});

const UpsertCategoryForm = ({ category, onSuccess }: UpsertUserFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const form = new FormData();
    form.append("name", data.name);

    if (category) {
      form.append("id", String(category.id));
      const { success } = await updateCategoryAction(category.id, form);
      if (success === true) {
        toast.success("Categoria atualizada com sucesso!");
        onSuccess?.();
        router.push("/dashboard/categories");
      }

      return;
    }

    const { success } = await storeCategoryAction(form);
    if (success === true) {
      toast.success("Categoria salva com sucesso!");
      onSuccess?.();
      router.push("/dashboard/categories");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {category ? category.name : "Criar categoria"}
        </DialogTitle>
        <DialogDescription>
          {category
            ? "Edite as informações desta categoria."
            : "Crie uma nova categoria."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Nome da categoria:
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Nome da Categoria"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : category ? (
                "Salvar alterações"
              ) : (
                "Criar categoria"
              )}
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  );
};

export default UpsertCategoryForm;
