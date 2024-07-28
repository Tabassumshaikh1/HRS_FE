import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import WindowTwoToneIcon from "@mui/icons-material/WindowTwoTone";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { AppDefaults, AppMessages, DateFormats, PageSizeOptions, SortBy } from "../../data/app.constant";
import { IVehicleTypeFilters } from "../../interfaces/filter.interface";
import { IListResponse } from "../../interfaces/response.interface";
import { IVehicleType } from "../../interfaces/vehicle-type.interface";
import { AppNotificationService } from "../../services/app-notification.service";
import { UtilService } from "../../services/util.service";
import { VehicleTypeService } from "../../services/vehicle-type.service";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import SearchBox from "../../shared/components/SearchBox";
import AddEditVehicleType from "./components/AddEditVehicleType";
import VehicleTypeAction from "./components/VehicleTypeAction";
import VehicleTypeCards from "./components/VehicleTypeCards";

const initialValues: any = {
  q: "",
  page: AppDefaults.PAGE_NO,
  limit: AppDefaults.PAGE_LIMIT,
  sort: AppDefaults.SORT,
  sortBy: AppDefaults.SORT_BY,
};

const VehicleTypeList = () => {
  const notifySvc = new AppNotificationService();
  const vehicleTypeSvc = new VehicleTypeService();
  const utilSvc = new UtilService();
  const [vehicleTypes, setVehicleTypes] = useState<IListResponse>({
    total: 0,
    data: [],
  });
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showListView, setShowListView] = useState<boolean>(!utilSvc.isMobile());

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      width: 350,
      headerClassName: "ps-4",
      cellClassName: "ps-4",
    },
    {
      field: "createdAt",
      headerName: "Created On",
      sortable: true,
      width: 350,
      valueGetter: (value) => `${utilSvc.formatDate(value)}`,
    },
    {
      field: "updatedAt",
      headerName: "Updated On",
      sortable: true,
      width: 350,
      valueGetter: (value) => `${utilSvc.formatDate(value)}`,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <VehicleTypeAction vehicleType={{ ...params.row }} onUpdate={() => loadVehicleTypes(values)} onDelete={deleteVehicleType} />
      ),
      cellClassName: "ps-0",
    },
  ];

  const { values, setFieldValue } = useFormik({
    initialValues,

    onSubmit: (values) => {},

    validate: (values: any) => {
      debounced(values);
      return {};
    },
  });

  const debounced = useDebouncedCallback((formData: IVehicleTypeFilters) => {
    loadVehicleTypes(formData);
  }, 500);

  useEffect(() => {
    loadVehicleTypes(initialValues as IVehicleTypeFilters);
  }, []);

  const loadVehicleTypes = async (filters: IVehicleTypeFilters) => {
    try {
      filters = { ...filters, page: (filters.page || 0) + 1 };
      const response = await vehicleTypeSvc.getVehicleTypes(filters);
      setVehicleTypes(response);
    } catch (error) {
      notifySvc.showError(error);
    }
  };

  const exportVehicleTypes = async () => {
    try {
      const response = await vehicleTypeSvc.getVehicleTypes({
        q: values.q,
        sort: values.sort,
        sortBy: values.sortBy,
      } as IVehicleTypeFilters);
      const excelData: any[] = [];
      response.data.forEach((vehicleType: IVehicleType, index: number) => {
        excelData.push({
          "S No.": index + 1,
          Name: vehicleType.name,
          "Created On": utilSvc.formatDate(vehicleType.createdAt),
          "Updated On": utilSvc.formatDate(vehicleType.updatedAt),
        });
      });
      let fileName = "Vehicle Types";
      const timestamp = utilSvc.formatDate(new Date(), DateFormats.DD_MM_YYYY_H_MM_A);
      fileName = `${fileName}-${timestamp}`;
      utilSvc.exportAsExcel(excelData, fileName);
    } catch (error) {
      notifySvc.showError(error);
    }
  };

  const deleteVehicleType = async (id: string) => {
    try {
      await vehicleTypeSvc.deleteVehicleType(id);
      notifySvc.showSucces(AppMessages.VEHICLE_TYPE_DELETED);
      loadVehicleTypes(values);
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
      <div className="row my-4">
        <div className="col-12 text-end">
          <Button variant="contained" color="secondary" onClick={() => setShowAddDialog(true)}>
            <AddTwoToneIcon fontSize="small" className="me-1" /> Add Vehicle Type
          </Button>
          {showAddDialog ? (
            <AddEditVehicleType
              onCancel={() => setShowAddDialog(false)}
              onAddUpdate={() => {
                setShowAddDialog(false);
                loadVehicleTypes(values);
              }}
            />
          ) : null}
        </div>
      </div>
      <Card>
        <CardHeader title="Vehicle Types" className="card-heading"></CardHeader>
        <Divider />
        <CardContent>
          <div className="row">
            <div className="col-md-6 col-9">
              <SearchBox values={values} setFieldValue={setFieldValue} />
            </div>
            <div className="col-md-6 col-3 text-end">
              {showListView ? (
                <BootstrapTooltip title="Card View" onClick={toggleListAndCardView}>
                  <WindowTwoToneIcon className="me-3 curson-pointer" />
                </BootstrapTooltip>
              ) : (
                <BootstrapTooltip title="List View" onClick={toggleListAndCardView}>
                  <FormatListBulletedTwoToneIcon className="me-3 curson-pointer" />
                </BootstrapTooltip>
              )}
              <BootstrapTooltip title="Download" onClick={exportVehicleTypes}>
                <DownloadTwoToneIcon className="curson-pointer" />
              </BootstrapTooltip>
            </div>

            <div className="col-12 mt-4">
              {showListView ? (
                <DataGrid
                  className="data-grid-table"
                  rows={vehicleTypes.data}
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
                  rowCount={vehicleTypes.total}
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
                <VehicleTypeCards
                  vehicleTypes={vehicleTypes}
                  values={values}
                  setFieldValue={setFieldValue}
                  onUpdate={() => loadVehicleTypes(values)}
                  onDelete={deleteVehicleType}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleTypeList;
