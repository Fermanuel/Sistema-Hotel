import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success: 
          "bg-green-500 text-white shadow hover:bg-green-600", // Variante verde
        default: 
          "bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: 
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: 
          "bg-red-500 text-white shadow hover:bg-red-600", // Variante destructiva en rojo
        outline: 
          "border border-border text-foreground hover:bg-muted/10", // Variante de borde
        info: 
          "bg-cyan-500 text-white shadow hover:bg-cyan-600", // Variante de información en cyan
        warning: 
          "bg-yellow-500 text-white shadow hover:bg-yellow-600", // Variante de advertencia en amarillo
        neutral: 
          "bg-gray-500 text-white shadow hover:bg-gray-600", // Variante neutral en gris
        light: 
          "bg-white text-black shadow hover:bg-gray-100", // Variante clara (blanca)
        dark: 
          "bg-black text-white shadow hover:bg-gray-900", // Variante oscura (negra)
      },      
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
