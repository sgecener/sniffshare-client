import Link from 'next/link';

export function ScentCard({ scent }) {

  console.log();
  return (
    <Link href={`/scents/${scent.id}`} className="flex flex-col md:flex-row md:items-stretch bg-white rounded-lg shadow-lg overflow-hidden mb-4 hover:bg-indigo-100 transition-colors duration-300">
      <div className="md:w-2/3 p-4">
        <header className="mb-2">
          <p className="text-lg font-semibold">
            <div>{scent.title}</div>
          </p>
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
  );
}