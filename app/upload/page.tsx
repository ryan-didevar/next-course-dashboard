"use client";
import React, { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
interface CloudinaryWidget {
  public_id: string;
  url: string;
}
const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId ? (
        <CldImage
          src={publicId}
          alt="Uploaded Image"
          width={100}
          height={100}
        />
      ) : (
        <></>
      )}
      <CldUploadWidget
        uploadPreset="v2rxbwyu"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
        }}
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryWidget;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
