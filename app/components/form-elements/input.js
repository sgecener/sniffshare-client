export function Input({ id, type="text", placeholder="", refEl=undefined, label=undefined, handleTagInputChange, addlClass="", children }) {
  return (
    <div className={`field ${addlClass}`}>
      {label && <label className="block text-medium font-medium text-gray-700 mb-2">{label}</label>}
      <div className="control">
        <input
          id={id}
          placeholder={placeholder}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type={type}
          ref={refEl}
          onChange={handleTagInputChange}
        />
      </div>
      {children}
    </div>
  )
}