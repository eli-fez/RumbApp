import React from "react";
import propTypes from "prop-types";
function MapTable(props) {
  const { render, handleStatusChange, rejectStatusChange, formatDate } = props;
  const statusApprove = () => handleStatusChange(render);
  const statusReject = () => rejectStatusChange(render);
  return (
    <tr key={render.id}>
      <td>{render.email}</td>
      <td>{formatDate(render.dateCreated)}</td>
      <td>
        <button className="btn btn-sm btn-success" onClick={statusApprove}>
          Approve
        </button>
        <button className=" btn btn-sm ms-3 btn-danger" onClick={statusReject}>
          Reject
        </button>
      </td>
    </tr>
  );
}
MapTable.propTypes = {
  render: propTypes.shape({
    id: propTypes.number.isRequired,
    email: propTypes.string.isRequired,
    firstName: propTypes.string.isRequired,
    dateCreated: propTypes.string.isRequired,
  }).isRequired,
  handleStatusChange: propTypes.func.isRequired,
  rejectStatusChange: propTypes.func.isRequired,
  formatDate: propTypes.func.isRequired,
};

export default MapTable;
