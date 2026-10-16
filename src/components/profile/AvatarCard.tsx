"use client";

import { useRef, type ChangeEvent } from "react";
import { Camera, LoaderCircle, UserRound } from "lucide-react";

type AvatarCardProps = {
  avatarUrl?: string | null;
  uploading: boolean;
  onUpload: (file: File) => void;
};

export default function AvatarCard({
  avatarUrl,
  uploading,
  onUpload,
}: AvatarCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (file) {
      onUpload(file);
    }

    input.value = "";
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-4 ring-slate-50">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Ảnh đại diện"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserRound className="h-12 w-12 text-slate-400" />
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-slate-900">Ảnh đại diện</h2>

          <p className="mt-1 text-sm text-slate-500">
            Chọn ảnh đại diện mới. Dung lượng tối đa 5 MB.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}

            {uploading ? "Đang upload..." : "Đổi ảnh đại diện"}
          </button>
        </div>
      </div>
    </section>
  );
}
