import * as React from "react";
import { TableFooter, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, TablePagination } from '@mui/material';

export interface State {
    rows: any[],
    columns: any[],
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    page: number,
    rowsPerPage: number,
}

export interface ProgressState {
    progress: number
}

export const initialState: State = {
    rows: [],
    columns: [],
    sortBy: '',
    sortOrder: 'asc',
    page: 0,
    rowsPerPage: 5,
}

export const progressState: ProgressState = {
    progress: 0
}

export class ReactTable extends React.Component<{}, State & ProgressState> {

    private static updateCallback: (data: object) => void = null;

    public static update(newState: State & ProgressState) {
        if (typeof ReactTable.updateCallback === 'function') {
            ReactTable.updateCallback(newState);
        }
    }

    public static updateProgress(newProgress: number) {
        if (typeof ReactTable.updateCallback === 'function') {
            ReactTable.updateCallback({ progress: newProgress });
        }
    }

    public state: State & ProgressState = {
        ...initialState,
        ...progressState
    };

    public componentDidMount() {
        ReactTable.updateCallback = (newState: State & ProgressState): void => {
            this.setState(newState);
        };
    }

    public componentWillUnmount() {
        ReactTable.updateCallback = null;
    }

    constructor(props: any) {
        super(props);
    }

    handleChangePage = (event: unknown, newPage: number) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
    };

    renderTable(cols, rows, progress, sortBy, sortOrder, page, rowsPerPage) {

        if (!rows || rows.length === 0 && progress !== 100) {
            return <div className="loading-container">
                {progress}
            </div>;
        }

        const handleSort = (column) => {
            if (column === sortBy) {
                this.setState((prevState) => ({
                    sortBy: column,
                    sortOrder: prevState.sortOrder === 'asc' ? 'desc' : 'asc',
                }));
            } else {
                this.setState({
                    sortBy: column,
                    sortOrder: 'asc',
                });
            }
        };

        const sortedData = [...rows].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });

        const columns = cols;
        debugger;
        return (
            <div style={{ overflowY: 'auto', maxHeight: '800px' }}>
                <TableContainer component={Paper} className="table-container" style={{ overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {cols.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        sortDirection={sortBy === column ? sortOrder : false}
                                    >
                                        <TableSortLabel
                                            active={sortBy === column}
                                            onClick={() => handleSort(column)}
                                        >
                                            {column}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                                <TableRow key={index}>
                                    {columns.map((column, columnIndex) => (
                                        <TableCell key={columnIndex}>
                                            {column.includes("relation") || column.includes("id") ? (
                                                (item[columnIndex] !== undefined && typeof item[columnIndex] == 'string' && item[columnIndex].includes(',')) ? (
                                                    item[columnIndex].split(',').map((value, i) => (
                                                        <span key={i}>
                                                            <a href="#" target="_blank" onClick={() => { }}>{value}</a><br />
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span>
                                                        <a href="#" target="_blank" onClick={() => { }}>{item[columnIndex]}</a><br />
                                                    </span>
                                                )
                                            ) : (
                                                item[columnIndex]
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={sortedData.length}
                    component={'div'}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }

    render() {
        const { columns, rows, progress, sortBy, sortOrder, page, rowsPerPage } = this.state;
        debugger;
        return (
            <div>
                {this.renderTable(columns, rows, progress, sortBy, sortOrder, page, rowsPerPage)}
            </div>
        )
    }
}
