import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Card, CardContent, CardHeader, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Divider from "@mui/material/Divider";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IUser } from "../../interfaces/user.interface";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";

const columns: GridColDef[] = [
  {
    field: "imageUrl",
    headerName: "",
    sortable: false,
    filterable: false,
    hideable: false,
    width: 60,
    renderCell: (params) => <CustomerImage {...params} />,
  },
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    filterable: false,
    hideable: false,
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    filterable: false,
    hideable: false,
    width: 200,
    renderCell: (params) => <CustomerEmail {...params} />,
  },
  { field: "lastName", headerName: "Last name", sortable: true, filterable: false, hideable: false, width: 200 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    filterable: false,
    hideable: false,
    width: 200,
  },
];

const rows = [
  {
    _id: "66758b8703b7bf49dc35e29b",
    name: "Amir khan",
    userName: "",
    email: "khanmdamir062@gmail.com",
    contactNumber: "",
    licenseNumber: "",
    role: "CUSTOMER",
    imageUrl: null,
    accountType: "google",
    status: "Active",
    createdAt: "2024-06-21T14:17:43.718Z",
    updatedAt: "2024-06-21T14:17:43.718Z",
    __v: 0,
  },
  {
    _id: "66791465cb649b8937f33f71",
    name: "Md Adil Khan",
    userName: "",
    email: "khanmdadil063@gmail.com",
    contactNumber: "",
    licenseNumber: "",
    role: "CUSTOMER",
    imageUrl: null,
    accountType: "google",
    status: "Active",
    createdAt: "2024-06-24T06:38:29.870Z",
    updatedAt: "2024-06-24T06:38:29.870Z",
    __v: 0,
  },
  {
    _id: "6693a32b4040f127e483a0b6",
    name: "My Name",
    userName: "myname",
    email: "myname@gmail.com",
    contactNumber: "9898989898",
    licenseNumber: "",
    role: "CUSTOMER",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/customer%2Fblob-1720951591932.png?alt=media&token=41a3aefa-4979-4e24-b79e-a83c0724f4cd",
    accountType: "local",
    status: "Active",
    createdAt: "2024-07-14T10:06:35.224Z",
    updatedAt: "2024-07-14T10:06:35.224Z",
    __v: 0,
  },
  {
    _id: "6693eddd4040f127e483a0d3",
    name: "New Name",
    userName: "newname",
    email: "newname@gmail.com",
    contactNumber: "2313213123",
    licenseNumber: "",
    role: "CUSTOMER",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/customer%2Fblob-1720971432451.png?alt=media&token=fe1567e7-8382-4130-b0cc-da5fcfddbc96",
    accountType: "local",
    status: "Active",
    createdAt: "2024-07-14T15:25:17.160Z",
    updatedAt: "2024-07-14T15:25:17.160Z",
    __v: 0,
  },
  {
    _id: "6693f0ab4040f127e483a0e1",
    name: "Test",
    userName: "test",
    email: "test@gmail.com",
    contactNumber: "1234567890",
    licenseNumber: "",
    role: "CUSTOMER",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/customer%2Fblob-1720971432451.png?alt=media&token=fe1567e7-8382-4130-b0cc-da5fcfddbc96",
    accountType: "local",
    status: "Active",
    createdAt: "2024-07-14T15:37:15.569Z",
    updatedAt: "2024-07-14T15:37:15.569Z",
    __v: 0,
  },
  {
    _id: "6694f70a4ce283bad8cfdc3a",
    name: "My User",
    userName: "myuser",
    email: "myuser@gmail.com",
    contactNumber: "9090909090",
    licenseNumber: "",
    role: "CUSTOMER",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/customer%2Fblob-1721038599935.png?alt=media&token=230e9496-9fe6-4176-ac24-5d2a5cb5b0d4",
    accountType: "local",
    status: "Active",
    createdAt: "2024-07-15T10:16:42.746Z",
    updatedAt: "2024-07-15T10:16:42.746Z",
    __v: 0,
  },
  {
    _id: "66963e6d138815507db594d6",
    name: "Amir",
    userName: "Khan",
    email: "amir@email.com",
    contactNumber: "6363636345",
    licenseNumber: "",
    role: "CUSTOMER",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/customer%2Fblob-1721122409696.png?alt=media&token=2dea0045-97a6-47e7-9a4a-03ceaeeabfb1",
    accountType: "local",
    status: "Active",
    createdAt: "2024-07-16T09:33:33.443Z",
    updatedAt: "2024-07-16T09:33:33.443Z",
    __v: 0,
  },
];

function CustomerImage({ row }: { row: IUser }) {
  return (
    <>
      {row?.imageUrl ? (
        <Avatar alt={row.name} src={row.imageUrl} className="mt-1" />
      ) : (
        <Avatar
          alt={row.name}
          className="mt-1"
          src="https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/UI%2Fdefault-profile.png?alt=media&token=11f8d0c2-9d39-4721-a356-c872f6ee64fb"
        />
      )}
    </>
  );
}

function CustomerEmail({ row }: { row: IUser }) {
  return (
    <>
      <a className="text-primary" href={`mailto:${row.email}`}>
        {row.email}
      </a>
    </>
  );
}

const CustomerList = () => {
  return <div>CustomerList</div>;
  return (
    <div className="content-wrapper">
      <Card>
        <CardHeader title="Customers" className="card-heading"></CardHeader>
        <Divider />
        <CardContent>
          <div className="row">
            <div className="col-md-6">
              <FormControl variant="outlined">
                <InputLabel size="small" htmlFor="outlined-adornment-search">
                  Search
                </InputLabel>
                <OutlinedInput
                  size="small"
                  name="search"
                  id="outlined-adornment-search"
                  type="search"
                  label="Search"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-md-6 text-end">
              <BootstrapTooltip title="Download">
                <DownloadTwoToneIcon className="me-3 curson-pointer" />
              </BootstrapTooltip>
              <BootstrapTooltip title="Filter">
                <FilterListTwoToneIcon className="curson-pointer" />
              </BootstrapTooltip>
            </div>
            <div className="col-12">
              <div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  getRowId={(row) => row._id}
                  rowSelection={false}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerList;
