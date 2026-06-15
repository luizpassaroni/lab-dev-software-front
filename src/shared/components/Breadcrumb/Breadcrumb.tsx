import type * as React from "react";

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
