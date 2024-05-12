import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { baseURL, fetchUsers } from "../../api/user";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";

interface Column {
  id: "email" | "role" | "last_name" | "first_name" | "gender";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
  render?: Function;
}

const columns: readonly Column[] = [
  { id: "email", label: "Email", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 50 },
  {
    id: "first_name",
    label: "First name",
    minWidth: 150,
  },
  {
    id: "last_name",
    label: "Last name",
    minWidth: 150,
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 100,
  },
  {
    id: "gender",
    label: "Documents",
    minWidth: 200,
    render: (column: any) => {
      console.log(column);

      return (
        <div className="flex">
          <Button
            size="small"
            sx={{ fontSize: 12 }}
            disabled={!column?.id_proof_upload}
            onClick={() => {
              window.open(
                `${baseURL}/user/get-user-doc?key=${column?.id_proof_upload}`,
                "_blank"
              );
            }}
          >
            <FileDownloadIcon sx={{ fontSize: 15 }} /> ID Proof
          </Button>
          <Button
            sx={{ fontSize: 12 }}
            disabled={!column?.job_verification_doc}
            onClick={() => {
              window.open(
                `${baseURL}/user/get-user-doc?key=${column?.id_proof_upload}`,
                "_blank"
              );
            }}
          >
            <FileDownloadIcon sx={{ fontSize: 15 }} /> Job Verification
          </Button>
        </div>
      );
    },
  },
];

export default function Users() {
  const [rows, setRows] = React.useState<Array<any>>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchTableData = async () => {
    try {
      let { data } = await fetchUsers();
      setRows(
        (data?.data || [])?.map((item: any) => {
          return {
            ...item,
          };
        })
      );
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="p-[20px]">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ height: "85vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        const render = column?.render;
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {render ? (
                              <>{render(row)}</>
                            ) : (
                              <>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
