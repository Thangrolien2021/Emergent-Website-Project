import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";

export default function Dropzone({ files, onChange, accept }) {
  const onDrop = useCallback((accepted) => {
    const next = [...files, ...accepted.map((f) => Object.assign(f, { preview: URL.createObjectURL(f) }))];
    onChange(next);
  }, [files, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept || { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"], "image/avif": [".avif"], "image/gif": [".gif"] },
    multiple: true,
  });

  const remove = (i) => {
    const copy = files.slice();
    const [removed] = copy.splice(i, 1);
    if (removed?.preview) URL.revokeObjectURL(removed.preview);
    onChange(copy);
  };

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10" : "border-border bg-background hover:border-foreground/40"}`}
        data-testid="dropzone-area"
      >
        <input {...getInputProps()} data-testid="dropzone-input" />
        <UploadCloud className="mx-auto text-[hsl(var(--primary))]" size={36} />
        <p className="mt-3 text-sm font-bold uppercase tracking-widest text-foreground">
          {isDragActive ? "Drop files…" : "Drag & drop images here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">or click to browse · JPG / PNG / WebP / AVIF · up to 8 MB each</p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3" data-testid="dropzone-previews">
          {files.map((f, i) => (
            <div key={i} className="relative aspect-square bg-white rounded-sm overflow-hidden border border-border">
              <img src={f.preview || f.url} alt={f.name || "preview"} className="w-full h-full object-cover" />
              <button type="button" onClick={() => remove(i)} className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full hover:bg-[hsl(var(--primary))]" aria-label="Remove">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
