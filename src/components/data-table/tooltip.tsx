import type { ReactNode } from "react";
import type * as TooltipPrimitive from "@radix-ui/react-tooltip";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

interface classNames {
  TooltipContent?: string;
}
interface TooltipComponentProps extends TooltipPrimitive.TooltipProps {
  children: ReactNode;
  message: string | ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  classNames?: classNames;
}

export const TooltipComponent: React.FC<TooltipComponentProps> = ({
  children,
  side,
  message,
  classNames,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn("", classNames?.TooltipContent)}
        >
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
