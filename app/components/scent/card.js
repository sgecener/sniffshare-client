import Link from 'next/link';

export function ScentCard({ scent }) {
  return (
    <Link href={`/scents/${scent.id}`} className="flex flex-col md:flex-row md:items-stretch bg-white rounded-lg shadow-lg overflow-hidden mb-4 hover:bg-indigo-100 transition-colors duration-300">
      <div className="md:w-2/3 p-4">
        <header className="mb-2">
          <p className="text-lg font-semibold">
            <div>{scent.title}</div>
          </p>
        </header>
        <div className="mb-4">{scent.description}</div>
        {/* Additional details or actions */}
      </div>
    </Link>
  );
}