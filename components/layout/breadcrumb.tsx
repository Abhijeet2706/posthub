import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
    active?: boolean;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Link
        href="/"
        className="flex items-center overflow-hidden text-foreground/60 hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          {item.active ? (
            <span className="font-medium text-foreground truncate">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="overflow-hidden text-foreground/60 hover:text-foreground transition-colors truncate"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}