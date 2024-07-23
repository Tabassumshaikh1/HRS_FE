import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import CallTwoToneIcon from "@mui/icons-material/CallTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountType, ActivityStatus, DateFormats, StatusColors } from "../../data/app.constant";
import { IUser } from "../../interfaces/user.interface";
import { AppNotificationService } from "../../services/app-notification.service";
import { CustomerService } from "../../services/customer.service";
import { UtilService } from "../../services/util.service";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import CustomerImage from "./components/CustomerImage";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState<IUser | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const notifySvc = new AppNotificationService();
  const customerSvc = new CustomerService();
  const utilSvc = new UtilService();

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      utilSvc.showLoader();
      const response = await customerSvc.getSingleCustomer(id as string);
      setCustomer(response);
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
        status: customer?.status === ActivityStatus.ACTIVE ? ActivityStatus.INACTIVE : ActivityStatus.ACTIVE,
      };
      await customerSvc.updateCustomerStatus(id as string, payload);
      loadCustomer();
    } catch (error) {
      notifySvc.showError(error);
    } finally {
      utilSvc.hideLoader();
    }
  };
  return (
    <div className="content-wrapper">
      <div className="row mb-4">
        <div className="col-12">
          <Button variant="outlined" color="inherit" startIcon={<ArrowBackTwoToneIcon />} onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader title="Customer Details" className="card-heading"></CardHeader>
        <Divider />
        {customer?._id ? (
          <CardContent>
            <div className="row px-4">
              <div
                className="col-lg-3 col-md-6 col-sm-12 col-12 align-center border rounded p-4"
                style={{
                  background: `linear-gradient(0deg, #FFFFFF 45%, ${
                    customer.status === ActivityStatus.ACTIVE ? StatusColors.ACTIVE : StatusColors.INACTIVE
                  } 83%)`,
                }}
              >
                <div className="row">
                  <div className="col-12 align-center mb-4">
                    <CustomerImage customer={customer} height={220} width={220} />
                  </div>
                  <div className="col-12 align-center">
                    <BootstrapTooltip title="Call">
                      <a href={`tel:${customer.contactNumber}`}>
                        <Button variant="outlined" color="primary">
                          <CallTwoToneIcon />
                        </Button>
                      </a>
                    </BootstrapTooltip>
                    <BootstrapTooltip title="Email">
                      <a href={`mailto:${customer.email}`}>
                        <Button variant="outlined" color="secondary" className="mx-3">
                          <EmailTwoToneIcon />
                        </Button>
                      </a>
                    </BootstrapTooltip>
                    {customer.status === ActivityStatus.ACTIVE ? (
                      <BootstrapTooltip title="Deactivate Customer">
                        <Button variant="outlined" color="error" onClick={updateStatus}>
                          <BlockTwoToneIcon className="me-2" /> Deactivate
                        </Button>
                      </BootstrapTooltip>
                    ) : (
                      <BootstrapTooltip title="Activate Customer">
                        <Button variant="outlined" color="success" onClick={updateStatus}>
                          <DoneTwoToneIcon className="me-2" /> Activate
                        </Button>
                      </BootstrapTooltip>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-6 col-sm-12 col-12 mt-4">
                <div className="row ms-4">
                  <div className="col-6 mb-4">
                    <p className="detail-label">Name</p>
                    <p className="detail-value">{customer.name}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Email</p>
                    <p className="detail-value">{customer.email}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Contact Number</p>
                    <p className="detail-value">{customer.contactNumber}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Account Type</p>
                    <p className="detail-value">{customer.accountType === AccountType.GOOGLE ? "Google" : "HRS Local"}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Created On</p>
                    <p className="detail-value">{utilSvc.formatDate(customer.createdAt, DateFormats.DD_MM_YYYY_H_MM_A)}</p>
                  </div>
                  <div className="col-6 mb-4">
                    <p className="detail-label">Updated On</p>
                    <p className="detail-value">{utilSvc.formatDate(customer.updatedAt, DateFormats.DD_MM_YYYY_H_MM_A)}</p>
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

export default CustomerDetails;
