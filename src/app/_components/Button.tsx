interface ButtonProps {
  children?: React.ReactNode
  onClick?: any
  className?: string
  text?: string
  type?: "submit" | "reset" | "button"
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  text = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      onClick={onClick}
    >
      {children || text}
    </button>
  )
}
