import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTooltip from "../Styled/BootstrapTooltip";
import ConfirmDialog from "../ConfirmDialog";
import { AppMessages } from "../../../data/app.constant";
import { IUser } from "../../../interfaces/user.interface";
import { IVehicle } from "../../../interfaces/vehicle.interface";

interface IProps {
  info: IUser | IVehicle;
  path: string;
  deleteConfirmMsg?: string;
  hideDetailsBtn?: boolean;
  hideEditBtn?: boolean;
  hideDeleteBtn?: boolean;
  onDelete?: (id: string) => void;
}

const GridActions = ({
  info,
  path,
  deleteConfirmMsg = AppMessages.DEFAULT_DELETE_CONFIRM,
  hideDetailsBtn = false,
  hideEditBtn = false,
  hideDeleteBtn = false,
  onDelete = (id) => {},
}: IProps) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onConfirmDialogClose = (result: boolean) => {
    setShowConfirm(false);
    if (result) {
      onDelete(info._id as string);
    }
  };

  return (
    <>
      {!hideDetailsBtn ? (
        <BootstrapTooltip title="Details">
          <IconButton color="secondary" onClick={() => navigate(`${path}/${info._id}`)}>
            <VisibilityTwoToneIcon />
          </IconButton>
        </BootstrapTooltip>
      ) : null}
      {!hideEditBtn ? (
        <BootstrapTooltip title="Edit">
          <IconButton color="primary" onClick={() => navigate(`${path}/${info._id}/edit`)}>
            <CreateTwoToneIcon />
          </IconButton>
        </BootstrapTooltip>
      ) : null}
      {!hideDeleteBtn ? (
        <BootstrapTooltip title="Delete">
          <IconButton color="error" onClick={() => setShowConfirm(true)}>
            <DeleteTwoToneIcon />
          </IconButton>
        </BootstrapTooltip>
      ) : null}
      {showConfirm ? <ConfirmDialog message={deleteConfirmMsg} onClose={onConfirmDialogClose} /> : null}
    </>
  );
};

export default GridActions;
