export function Textarea({ id, label, placeholder }) {
  return (
    <div className="field">
      <label className="block text-medium font-medium text-gray-700 mb-2">{label}</label>
      <div className="control">
        <textarea
          id={id}
          rows={5}
          className="resize-none block w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder={placeholder}
        ></textarea>
      </div>
    </div>
  );
}
