import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../interfaces/user.interface";
import BootstrapTooltip from "../../../shared/components/BootstrapTooltip";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import { AppMessages } from "../../../data/app.constant";

interface IProps {
  driver: IUser;
  onDelete: (id: string) => void;
}

const DriverAction = ({ driver, onDelete }: IProps) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onConfirmDialogClose = (result: boolean) => {
    setShowConfirm(false);
    if (result) {
      onDelete(driver._id as string);
    }
  };

  return (
    <>
      <BootstrapTooltip title="Details">
        <IconButton color="primary" onClick={() => navigate(`/drivers/${driver._id}`)}>
          <VisibilityTwoToneIcon />
        </IconButton>
      </BootstrapTooltip>
      <BootstrapTooltip title="Edit">
        <IconButton color="secondary" onClick={() => navigate(`/drivers/${driver._id}/edit`)}>
          <CreateTwoToneIcon />
        </IconButton>
      </BootstrapTooltip>
      <BootstrapTooltip title="Delete">
        <IconButton color="error" onClick={() => setShowConfirm(true)}>
          <DeleteTwoToneIcon />
        </IconButton>
      </BootstrapTooltip>
      {showConfirm ? <ConfirmDialog message={AppMessages.DRIVER_DELETE_CONFIRM} onClose={onConfirmDialogClose} /> : null}
    </>
  );
};

export default DriverAction;
