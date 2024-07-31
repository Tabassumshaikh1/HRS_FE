import styled from "@emotion/styled";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import Paper from "@mui/material/Paper";
import BootstrapTooltip from "../../../shared/components/BootstrapTooltip";
import { UtilService } from "../../../services/util.service";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  textAlign: "center",
}));

interface IProps {
  imageUrl: string;
  onDelete: () => void;
}

const VehicleImage = ({ imageUrl, onDelete }: IProps) => {
  const utilSvc = new UtilService();
  return (
    <Item
      className="vehicle-image-card"
      style={{
        height: `${utilSvc.isMobile() ? "140px" : "120px"}`,
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="row">
        <div className="col-12 text-end">
          <BootstrapTooltip title="Delete" onClick={onDelete}>
            <DeleteOutlineTwoToneIcon color="error" className="vehicle-image-card-delete-btn" />
          </BootstrapTooltip>
        </div>
      </div>
    </Item>
  );
};

export default VehicleImage;
