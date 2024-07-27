import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { Button } from "@mui/material";
import { ActivityStatus } from "../../data/app.constant";
import { IUser } from "../../interfaces/user.interface";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";

interface IProps {
  user: IUser;
  onClick: () => void;
}

const ActivateDeactivateStatus = ({ user, onClick }: IProps) => {
  return (
    <>
      {user?.status === ActivityStatus.ACTIVE ? (
        <BootstrapTooltip title="Deactivate Driver">
          <Button variant="outlined" color="error" onClick={onClick}>
            <BlockTwoToneIcon className="me-2" /> Deactivate
          </Button>
        </BootstrapTooltip>
      ) : (
        <BootstrapTooltip title="Activate Driver">
          <Button variant="outlined" color="success" onClick={onClick}>
            <DoneTwoToneIcon className="me-2" /> Activate
          </Button>
        </BootstrapTooltip>
      )}
    </>
  );
};

export default ActivateDeactivateStatus;
