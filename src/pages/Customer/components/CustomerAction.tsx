import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../interfaces/user.interface";
import BootstrapTooltip from "../../../shared/components/BootstrapTooltip";

interface IProps {
  customer: IUser;
}

const CustomerAction = ({ customer }: IProps) => {
  const navigate = useNavigate();
  return (
    <>
      <BootstrapTooltip title="Details">
        <IconButton color="primary" onClick={() => navigate(`/customers/${customer._id}`)}>
          <VisibilityTwoToneIcon />
        </IconButton>
      </BootstrapTooltip>
    </>
  );
};

export default CustomerAction;
