"use client";

export function DeleteJobButton({
  action,
  jobTitle,
}: {
  action: (formData: FormData) => Promise<void>;
  jobTitle: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Excluir a vaga "${jobTitle}"? Esta ação não pode ser desfeita.`
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50"
      >
        Excluir
      </button>
    </form>
  );
}
