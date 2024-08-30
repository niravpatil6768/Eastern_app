import React, { useCallback, useEffect, useState } from "react";
import {
  deleteMultiService,
  DeleteSingleUser,
  fetchData,
  fetchDataBySearch,
} from "../../Services";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import _ from "lodash";
import Navbar from "../Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataItem } from "../../Types";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { RootState } from "../../Types";
import { Style } from "./style";
import Colors from "../../Assets/Colors";
import { storeData } from "../../Redux/action";

const PAGE_SIZE = 10;

const HomePage = () => {
  const users = useSelector((store: RootState) => store.reducer.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mainData, setMainData] = useState<DataItem[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);
  const [data, setData] = useState<DataItem[]>([]);
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [filterOption, setFilterOption] = useState("");
  const [columns, setColumns] = useState({
    name: true,
    email: true,
    role: true,
    dob: true,
    gender: true,
    status: true,
  });

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setData(users);
    console.log("Users state:", users);
  }, [users]);

  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      try {
        const res = await fetchData();
        console.log(res.data.data);
        // setData(res.data.data);
        dispatch(storeData(res.data.data));
        // setMainData(res.data.data);
      } catch (error) {
        console.error("Error in fetch users", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [dispatch, triggerFetch]);

  const searchFilter = useCallback(
    _.debounce(async (value: string) => {
      setLoading(true);
      try {
        const result = await fetchDataBySearch(value);
        setData(result.data.data);
      } catch (error) {
        console.error("Error in search filter:", error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  const handleVisibilityClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(filterAnchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFilterAnchorEl(null);
  };

  // Handlers for filter options
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterOption(event.target.value);
  };

  const applyFilter = () => {
    console.log("Filter applied:", filterOption);
    const filterData = data.filter((item) => item.role.name == filterOption);
    setData(filterData);
    console.log(filterData);
    handleClose();
  };

  const removeFilter = () => {
    console.log("Filter removed");
    setFilterOption("");
    setData(users);
    handleClose();
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((item) => item.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleDelete = async () => {
    const formattedData = {
      id: selectedIds,
    };
    console.log(JSON.stringify(formattedData));

    try {
      const res = await deleteMultiService(formattedData);
      if (res.status === 200) {
        console.log("deleted successfully");
        setSelectedIds([]);
        setTriggerFetch((prev) => !prev);
      }
      console.log(res);
    } catch (error) {
      console.error("error in delete users", error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleView = (item: DataItem) => {
    Swal.fire({
      title: "View User",
      html: `
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="border: 1px solid #ddd; padding: 8px;">Name</td><td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;">Email</td><td style="border: 1px solid #ddd; padding: 8px;">${item.email}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;">Role</td><td style="border: 1px solid #ddd; padding: 8px;">${item.role.name}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;">DOB</td><td style="border: 1px solid #ddd; padding: 8px;">${item.dob}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;">Gender</td><td style="border: 1px solid #ddd; padding: 8px;">${item.gender_text}</td></tr>
          <tr><td style="border: 1px solid #ddd; padding: 8px;">Status</td><td style="border: 1px solid #ddd; padding: 8px;">${item.status_text}</td></tr>
        </table>
      `,
      //   confirmButtonText: 'Close',
      showCloseButton: true,
      customClass: {
        popup: "popup-custom",
      },
    });
  };

  const deleteSingle = async (id: any) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure you want to delete this User?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `Don't save`,
        customClass: {
          confirmButton: "btnlogoutconfirm", // Custom class for confirm button
          denyButton: "btnlogoutdeny", // Custom class for deny button
        },
      });

      // Check if the user confirmed the deletion
      if (result.isConfirmed) {
        // Call the async delete function and wait for it to complete
        const res = await DeleteSingleUser(id);
        console.log("User deleted successfully", res);

        // Trigger data fetch or update UI
        setTriggerFetch((prev) => !prev);
      } else if (result.isDenied) {
        // Handle the case where the user denies the action (optional)
        console.log("User deletion cancelled");
      }
    } catch (error) {
      // Handle errors, such as network issues or API errors
      console.error("Error deleting user:", error);
    }
  };

  const addUser = () => {
    navigate("/adduser?mode=add");
  };

  const updateUser = (id: string) => {
    navigate(`/adduser?mode=update&id=${id}`);
  };

  const exportToCSV = (data: any[], filename: string) => {
    const csvRows = [];
    // Extract headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    // Format data rows
    for (const row of data) {
      const values = headers.map((header) =>
        JSON.stringify(row[header], replacer)
      );
      csvRows.push(values.join(","));
    }

    // Create a Blob from the CSV string
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });

    // Use the file-saver package to trigger the download
    saveAs(blob, filename);
  };

  const replacer = (key: string, value: any) => (value === null ? "" : value);

  const handleDownload = () => {
    exportToCSV(data, "exported_data.csv");
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Navbar />
      <Grid container style={Style.grid}></Grid>
      <Grid container style={Style.grid1}>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "35ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => searchFilter(e.target.value)}
            id="standard-basic"
            label="Search"
            variant="standard"
          />
        </Box>

        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{ height: "50px" }}
        >
          <Tooltip title="Filter">
            <Button
              aria-describedby={filterAnchorEl ? "filter-popover" : undefined}
              onClick={handleFilterClick}
              sx={{ mr: 1 }}
            >
              <FilterAltIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add">
            <Button sx={{ mr: 1 }}>
              <PersonAddIcon onClick={() => addUser()} />
            </Button>
          </Tooltip>
          <Tooltip title="Export">
            <Button sx={{ mr: 1 }} onClick={handleDownload}>
              <DownloadIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Columns Visibility">
            <Button
              aria-describedby={id}
              onClick={handleVisibilityClick}
              sx={{ mr: selectedIds.length > 1 ? 1 : 0 }}
            >
              <RemoveRedEyeIcon />
            </Button>
          </Tooltip>
          {selectedIds.length > 1 && (
            <Tooltip title="Delete">
              <Button onClick={handleDelete}>
                <Delete />
              </Button>
            </Tooltip>
          )}
        </ButtonGroup>

        {/* Filter Popover */}
        <Popover
          id="filter-popover"
          open={Boolean(filterAnchorEl)}
          anchorEl={filterAnchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Paper sx={{ padding: 2 }}>
            <FormControl fullWidth>
              <Select
                value={filterOption}
                variant="standard"
                onChange={handleFilterChange}
                displayEmpty
                renderValue={(selected) => (selected ? selected : "Role")}
              >
                <MenuItem value="Sub Admin">Sub Admin</MenuItem>
                <MenuItem value="Administrator">Administrator</MenuItem>
              </Select>
              <Button onClick={applyFilter} sx={{ mt: 1, mr: 1 }}>
                Apply Filter
              </Button>
              <Button onClick={removeFilter} sx={{ mt: 1 }}>
                Remove Filter
              </Button>
            </FormControl>
          </Paper>
        </Popover>

        {/* Columns Visibility Popover */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Paper sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
            {Object.keys(columns).map((col) => (
              <FormControlLabel
                key={col}
                control={
                  <Checkbox
                    checked={columns[col as keyof typeof columns]}
                    onChange={() =>
                      setColumns({
                        ...columns,
                        [col]: !columns[col as keyof typeof columns],
                      })
                    }
                  />
                }
                label={col.charAt(0).toUpperCase() + col.slice(1)}
              />
            ))}
          </Paper>
        </Popover>
      </Grid>

      {/* <Grid container style={Style.grid1}>
        <h1>User List</h1>
      </Grid> */}
      <Grid
        container
        sx={{ padding: window.innerWidth > 700 ? "20px 40px" : "20px 20px" }}
      >
        <TableContainer component={Paper}>
          <Box sx={{ width: "100%" }}>
            {loading && (
              <LinearProgress variant="determinate" value={progress} />
            )}
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: Colors.primary }}>
              <TableRow>
                {columns.name && (
                  <TableCell sx={Style.tablecell}>
                    <Checkbox
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />{" "}
                    Name
                  </TableCell>
                )}
                {columns.email && (
                  <TableCell sx={Style.tablecell} align="right">
                    Email
                  </TableCell>
                )}
                {columns.role && (
                  <TableCell sx={Style.tablecell} align="right">
                    Role
                  </TableCell>
                )}
                {columns.dob && (
                  <TableCell sx={Style.tablecell} align="right">
                    DOB
                  </TableCell>
                )}
                {columns.gender && (
                  <TableCell sx={Style.tablecell} align="right">
                    Gender
                  </TableCell>
                )}
                {columns.status && (
                  <TableCell sx={Style.tablecell} align="right">
                    Status
                  </TableCell>
                )}
                <TableCell sx={Style.tablecell} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.name && (
                    <TableCell component="th" scope="row">
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />{" "}
                      {item.name}
                    </TableCell>
                  )}
                  {columns.email && (
                    <TableCell align="right">{item.email}</TableCell>
                  )}
                  {columns.role && (
                    <TableCell align="right">{item.role.name}</TableCell>
                  )}
                  {columns.dob && (
                    <TableCell align="right">{item.dob}</TableCell>
                  )}
                  {columns.gender && (
                    <TableCell align="right">{item.gender_text}</TableCell>
                  )}
                  {columns.status && (
                    <TableCell align="right">{item.status_text}</TableCell>
                  )}
                  <TableCell align="right">
                    <ButtonGroup variant="text" aria-label="action buttons">
                      <Button onClick={() => handleView(item)}>
                        <Visibility />
                      </Button>
                      <Button onClick={() => updateUser(item.id)}>
                        <Edit />
                      </Button>
                      <Button onClick={() => deleteSingle(item.id)}>
                        <Delete />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[PAGE_SIZE]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          />
        </TableContainer>
      </Grid>
    </>
  );
};

export default HomePage;
