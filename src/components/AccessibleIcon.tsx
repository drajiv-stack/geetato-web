import { LucideIcon } from "lucide-react"

interface AccessibleIconProps {
  icon: LucideIcon
  label: string
  className?: string
}

export default function AccessibleIcon({ icon: Icon, label, className = "w-5 h-5" }: AccessibleIconProps) {
  return (
    <>
      <Icon className={className} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </>
  )
}
