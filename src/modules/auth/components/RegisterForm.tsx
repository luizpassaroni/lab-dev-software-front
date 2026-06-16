"use client";

import { Alert, AlertDescription } from "@shared/components/ui/Alert";
import { Button } from "@shared/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@shared/components/ui/Field";
import { Input } from "@shared/components/ui/Input";
import { Spinner } from "@shared/components/ui/Spinner";
import { useForm } from "@tanstack/react-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegister } from "@/modules/auth/hooks/use-register";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  registerSchema,
} from "@/modules/auth/schemas/registerSchema";

export function RegisterForm() {
  const router = useRouter();
  const register = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    onSubmit: ({ value }) => {
      register.mutate(value, {
        onSuccess: () => router.push("/login?just_registered=1"),
      });
    },
  });

  // Server errors clear as soon as the user edits any field.
  const clearServerError = () => {
    if (register.isError) {
      register.reset();
    }
  };

  // 409 is shown inline under the email; everything else is a generic banner.
  const emailTaken = register.error?.status === 409;
  const genericError =
    register.isError && !emailTaken
      ? (register.error?.message ??
        "Não foi possível concluir o cadastro agora. Tente novamente.")
      : null;

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      {genericError ? (
        <Alert variant="destructive">
          <AlertDescription>{genericError}</AlertDescription>
        </Alert>
      ) : null}

      <form.Field
        name="name"
        validators={{ onChange: nameSchema }}
        listeners={{ onChange: clearServerError }}
      >
        {(field) => {
          const invalid =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;
          return (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                autoComplete="name"
                placeholder="Como devemos te chamar?"
                aria-invalid={invalid}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              {invalid ? <FieldError errors={field.state.meta.errors} /> : null}
            </Field>
          );
        }}
      </form.Field>

      <form.Field
        name="email"
        validators={{ onChange: emailSchema }}
        listeners={{ onChange: clearServerError }}
      >
        {(field) => {
          const invalid =
            (field.state.meta.isTouched &&
              field.state.meta.errors.length > 0) ||
            emailTaken;
          return (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                inputMode="email"
                value={field.state.value}
                autoComplete="email"
                placeholder="voce@email.com"
                aria-invalid={invalid}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 ? (
                <FieldError errors={field.state.meta.errors} />
              ) : null}
              {emailTaken ? (
                <p role="alert" className="text-destructive text-sm">
                  Este email já está cadastrado.{" "}
                  <Link
                    href="/login"
                    className="font-medium underline underline-offset-4"
                  >
                    Fazer login →
                  </Link>
                </p>
              ) : null}
            </Field>
          );
        }}
      </form.Field>

      <form.Field
        name="password"
        validators={{ onChange: passwordSchema }}
        listeners={{ onChange: clearServerError }}
      >
        {(field) => {
          const invalid =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;
          return (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  value={field.state.value}
                  autoComplete="new-password"
                  placeholder="Mínimo de 8 caracteres"
                  aria-invalid={invalid}
                  className="pr-10"
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
              {invalid ? <FieldError errors={field.state.meta.errors} /> : null}
            </Field>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => registerSchema.safeParse(state.values).success}
      >
        {(isValid) => (
          <Button
            type="submit"
            className="mt-2 w-full"
            disabled={!isValid || register.isPending}
          >
            {register.isPending ? (
              <>
                <Spinner />
                Criando conta...
              </>
            ) : (
              "Criar conta"
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
