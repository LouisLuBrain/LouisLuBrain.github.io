export function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center gap-4 items-center py-20">
      <p className="text-3xl font-semibold">Page not found</p>
      <a
        href="/"
        className="border-none text-blue-600 hover:text-blue-700 hover:underline"
      >
        Back to Home
      </a>
    </div>
  );
}
