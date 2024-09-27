import { useState } from "react";

let image = "";
export function ImageUploadForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      image = preview;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Image Preview Circle */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </div>
        )}
      </div>

      {/* Edit Button */}
      <label
        htmlFor="imageUpload"
        className="cursor-pointer flex items-center text-blue-500 hover:text-blue-700"
      >
        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm5.707 5.293a1 1 0 010 1.414L14.414 12 12 9.586l3.293-3.293a1 1 0 011.414 0zm-4 4L9.293 15H8v-1.293l4.414-4.414L14 10.586zm-6 6.414a1 1 0 01-.707-.293l-1-1A1 1 0 016 15h2v2a1 1 0 01-1 1z"></path>
        </svg>
        Edit
      </label>
      {/* Hidden File Input */}
      <input
        type="file"
        id="imageUpload"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button
        onClick={() => {
          setImagePreview(null);
        }}
        className="text-sm text-red-600"
        type="button"
      >
        Delete
      </button>
    </div>
  );
}

export default image;
