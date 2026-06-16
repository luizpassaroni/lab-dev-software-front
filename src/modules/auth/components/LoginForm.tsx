"use client";

import { Alert, AlertDescription } from "@shared/components/ui/Alert";
import { Button } from "@shared/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@shared/components/ui/Field";
import { Input } from "@shared/components/ui/Input";
import { Spinner } from "@shared/components/ui/Spinner";
import { useForm } from "@tanstack/react-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/modules/auth/hooks/use-login";
import {
  loginEmailSchema,
  loginPasswordSchema,
  loginSchema,
} from "@/modules/auth/schemas/loginSchema";

function errorFor(status: number | undefined): {
  message: string;
  retry: boolean;
} {
  if (status === 401) {
    return { message: "Email ou senha inválidos.", retry: false };
  }
  if (status === 429) {
    return {
      message: "Muitas tentativas, aguarde alguns minutos.",
      retry: false,
    };
  }
  return {
    message: "Não foi possível entrar agora. Tente novamente.",
    retry: true,
  };
}

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: ({ value }) => {
      login.mutate(value, {
        onSuccess: () => {
          // Session is in the cookie now; refresh re-renders the Header (getMe).
          router.push("/");
          router.refresh();
        },
      });
    },
  });

  const clearServerError = () => {
    if (login.isError) {
      login.reset();
    }
  };

  const banner = login.isError ? errorFor(login.error?.status) : null;

  return (
    <form
      noValidate
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      {banner ? (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between gap-3">
            <span>{banner.message}</span>
            {banner.retry ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={login.isPending}
                onClick={() => form.handleSubmit()}
              >
                Tentar de novo
              </Button>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : null}

      <form.Field
        name="email"
        validators={{ onChange: loginEmailSchema }}
        listeners={{ onChange: clearServerError }}
      >
        {(field) => {
          const invalid =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;
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
              {invalid ? <FieldError errors={field.state.meta.errors} /> : null}
            </Field>
          );
        }}
      </form.Field>

      <form.Field
        name="password"
        validators={{ onChange: loginPasswordSchema }}
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
                  autoComplete="current-password"
                  placeholder="Sua senha"
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
        selector={(state) => loginSchema.safeParse(state.values).success}
      >
        {(isValid) => (
          <Button
            type="submit"
            className="mt-2 w-full"
            disabled={!isValid || login.isPending}
          >
            {login.isPending ? (
              <>
                <Spinner />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
