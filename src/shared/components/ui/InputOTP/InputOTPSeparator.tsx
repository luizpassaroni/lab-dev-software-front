"use client";

import { MinusIcon } from "@radix-ui/react-icons";
import * as React from "react";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} {...props}>
    <MinusIcon />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTPSeparator };
