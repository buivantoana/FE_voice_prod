import React, { useState } from "react";
import DocumentView from "./DocumentView";

type Props = {
  setFile: any;
  file: any;
};

const DocumentController = ({ setFile, file }: Props) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]); // Lấy file đầu tiên
    }
  };

  const handleFileRemove = () => {
    setFile(null); // Xóa file đã chọn
  };
  return (
    <DocumentView
      file={file}
      handleFileChange={handleFileChange}
      handleFileRemove={handleFileRemove}
    />
  );
};

export default DocumentController;
