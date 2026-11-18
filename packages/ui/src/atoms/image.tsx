import { cva, type VariantProps } from "class-variance-authority";
import { ImageIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";
import { Spinner } from "./spinner";

const imageFrameVariants = cva(
  "relative flex items-center justify-center overflow-hidden rounded-md border border-border bg-muted text-muted-foreground",
  {
    variants: {
      ratio: {
        "1:1": "aspect-square",
        "4:3": "aspect-[4/3]",
        "16:9": "aspect-video",
        "3:4": "aspect-[3/4]",
      },
      state: {
        loaded: "",
        empty: "",
        loading: "",
        error: "border-destructive/40 bg-destructive/5 text-destructive",
        overlay: "",
      },
    },
    defaultVariants: {
      ratio: "1:1",
      state: "loaded",
    },
  },
);

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "children">,
    VariantProps<typeof imageFrameVariants> {
  state?: "loaded" | "empty" | "loading" | "error" | "overlay";
  overlay?: React.ReactNode;
}

/**
 * Media frame with empty/loading/error/overlay states (Tour Image).
 */
export function Image({
  className,
  ratio,
  state = "loaded",
  overlay,
  alt = "",
  src,
  ...props
}: ImageProps) {
  const showImg = state === "loaded" || state === "overlay";
  return (
    <div className={cn(imageFrameVariants({ ratio, state, className }))}>
      {showImg && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" {...props} />
      ) : null}
      {state === "empty" ? <ImageIcon className="h-6 w-6" aria-hidden /> : null}
      {state === "loading" ? <Spinner className="h-6 w-6" /> : null}
      {state === "error" ? <span className="text-ui-xs font-medium">Failed</span> : null}
      {state === "overlay" || overlay ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-ui-xs text-white">
          {overlay ?? null}
        </div>
      ) : null}
    </div>
  );
}

export { imageFrameVariants };
