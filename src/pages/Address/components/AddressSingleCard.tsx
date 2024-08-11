import { AppDefaults, AppMessages } from "../../../data/app.constant";
import { IAddress } from "../../../interfaces/address.interface";
import { UtilService } from "../../../services/util.service";
import MenuActionsBtn from "../../../shared/components/Common/MenuActionsBtn";
import GridItem from "../../../shared/components/Styled/GridItem";

interface IProps {
  address: IAddress;
  makePrimary: (id: string) => void;
  onDelete: (id: string) => void;
}

const AddressSingleCard = ({ address, makePrimary, onDelete }: IProps) => {
  const utilSvc = new UtilService();

  return (
    <GridItem style={{ backgroundColor: AppDefaults.DEFAULT_CARD_COLOR }} className={`${address.isPrimary ? "primary-address" : ""}`}>
      <div className="row pt-2 pb-4">
        <div className="col-6 my-2 text-start ps-4">
          <p className="detail-label">{address.name}</p>
        </div>
        <div className="col-6 text-end">
          <MenuActionsBtn
            info={address}
            path="/address"
            deleteConfirmMsg={AppMessages.ADDRESS_DELETE_CONFIRM}
            showMakePrimaryBtn={!address.isPrimary}
            onMakePrimary={makePrimary}
            onDelete={onDelete}
          />
        </div>
        <div className="col-12 text-start ps-4 mt-2">
          <p className="card-detail-label">Address</p>
          <p className="card-detail-value">{utilSvc.getFullAddress(address)}</p>
        </div>
        <div className="col-6 text-start ps-4 mt-2">
          <p className="card-detail-label">Created On</p>
          <p className="card-detail-value">{utilSvc.formatDate(address.createdAt)}</p>
        </div>
        <div className="col-6 text-start ps-4 mt-2">
          <p className="card-detail-label">Updated On</p>
          <p className="card-detail-value">{utilSvc.formatDate(address.updatedAt)}</p>
        </div>
      </div>
    </GridItem>
  );
};

export default AddressSingleCard;
