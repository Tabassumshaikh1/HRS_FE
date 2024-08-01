import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppMessages } from "../../../data/app.constant";
import { IVehicle } from "../../../interfaces/vehicle.interface";
import BootstrapTooltip from "../../../shared/components/BootstrapTooltip";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";

interface IProps {
  vehicle: IVehicle;
  onDelete: (id: string) => void;
}

const VehicleActions = ({ vehicle, onDelete }: IProps) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const onConfirmDialogClose = (result: boolean) => {
    setShowConfirm(false);
    if (result) {
      onDelete(vehicle._id as string);
    }
  };

  return (
    <>
      <BootstrapTooltip title="Details">
        <IconButton color="primary" onClick={() => navigate(`/vehicles/${vehicle._id}`)}>
          <VisibilityTwoToneIcon />
        </IconButton>
      </BootstrapTooltip>
      <BootstrapTooltip title="Edit">
        <IconButton color="secondary" onClick={() => navigate(`/vehicles/${vehicle._id}/edit`)}>
          <CreateTwoToneIcon />
        </IconButton>
      </BootstrapTooltip>
      <BootstrapTooltip title="Delete">
        <IconButton color="error" onClick={() => setShowConfirm(true)}>
          <DeleteTwoToneIcon />
        </IconButton>
      </BootstrapTooltip>
      {showConfirm ? <ConfirmDialog message={AppMessages.VEHICLE_DELETE_CONFIRM} onClose={onConfirmDialogClose} /> : null}
    </>
  );
};

export default VehicleActions;
