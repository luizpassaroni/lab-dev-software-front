import type * as React from "react";

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

PaginationItem.displayName = "PaginationItem";

export { PaginationItem };
