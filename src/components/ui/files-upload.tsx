"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface FilesUploadProps {
  onUpload: (files: File[]) => void;
  initialFiles?: File[];
}

export const FilesUpload = ({ onUpload, initialFiles }: FilesUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleDelete = (file: File) => {
    if (initialFiles) {
      onUpload(initialFiles.filter((f) => f !== file));
    }
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, open } =
    useDropzone({
      onDrop: (acceptedFiles) => {
    
        onUpload(acceptedFiles);
      },
    });

  return (
    <div className="flex flex-col items-center mt-4 space-y-4">
      <div
        {...getRootProps()}
        className={`p-8 border-dashed border-2 ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        } rounded-md cursor-pointer transition-colors duration-200`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Arrastra y suelta las imágenes aquí, o haz clic para seleccionarlas.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Imágenes seleccionadas:</h3>
        <div className="grid grid-cols-3 gap-4">
          {initialFiles?.map((file) => (
            <div key={file.name} className="relative h-20">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-full w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleDelete(file)}
                className="absolute right-0 top-0 bg-red-500 text-white rounded-bl-md"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
