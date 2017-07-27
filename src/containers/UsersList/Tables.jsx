import React, {Component, PropTypes} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


let Body = ({headers, singleRecord,selected,...otherProps}) => <TableRow selected={selected} { ...otherProps }>
    {otherProps.children[0]}
    {
        /* set order and preferred items  */
        headers.map((el, i)=><TableRowColumn key={i}>{singleRecord[el['data_key']]}</TableRowColumn>)
    }
</TableRow>;

let Header = ({headers,...otherProps}) => <TableRow { ...otherProps }>
    {otherProps.children[0]}
    {
        headers.map((el,i)=><TableHeaderColumn key={i}>{el.name}</TableHeaderColumn>)
    }
</TableRow>;

let Tables = ({handleRowSelection, headers, sampleArray,selected}) => {
    return <Table onRowSelection={handleRowSelection}>
        <TableHeader>
            <Header  headers={headers} />
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
            {
                sampleArray.map((singleRecord, i)=><Body
                    headers={headers}
                    singleRecord={singleRecord}
                    key={i}
                    selected={selected(i)}
                />)
            }
        </TableBody>
    </Table>
};

export default Tables;

