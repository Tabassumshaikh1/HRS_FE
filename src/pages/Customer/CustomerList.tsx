import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import WindowTwoToneIcon from "@mui/icons-material/WindowTwoTone";
import { Card, CardContent, CardHeader } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { AccountType, AccountTypeLabel, AppDefaults, DateFormats, PageSizeOptions, SortBy } from "../../data/app.constant";
import { ICustomerFilters } from "../../interfaces/filter.interface";
import { IListResponse } from "../../interfaces/response.interface";
import { IUser } from "../../interfaces/user.interface";
import { AppNotificationService } from "../../services/app-notification.service";
import { CustomerService } from "../../services/customer.service";
import { UtilService } from "../../services/util.service";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import SearchBox from "../../shared/components/SearchBox";
import CustomerAction from "./components/CustomerAction";
import CustomerCards from "./components/CustomerCards";
import CustomerContactNo from "./components/CustomerContactNo";
import CustomerCreatedOn from "./components/CustomerCreatedOn";
import CustomerEmail from "./components/CustomerEmail";
import CustomerFilters from "./components/CustomerFilters";
import CustomerImage from "./components/CustomerImage";
import CustomerStatus from "./components/CustomerStatus";

const columns: GridColDef[] = [
  {
    field: "imageUrl",
    headerName: "",
    sortable: false,
    width: 100,
    renderCell: (params) => <CustomerImage imageUrl={params.row?.imageUrl} />,
  },
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    width: 200,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerContactNo customer={{ ...params.row }} />,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    width: 230,
    renderCell: (params) => <CustomerEmail customer={{ ...params.row }} />,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerStatus customer={{ ...params.row }} />,
  },
  {
    field: "createdAt",
    headerName: "Created On",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerCreatedOn customer={{ ...params.row }} />,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 200,
    renderCell: (params) => <CustomerAction customer={{ ...params.row }} />,
    cellClassName: "ps-0",
  },
];

const initialValues: any = {
  q: "",
  status: "",
  accountType: "",
  page: AppDefaults.PAGE_NO,
  limit: AppDefaults.PAGE_LIMIT,
  sort: AppDefaults.SORT,
  sortBy: AppDefaults.SORT_BY,
};

const CustomerList = () => {
  const notifySvc = new AppNotificationService();
  const customerSvc = new CustomerService();
  const utilSvc = new UtilService();
  const [customers, setCustomers] = useState<IListResponse>({
    total: 0,
    data: [],
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showListView, setShowListView] = useState<boolean>(!utilSvc.isMobile());

  const { values, setFieldValue } = useFormik({
    initialValues,

    onSubmit: (values) => {},

    validate: (values: any) => {
      debounced(values);
      return {};
    },
  });

  const debounced = useDebouncedCallback((formData: ICustomerFilters) => {
    loadCustomers(formData);
  }, 500);

  useEffect(() => {
    loadCustomers(initialValues as ICustomerFilters);
  }, []);

  const loadCustomers = async (filters: ICustomerFilters) => {
    try {
      filters = { ...filters, page: (filters.page || 0) + 1 };
      const response = await customerSvc.getCustomers(filters);
      setCustomers(response);
    } catch (error) {
      notifySvc.showError(error);
    }
  };

  const exportCustomers = async () => {
    try {
      const response = await customerSvc.getCustomers({
        q: values.q,
        status: values.status,
        accountType: values.accountType,
        sort: values.sort,
        sortBy: values.sortBy,
      } as ICustomerFilters);
      const excelData: any[] = [];
      response.data.forEach((customer: IUser, index: number) => {
        excelData.push({
          "S No.": index + 1,
          Name: customer.name,
          Email: customer.email,
          Username: customer.userName,
          "Contact Number": customer.contactNumber,
          Status: customer.status,
          "Account Type": customer.accountType === AccountType.LOCAL ? AccountTypeLabel.LOCAL : AccountTypeLabel.GOOGLE,
          "Created On": utilSvc.formatDate(customer.createdAt),
          "Updated On": utilSvc.formatDate(customer.updatedAt),
        });
      });
      let fileName = "Customers";
      const timestamp = utilSvc.formatDate(new Date(), DateFormats.DD_MM_YYYY_H_MM_A);
      fileName = `${fileName}-${timestamp}`;
      utilSvc.exportAsExcel(excelData, fileName);
    } catch (error) {
      notifySvc.showError(error);
    }
  };

  const paginatorModelChange = async (model: GridPaginationModel) => {
    if (model.pageSize !== values.limit) {
      await setFieldValue("page", 0);
      await setFieldValue("limit", model.pageSize);
    } else {
      await setFieldValue("page", model.page);
      await setFieldValue("limit", model.pageSize);
    }
  };

  const sortingModelChange = async (model: GridSortModel) => {
    await setFieldValue("sort", model?.[0]?.field || values.sort);
    await setFieldValue("sortBy", model?.[0]?.sort || SortBy.ASC);
  };

  const toggleListAndCardView = async () => {
    if (values.page !== AppDefaults.PAGE_NO) {
      await setFieldValue("page", 0);
    }
    setShowListView(!showListView);
  };

  return (
    <div className="content-wrapper">
      <Card>
        <CardHeader title="Customers" className="card-heading"></CardHeader>
        <Divider />
        <CardContent>
          <div className="row">
            <div className="col-md-6 col-7">
              <SearchBox values={values} setFieldValue={setFieldValue} />
            </div>
            <div className="col-md-6 col-5 text-end">
              {showListView ? (
                <BootstrapTooltip title="Card View" onClick={toggleListAndCardView}>
                  <WindowTwoToneIcon className="me-3 curson-pointer" />
                </BootstrapTooltip>
              ) : (
                <BootstrapTooltip title="List View" onClick={toggleListAndCardView}>
                  <FormatListBulletedTwoToneIcon className="me-3 curson-pointer" />
                </BootstrapTooltip>
              )}
              <BootstrapTooltip title="Download" onClick={exportCustomers}>
                <DownloadTwoToneIcon className="me-3 curson-pointer" />
              </BootstrapTooltip>
              <BootstrapTooltip title="Filters" onClick={() => setShowFilters(!showFilters)}>
                <FilterListTwoToneIcon className="curson-pointer" />
              </BootstrapTooltip>
            </div>
            {showFilters ? (
              <div className="col-12 mt-4">
                <CustomerFilters values={values} setFieldValue={setFieldValue} />
              </div>
            ) : null}

            <div className="col-12 mt-4">
              {showListView ? (
                <DataGrid
                  className="data-grid-table"
                  rows={customers.data}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: values.page, pageSize: values.limit },
                    },
                    sorting: {
                      sortModel: [
                        {
                          field: values.sort,
                          sort: values.sortBy as GridSortDirection,
                        },
                      ],
                    },
                  }}
                  paginationMode={AppDefaults.PAGINATION_AND_SORTING_MODE}
                  sortingMode={AppDefaults.PAGINATION_AND_SORTING_MODE}
                  rowCount={customers.total}
                  pageSizeOptions={PageSizeOptions}
                  getRowId={(row) => row._id}
                  rowSelection={false}
                  disableColumnResize={true}
                  paginationModel={{ page: values.page, pageSize: values.limit }}
                  rowHeight={AppDefaults.LIST_ROW_HEIGHT as number}
                  sortModel={[
                    {
                      field: values.sort,
                      sort: values.sortBy as GridSortDirection,
                    },
                  ]}
                  onPaginationModelChange={paginatorModelChange}
                  onSortModelChange={sortingModelChange}
                />
              ) : (
                <CustomerCards customers={customers} values={values} setFieldValue={setFieldValue} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerList;
