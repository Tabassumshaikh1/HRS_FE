import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel, GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { IListResponse } from "../../../interfaces/response.interface";
import { AppDefaults, PageSizeOptions } from "../../../data/app.constant";
import { IVehicle } from "../../../interfaces/vehicle.interface";
import { UtilService } from "../../../services/util.service";
import VehicleStatus from "./VehicleStatus";
import VehicleImage from "./VehicleImage";
import VehicleActions from "./VehicleActions";

interface IProps {
  vehicles: IListResponse;
  values: any;
  onDelete: (id: string) => void;
  onPaginationModelChange: ((model: GridPaginationModel, details: GridCallbackDetails<any>) => void) | undefined;
  onSortModelChange: ((model: GridSortModel, details: GridCallbackDetails<any>) => void) | undefined;
}

const VehicleList = ({ vehicles, values, onDelete, onPaginationModelChange, onSortModelChange }: IProps) => {
  const columns: GridColDef[] = [
    {
      field: "imageUrl",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => <VehicleImage imageUrl={params?.row?.imageUrls?.[0]?.imageUrl} height="40px" hideDeleteBtn={true} />,
      cellClassName: "pt-1",
    },
    {
      field: "vehicleNumber",
      headerName: "Vehicle Number",
      sortable: true,
      width: 200,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      sortable: true,
      width: 200,
    },
    {
      field: "vehicleType",
      headerName: "Vehicle Type",
      sortable: false,
      width: 200,
      valueGetter: (params, value: IVehicle) => `${value.vehicleType.name}`,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 200,
      renderCell: (params) => <VehicleStatus vehicle={{ ...params.row }} />,
    },
    {
      field: "createdAt",
      headerName: "Created On",
      sortable: true,
      width: 200,
      valueGetter: (params, value: IVehicle) => `${new UtilService().formatDate(value.createdAt)}`,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => <VehicleActions vehicle={{ ...params.row }} onDelete={onDelete} />,
      cellClassName: "ps-0",
    },
  ];

  return (
    <DataGrid
      className="data-grid-table"
      rows={vehicles.data}
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
      rowCount={vehicles.total}
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

export default VehicleList;
