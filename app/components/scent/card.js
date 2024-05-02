import Link from 'next/link'


export function ScentCard({
  scent,
  removeScent,
  isOwner = false,
  width = "is-one-fifth",
}) {
  return (
    <div>
      <div className={`column ${width}`}>
        <header className="card-header">
          <p className="card-header-title">
            <Link href={`/scent_posts/${scent.id}`}>{scent.title}</Link>
          </p>
        </header>
        <div className="card-content">
          <div className="content">{scent.description}</div>
        </div>
        
        {isOwner ? (
          <footer className="card-footer">
            <Link href={`/scent_posts/${scent.id}/edit`}>
              Edit
            </Link>
            <button
              onClick={() => removeScent(scent.id)}
              className="card-footer-item"
            >
              Delete
            </button>
          </footer>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
