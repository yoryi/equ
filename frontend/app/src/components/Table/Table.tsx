import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact"
import React from "react"

interface TableProps {
  headValues: string[]
  body: any
}

const Table: React.FC<TableProps> = ({ headValues, body }) => (
  <MDBTable>
    <MDBTableHead>
      <tr>
        {headValues.map((head) => (
          <th>{head}</th>
        ))}
      </tr>
    </MDBTableHead>
    <MDBTableBody>{body}</MDBTableBody>
  </MDBTable>
)

export default Table
