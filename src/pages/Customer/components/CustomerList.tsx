import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel, GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { AppDefaults, PageSizeOptions } from "../../../data/app.constant";
import { IListResponse } from "../../../interfaces/response.interface";
import CustomerAction from "./CustomerAction";
import CustomerContactNo from "./CustomerContactNo";
import CustomerCreatedOn from "./CustomerCreatedOn";
import CustomerEmail from "./CustomerEmail";
import CustomerImage from "./CustomerImage";
import CustomerStatus from "./CustomerStatus";

interface IProps {
  customers: IListResponse;
  values: any;
  onPaginationModelChange: ((model: GridPaginationModel, details: GridCallbackDetails<any>) => void) | undefined;
  onSortModelChange: ((model: GridSortModel, details: GridCallbackDetails<any>) => void) | undefined;
}

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

const CustomerList = ({ customers, values, onPaginationModelChange, onSortModelChange }: IProps) => {
  return (
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
      onPaginationModelChange={onPaginationModelChange}
      onSortModelChange={onSortModelChange}
    />
  );
};

export default CustomerList;
