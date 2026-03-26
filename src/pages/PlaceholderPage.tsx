export function PlaceholderPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-8 shadow-soft">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-text">
        {title}
      </h1>
      <p className="max-w-xl text-text-muted">{description}</p>
    </div>
  )
}
