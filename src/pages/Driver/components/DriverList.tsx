import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel, GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { AppDefaults, PageSizeOptions } from "../../../data/app.constant";
import { IListResponse } from "../../../interfaces/response.interface";
import DriverAction from "./DriverAction";
import DriverContactNo from "./DriverContactNo";
import DriverCreatedOn from "./DriverCreatedOn";
import DriverImage from "./DriverImage";
import DriverStatus from "./DriverStatus";

interface IProps {
  drivers: IListResponse;
  values: any;
  onDelete: (id: string) => void;
  onPaginationModelChange: ((model: GridPaginationModel, details: GridCallbackDetails<any>) => void) | undefined;
  onSortModelChange: ((model: GridSortModel, details: GridCallbackDetails<any>) => void) | undefined;
}

const DriverList = ({ drivers, values, onDelete, onPaginationModelChange, onSortModelChange }: IProps) => {
  const columns: GridColDef[] = [
    {
      field: "imageUrl",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => <DriverImage imageUrl={params?.row?.imageUrl} />,
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
      renderCell: (params) => <DriverContactNo driver={{ ...params.row }} />,
    },
    {
      field: "licenseNumber",
      headerName: "License Number",
      sortable: true,
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 200,
      renderCell: (params) => <DriverStatus driver={{ ...params.row }} />,
    },
    {
      field: "createdAt",
      headerName: "Created On",
      sortable: true,
      width: 200,
      renderCell: (params) => <DriverCreatedOn driver={{ ...params.row }} />,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => <DriverAction driver={{ ...params.row }} onDelete={onDelete} />,
      cellClassName: "ps-0",
    },
  ];

  return (
    <DataGrid
      className="data-grid-table"
      rows={drivers.data}
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
      rowCount={drivers.total}
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

export default DriverList;
