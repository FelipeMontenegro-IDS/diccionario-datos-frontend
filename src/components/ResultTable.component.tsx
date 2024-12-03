import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Button, PresenceBadgeStatus, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import { OpenRegular, EditRegular, FolderRegular, VideoRegular, PeopleRegular, DocumentPdfRegular } from "@fluentui/react-icons";
import { ITableStructure } from '../interfaces/ITableStructure';
import { PenRegular ,Checkmark20Regular , Dismiss20Regular, NumberSymbol20Regular ,Key20Regular,KeyMultiple20Regular } from "@fluentui/react-icons";
import { GetIconsByDataType } from '../utils/funtionsHelper';

export interface IResult{
    items:ITableStructure[],
    // button:ReactNode,
    onButtonClick: (item: ITableStructure) => void;
}

const ResultTableComponent = ({
    items,
    // button,
    onButtonClick
}:IResult) => {

    const columns = [
        // { columnKey: "tableName", label: "Tabla" },
        { columnKey: "columnName", label: "Nombre", labelWidth: '200px' },
        { columnKey: "dataType", label: "Tipo Dato", labelWidth: '200px' },
        { columnKey: "maxLength", label: "Longitud Máxima", labelWidth: '140px' },
        { columnKey: "isNullable", label: "es nulo?", labelWidth: '120px' },
        { columnKey: "defaultValue", label: "Valor Predeterminado", labelWidth: '200px' },
        { columnKey: "columnDescription", label: "Descripción", labelWidth: '200px' },
        { columnKey: "isPrimaryKey", label: "Llave Primaria", labelWidth: '140px' },
        { columnKey: "isForeignKey", label: "Referencia", labelWidth: '140px' },
        { columnKey: "", label: "", labelWidth: '200px'},
    ];

    return (
        <div style={{overflowX: "auto", maxWidth: "100%"}}>
            <Table arial-label="Default table" style={{ minWidth: "800px", tableLayout: "fixed", width: "100%"}}>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHeaderCell key={column.columnKey}  style={{width: column.labelWidth ?? "100px" }}>
                                {column.label}
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={crypto.randomUUID()}>
                            <TableCell style={{width: "100px"}}>
                                <TableCellLayout>
                                    {item.columnName}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell  style={{width: "100px" }}>
                                <TableCellLayout>
                                    { GetIconsByDataType(item.dataType) }
                                    {item.dataType}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell  style={{width: "100px"  }}>
                                <TableCellLayout>
                                    {item.maxLength}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell  style={{width: "100px" }}>
                                <TableCellLayout>
                                    {item.isNullable === 'YES' ? <Checkmark20Regular />  :  <Dismiss20Regular />}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell  style={{width: "100px" }}>
                                <TableCellLayout>
                                    {item.defaultValue}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell  style={{width: "100px" }}>
                                <TableCellLayout>
                                    {item.columnDescription ?? "sin descripción"}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell  style={{width: "100px" }}>
                                <TableCellLayout>
                                     { item.isPrimaryKey ?   <Key20Regular /> : null }
                                    {item.isPrimaryKey}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell  style={{width: "100px" }}>
                                <TableCellLayout>
                                    {item.isForeignKey ? <KeyMultiple20Regular /> : null}
                                    {item.isForeignKey}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell  style={{width: "100px" }}>
                                <TableCellLayout>
                                    <Button appearance='primary' onClick={() => onButtonClick(item)} icon={<PenRegular style={{color:'white'}} />}/>
                                    {/* {button} */}
                                </TableCellLayout>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export {
    ResultTableComponent as ResultTable
};