import Link from 'next/link'


export function ScentCard({
  scent,
  width = "is-one-fifth",
}) {
  return (
    <div>
      <div className={`column ${width}`}>
        <header className="card-header">
          <p className="card-header-title">
            <Link href={`/scents/${scent.id}`}>{scent.title}</Link>
          </p>
        </header>
        <div className="card-content">
          <div className="content">{scent.description}</div>
        </div>
      </div>
    </div>
  );
}
