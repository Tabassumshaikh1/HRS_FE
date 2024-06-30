import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Cropper, { ReactCropperElement } from "react-cropper";
import CircularProgress from "@mui/material/CircularProgress";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface ImageCropperProps {
  file: File | string;
  onCrop: (file: Blob | null) => void;
}

const ImageCropper = (props: ImageCropperProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.file as File);
    reader.onload = () => {
      setImgSrc(reader.result as string);
    };
  }, []);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedFile: Blob = convertBase64ToBlob(cropper?.getCroppedCanvas().toDataURL() as string);
    props.onCrop(croppedFile);
  };

  const convertBase64ToBlob = (base64Image: string) => {
    // Split into two parts
    const parts = base64Image.split(";base64,");

    // Hold the content type
    const imageType = parts[0].split(":")[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  };

  return (
    <BootstrapDialog
      disableEscapeKeyDown={true}
      maxWidth={"md"}
      className={"image-cropper-dialog-wrapper"}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Crop Image
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => props.onCrop(null)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {imgSrc ? (
          <Cropper src={imgSrc} style={{ height: "100%", width: "100%" }} aspectRatio={1 / 1} guides={false} ref={cropperRef} />
        ) : (
          <div className="image-cropper-loader">
            <CircularProgress color="inherit" />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onCrop(null)} className="text-blueviolet">
          Cancel
        </Button>
        <Button autoFocus variant="contained" className="submit-btn" onClick={onCrop}>
          Crop
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ImageCropper;
