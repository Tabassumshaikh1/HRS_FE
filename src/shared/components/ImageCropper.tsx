import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { UtilService } from "../../services/util.service";

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
  const utilSvc = new UtilService();

  useEffect(() => {
    return () => {
      const processFile = async () => {
        const src = await utilSvc.convertFileToBase64(props.file as File);
        setImgSrc(src);
      };
      processFile();
    };
  }, []);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedFile: Blob = utilSvc.convertBase64ToBlob(cropper?.getCroppedCanvas().toDataURL() as string);
    props.onCrop(croppedFile);
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
