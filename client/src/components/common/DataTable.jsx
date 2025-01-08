import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const DataTable = ({
  title,
  data,
  columns,
  renderCell,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  actions
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (b[orderBy] < a[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (b[orderBy] > a[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {title && (
        <Typography variant="h6" sx={{ p: 2 }} align="center">
          {title}
        </Typography>
      )}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="normal" padding="checkbox" stickyHeader={true}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ width: column.width }}
                  padding='normal'
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              {actions && (
                <TableCell align="center">
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover={true}>
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${column.id}`} align={column.align}>
                    {renderCell(row, column.id)}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="center">
                    {actions.map((action) => (
                      <IconButton
                        key={action.name}
                        onClick={() => action.onClick(row)}
                        color={action.color || "primary"}
                        size="small"
                        title={action.name}
                      >
                        {action.icon}
                      </IconButton>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default DataTable;