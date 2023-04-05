import React from "react";
import Table from 'react-bootstrap/Table';

export default function TableComp({data}) {

    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>pH</th>
              <th>Sertlik</th>
              <th>Bikarbonat</th>
            </tr>
          </thead>
          <tbody>
            <tr>          
              <td>1</td>    
              <td>{data.ph}</td>
              <td>{data.bikarbonat}</td>
              <td>{data.sertlik}</td>
            </tr>
          </tbody>
        </Table>
      );
}

