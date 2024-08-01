import styled from "@emotion/styled";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppMessages } from "../../../data/app.constant";
import { IVehicle } from "../../../interfaces/vehicle.interface";
import BootstrapTooltip from "../../../shared/components/BootstrapTooltip";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import VehicleSlider from "./VehicleSlider";
import VehicleStatus from "./VehicleStatus";
import { UtilService } from "../../../services/util.service";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  textAlign: "center",
}));

interface IProps {
  vehicle: IVehicle;
  onDelete: (id: string) => void;
}

const VehicleSingleCard = ({ vehicle, onDelete }: IProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const menuBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onConfirmDialogClose = (result: boolean) => {
    setShowConfirm(false);
    if (result) {
      onDelete(vehicle._id as string);
    }
  };

  return (
    <Item>
      <VehicleSlider vehicle={vehicle} />
      <div className="row pb-4">
        <div className="col-6 text-start ps-4 mt-4">
          <p className="detail-label">{vehicle.vehicleNumber}</p>
        </div>
        <div className="col-3 mt-4">
          <VehicleStatus vehicle={vehicle} verient="filled" />
        </div>
        <div className="col-3 text-end mt-3">
          <BootstrapTooltip title="Actions">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={menuBtnClick}
            >
              <MoreHorizTwoToneIcon htmlColor="black" />
            </IconButton>
          </BootstrapTooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            id="composition-menu"
            aria-labelledby="composition-button"
            className="card-action-menu"
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/vehicles/${vehicle._id}`);
              }}
            >
              <VisibilityTwoToneIcon color="primary" className="me-2" /> Details
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate(`/vehicles/${vehicle._id}/edit`);
              }}
            >
              <CreateTwoToneIcon color="secondary" className="me-2" />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                setShowConfirm(true);
              }}
            >
              <DeleteTwoToneIcon color="error" className="me-2" /> Delete
            </MenuItem>
          </Menu>
          {showConfirm ? <ConfirmDialog message={AppMessages.VEHICLE_DELETE_CONFIRM} onClose={onConfirmDialogClose} /> : null}
        </div>
        <div className="col-6 text-start ps-4 mt-2">
          <p className="card-detail-label">Capacity</p>
          <p className="card-detail-value">{vehicle.capacity}</p>
        </div>
        <div className="col-6 text-start ps-4 mt-2">
          <p className="card-detail-label">Vehicle Type</p>
          <p className="card-detail-value">{vehicle.vehicleType.name}</p>
        </div>
        <div className="col-6 text-start ps-4 mt-2">
          <p className="card-detail-label">Vehicle Company</p>
          <p className="card-detail-value">{vehicle.company}</p>
        </div>
        <div className="col-6 text-start ps-4 mt-2">
          <p className="card-detail-label">Created On</p>
          <p className="card-detail-value">{new UtilService().formatDate(vehicle.createdAt)}</p>
        </div>
      </div>
    </Item>
  );
};

export default VehicleSingleCard;
