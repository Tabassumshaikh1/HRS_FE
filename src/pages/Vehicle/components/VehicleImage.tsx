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
  height?: string;
  hideDeleteBtn?: boolean;
  onDelete?: () => void;
}

const VehicleImage = ({ imageUrl, height = "", hideDeleteBtn = false, onDelete }: IProps) => {
  const utilSvc = new UtilService();

  return (
    <>
      {imageUrl ? (
        <Item
          className="vehicle-image-card"
          style={{
            height: height ? height : `${utilSvc.isMobile() ? "140px" : "120px"}`,
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          {!hideDeleteBtn ? (
            <div className="row">
              <div className="col-12 text-end">
                <BootstrapTooltip title="Delete" onClick={onDelete}>
                  <DeleteOutlineTwoToneIcon color="error" className="vehicle-image-card-delete-btn" />
                </BootstrapTooltip>
              </div>
            </div>
          ) : null}
        </Item>
      ) : (
        <Item
          className="vehicle-image-card"
          style={{
            height: height ? height : `${utilSvc.isMobile() ? "140px" : "120px"}`,
            backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/UI%2Fdefault-vehicle.png?alt=media&token=25332901-9ff1-4c8e-a691-9f8ee97f5afd)`,
          }}
        ></Item>
      )}
    </>
  );
};

export default VehicleImage;
