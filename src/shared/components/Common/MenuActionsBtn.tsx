import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppMessages } from "../../../data/app.constant";
import { IUser } from "../../../interfaces/user.interface";
import { IVehicle } from "../../../interfaces/vehicle.interface";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import BootstrapTooltip from "../../../shared/components/Styled/BootstrapTooltip";

interface IProps {
  info: IUser | IVehicle;
  path: string;
  deleteConfirmMsg?: string;
  hideDetailsBtn?: boolean;
  hideEditBtn?: boolean;
  hideDeleteBtn?: boolean;
  onDelete?: (id: string) => void;
}

const MenuActionsBtn = ({
  info,
  path,
  deleteConfirmMsg = AppMessages.DEFAULT_DELETE_CONFIRM,
  hideDetailsBtn = false,
  hideEditBtn = false,
  hideDeleteBtn = false,
  onDelete = (id) => {},
}: IProps) => {
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
      onDelete(info._id as string);
    }
  };

  return (
    <>
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
        {!hideDetailsBtn ? (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate(`${path}/${info._id}`);
            }}
          >
            <VisibilityTwoToneIcon color="primary" className="me-2" /> Details
          </MenuItem>
        ) : null}
        {!hideEditBtn ? (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate(`${path}/${info._id}/edit`);
            }}
          >
            <CreateTwoToneIcon color="secondary" className="me-2" />
            Edit
          </MenuItem>
        ) : null}
        {!hideDeleteBtn ? (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              setShowConfirm(true);
            }}
          >
            <DeleteTwoToneIcon color="error" className="me-2" /> Delete
          </MenuItem>
        ) : null}
      </Menu>
      {showConfirm ? <ConfirmDialog message={deleteConfirmMsg} onClose={onConfirmDialogClose} /> : null}
    </>
  );
};

export default MenuActionsBtn;
