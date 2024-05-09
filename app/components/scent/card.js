import Link from 'next/link';

export function ScentCard({ scent, className }) {
  return (
    <div className={`card ${className} flex flex-col md:flex-row md:items-stretch bg-white rounded-lg shadow-lg overflow-hidden mb-1 hover:bg-indigo-100 transition-colors duration-300`}>
      <Link href={`/scents/${scent.id}`}>
        <div className="md:w-2/3 p-4">
          <header className="mb-2">
            <p className="text-lg font-semibold">{scent.title}</p>
            <div className="flex flex-wrap text-xs">
              {scent.tags.map((tag) => (
                <span key={tag.id} className="bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2">
                  {tag.name}
                </span>
              ))}
            </div>
          </header>
          <div className="mb-4">{scent.description}</div>
          {/* Additional details or actions */}
        </div>
      </Link>
    </div>
  );
}