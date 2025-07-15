"use client"

import { forwardRef } from "react"
import Link from "next/link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  href?: string
  isExternal?: boolean
  isLoading?: boolean
  className?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      href,
      isExternal = false,
      isLoading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClassName = "btn transition-transform active:scale-95 hover:scale-102"
    
    const variantClassName = {
      primary: "btn-primary",
      outline: "btn-outline",
      ghost: "hover:bg-muted",
    }
    
    const sizeClassName = {
      sm: "text-xs px-3 py-2",
      md: "text-sm px-5 py-3",
      lg: "text-base px-6 py-4",
    }
    
    const buttonClass = `${baseClassName} ${variantClassName[variant]} ${sizeClassName[size]} ${className}`
    
    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {icon && iconPosition === "left" && !isLoading && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </>
    )
    
    if (href) {
      return isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={buttonClass}>
          {content}
        </Link>
      )
    }
    
    return (
      <button
        ref={ref}
        className={buttonClass}
        disabled={isLoading}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
