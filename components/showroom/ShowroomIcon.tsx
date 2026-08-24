import type { ReactNode } from 'react';

interface ShowroomIconProps {
  name: string;
  className?: string;
}

export default function ShowroomIcon({ name, className = 'h-5 w-5' }: ShowroomIconProps) {
  const paths: Record<string, ReactNode> = {
    shield: <path d="M12 3 5 6v5c0 4.7 2.8 8.1 7 10 4.2-1.9 7-5.3 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
    truck: <path d="M3 6h11v10H3V6Zm11 4h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
    lock: <path d="M7 10V8a5 5 0 0 1 10 0v2m-11 0h12a2 2 0 0 1 2 2v7H4v-7a2 2 0 0 1 2-2Z" />,
    spark: <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Zm6 10 .7 2.3L21 16l-2.3.7L18 19l-.7-2.3L15 16l2.3-.7L18 13ZM5 14l.9 2.9L9 18l-3.1 1.1L5 22l-.9-2.9L1 18l3.1-1.1L5 14Z" />,
    card: <path d="M3 6h18v12H3V6Zm0 4h18M7 15h3" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    whatsapp: <path d="M20 11.6a8 8 0 0 1-11.8 7L3 20l1.4-5A8 8 0 1 1 20 11.6Zm-11-4c.2-.4.4-.4.7-.4h.5c.2 0 .3 0 .4.3l.8 2c.1.2 0 .4-.1.6l-.6.8c-.2.2-.1.4 0 .6.5.9 1.3 1.7 2.2 2.2.2.1.4.2.6 0l.9-1c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.4 0 .3-.1 1.3-.7 1.8-.5.5-1.3.8-2.2.6-1-.2-2.7-.8-4.5-2.5-1.4-1.3-2.4-3-2.7-4.1-.3-1 .1-1.7.5-2.1.4-.4.9-.6 1.4-.6Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    cube: <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5M12 12v9" />,
  };

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
