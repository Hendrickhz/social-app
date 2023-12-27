import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 5 * 1024 * 1024; //5MB;

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        return showToast(
          "Error",
          "Please select an image size less than 2MB",
          "error"
        );
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      return showToast("Error", "Please select an image file", "error");
    }
  };
  return { selectedImg, handleImg, setSelectedImg };
};

export default usePreviewImg;
