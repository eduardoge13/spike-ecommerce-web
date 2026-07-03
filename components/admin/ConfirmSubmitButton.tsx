'use client';

interface ConfirmSubmitButtonProps {
  confirmMessage: string;
  className: string;
  children: React.ReactNode;
}

export default function ConfirmSubmitButton({
  confirmMessage,
  className,
  children,
}: ConfirmSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
