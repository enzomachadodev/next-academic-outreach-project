import { CircleCheck, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

interface FormStatusProps {
  type: "error" | "success";
  message: string;
}

export const FormStatus = ({ type, message }: FormStatusProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2 rounded-md p-3 text-sm",
        type === "error"
          ? "bg-destructive/15 text-destructive"
          : "bg-emerald-500/15 text-emerald-500",
      )}
    >
      {type === "error" ? <TriangleAlert /> : <CircleCheck />}
      <p>{message}</p>
    </div>
  );
};
