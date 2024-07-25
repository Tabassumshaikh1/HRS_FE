import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import CallTwoToneIcon from "@mui/icons-material/CallTwoTone";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ActivityStatus, DateFormats, StatusColors } from "../../data/app.constant";
import { IUser } from "../../interfaces/user.interface";
import { AppNotificationService } from "../../services/app-notification.service";
import { DriverService } from "../../services/driver.service";
import { UtilService } from "../../services/util.service";
import BackButton from "../../shared/components/BackButton";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import DriverImage from "./components/DriverImage";

const DriverDetails = () => {
  const [driver, setDriver] = useState<IUser | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const notifySvc = new AppNotificationService();
  const driverSvc = new DriverService();
  const utilSvc = new UtilService();

  useEffect(() => {
    loadDriver();
  }, []);

  const loadDriver = async () => {
    try {
      utilSvc.showLoader();
      const response = await driverSvc.getSingleDriver(id as string);
      setDriver(response);
    } catch (error) {
      notifySvc.showError(error);
    } finally {
      utilSvc.hideLoader();
    }
  };

  const updateStatus = async () => {
    try {
      utilSvc.showLoader();
      const payload = {
        status: driver?.status === ActivityStatus.ACTIVE ? ActivityStatus.INACTIVE : ActivityStatus.ACTIVE,
      };
      await driverSvc.updateDriverStatus(id as string, payload);
      loadDriver();
    } catch (error) {
      notifySvc.showError(error);
    } finally {
      utilSvc.hideLoader();
    }
  };

  return (
    <div className="content-wrapper">
      <div className="row mb-4">
        <div className="col-6">
          <BackButton />
        </div>
        <div className="col-6 text-end">
          <Button variant="outlined" color="secondary" startIcon={<CreateTwoToneIcon />} onClick={() => navigate(`/drivers/${id}/edit`)}>
            Edit Driver
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader title="Driver Details" className="card-heading"></CardHeader>
        <Divider />
        {driver?._id ? (
          <CardContent>
            <div className="row px-4">
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-12 align-center border rounded p-4"
                style={{
                  background: `linear-gradient(0deg, #FFFFFF 45%, ${
                    driver.status === ActivityStatus.ACTIVE ? StatusColors.ACTIVE : StatusColors.INACTIVE
                  } 83%)`,
                }}
              >
                <div className="row">
                  <div className="col-12 align-center mb-4">
                    <DriverImage imageUrl={driver.imageUrl} height={220} width={220} />
                  </div>
                  <div className="col-12 align-center">
                    <BootstrapTooltip title="Call">
                      <a href={`tel:${driver.contactNumber}`}>
                        <Button variant="outlined" color="primary">
                          <CallTwoToneIcon />
                        </Button>
                      </a>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="Email">
                      <a href={`mailto:${driver.email}`}>
                        <Button variant="outlined" color="secondary" className="mx-3">
                          <EmailTwoToneIcon />
                        </Button>
                      </a>
                    </BootstrapTooltip>
                    {driver.status === ActivityStatus.ACTIVE ? (
                      <BootstrapTooltip title="Deactivate Driver">
                        <Button variant="outlined" color="error" onClick={updateStatus}>
                          <BlockTwoToneIcon className="me-2" /> Deactivate
                        </Button>
                      </BootstrapTooltip>
                    ) : (
                      <BootstrapTooltip title="Activate Driver">
                        <Button variant="outlined" color="success" onClick={updateStatus}>
                          <DoneTwoToneIcon className="me-2" /> Activate
                        </Button>
                      </BootstrapTooltip>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-6 col-sm-12 col-12 mt-4">
                <div className="row ms-4">
                  <div className="col-6 mb-4">
                    <p className="detail-label">Name</p>
                    <p className="detail-value">{driver.name}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Email</p>
                    <p className="detail-value">{driver.email}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Contact Number</p>
                    <p className="detail-value">{driver.contactNumber}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">License Number</p>
                    <p className="detail-value">{driver.licenseNumber}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Created On</p>
                    <p className="detail-value">{utilSvc.formatDate(driver.createdAt, DateFormats.DD_MM_YYYY_H_MM_A)}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Updated On</p>
                    <p className="detail-value">{utilSvc.formatDate(driver.updatedAt, DateFormats.DD_MM_YYYY_H_MM_A)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        ) : null}
      </Card>
    </div>
  );
};

export default DriverDetails;
