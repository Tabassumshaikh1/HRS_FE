import styled from "@emotion/styled";
import CallTwoToneIcon from "@mui/icons-material/CallTwoTone";
import ChatBubbleTwoToneIcon from "@mui/icons-material/ChatBubbleTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../interfaces/user.interface";
import { UtilService } from "../../../services/util.service";
import BootstrapTooltip from "../../../shared/components/BootstrapTooltip";
import CustomerImage from "./CustomerImage";
import CustomerStatus from "./CustomerStatus";
import { MaterialColorsCode300 } from "../../../data/color.constant";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  textAlign: "center",
}));

interface IProps {
  customer: IUser;
}

const CustomerSingleCard = ({ customer }: IProps) => {
  const navigate = useNavigate();
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setBackgroundColor(
      `linear-gradient(0deg, #FFFFFF 62%, ${
        MaterialColorsCode300[new UtilService().getRandomNumber(0, MaterialColorsCode300.length - 1)]
      } 40%)`
    );
  }, []);

  const menuBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Item
      style={{
        background: backgroundColor,
      }}
    >
      <div className="row pb-4">
        <div className="col-12 text-end mt-2 me-2">
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
                navigate(`/customers/${customer._id}`);
              }}
            >
              <VisibilityTwoToneIcon color="primary" className="me-2" /> Details
            </MenuItem>
          </Menu>
        </div>
        <div className="col-12 align-center">
          <CustomerImage imageUrl={customer.imageUrl} height={100} width={100} />
        </div>
        <div className="col-12 align-center my-2">
          <p className="detail-label">{customer.name}</p>
        </div>
        <div className="col-12 align-center mb-2">
          <CustomerStatus customer={customer} verient="filled" />
        </div>
        <div className="col-12 align-center">
          <BootstrapTooltip title="Call">
            <a href={`tel:${customer.contactNumber}`} className="me-3">
              <CallTwoToneIcon color="primary" />
            </a>
          </BootstrapTooltip>
          <BootstrapTooltip title="Message">
            <a href={`sms:${customer.contactNumber}`} className="me-3">
              <ChatBubbleTwoToneIcon color="info" />
            </a>
          </BootstrapTooltip>
          <BootstrapTooltip title="Email">
            <a href={`mailto:${customer.email}`}>
              <EmailTwoToneIcon color="secondary" />
            </a>
          </BootstrapTooltip>
        </div>
      </div>
    </Item>
  );
};

export default CustomerSingleCard;
