export function Select({ id, refEl, options, title, label, addlClass = "", onChange }) {
  return (
    <div className="field is-expanded">
      {label ? <label className="block text-medium font-medium text-gray-700 mb-2">{label}</label> : <></>}
      <div className={`relative ${addlClass}`}>
        <select
          id={id}
          ref={refEl}
          onChange={onChange}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="0">{title}</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 12.95a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L10 10.086l3.293-3.75a1 1 0 1 1 1.414 1.414l-4 4z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
