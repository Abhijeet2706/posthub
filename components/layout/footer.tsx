import Link from "next/link";

import { Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="sticky bottom-0 z-40 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between py-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PostHub. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://jsonplaceholder.typicode.com/guide/"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/Abhijeet2706"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primarytransition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://x.com/ABHIJEE22121366"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://www.instagram.com/abhijeetkumar_ak/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
