import React, { useEffect, useState } from "react";
import debug from "sabio-debug";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import * as businessService from "../../services/businessService.js";
import toastr from "toastr";
import MapTable from "./MapTable.jsx";
const _logger = debug.extend("business");

function BusinessConfirmation() {
  const [busiReq, setBusiReq] = useState({
    originalRequests: [],
    displayedRequests: [],
  });

  const busiStatus = 3;
  const busiRole = 6;
  useEffect(() => {
    businessService
      .getStatusRoleId(busiStatus, busiRole)
      .then(pageSuccess)
      .catch(pageError);
  }, []);
  const pageSuccess = (response) => {
    let approvalsArray = response.items;
    setBusiReq((prevState) => {
      const approveData = { ...prevState };
      approveData.originalRequests = approvalsArray;
      approveData.displayedRequests = approvalsArray.map(mappedPage);
      return approveData;
    });
  };
  const pageError = (error) => {
    _logger("Error fetching approvals", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to retrieve members.",
    });
  };

  const mappedPage = (render) => {
    return (
      <MapTable
        key={"List-A" + render.id}
        rejectStatusChange={rejectStatusChange}
        handleStatusChange={handleStatusChange}
        render={render}
        formatDate={formatDate}
      />
    );
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const rejectStatusChange = (render) => {
    Swal.fire({
      title: "Are you sure you want to remove this Account?",
      showCancelButton: true,
      confirmButtonText: "Remove",
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        businessService
          .businessReject(render.id, render.firstName, render.email)
          .then(() => {
            _logger("reject table updated successfully");
            setBusiReq((prevState) => {
              const newId = { ...prevState };
              var filtered = newId.originalRequests.filter(
                (item) => item.id !== render.id
              );
              newId.originalRequests = filtered;
              newId.displayedRequests = filtered.map(mappedPage);
              return newId;
            });
            Swal.fire("Rejected", "This account has been Rejected", "success");
          })
          .catch(rejectError);
      }
    });
  };
  const rejectError = (error) => {
    _logger("Error rejecting account", error);
    Swal.fire("Error", `Failed to update status.`, "error");
  };
  const handleStatusChange = (render) => {
    businessService
      .updateStatus(render.id, render.firstName, render.email)
      .then(() => {
        _logger("approve table updated successfully");
        setBusiReq((prevState) => {
          const newId = { ...prevState };
          var filtered = newId.originalRequests.filter(
            (item) => item.id !== render.id
          );
          newId.originalRequests = filtered;
          newId.displayedRequests = filtered.map(mappedPage);
          return newId;
        });
        Swal.fire("Approved", "This account has been Approved", "success");
      })
      .catch(statChangeError);
  };
  const statChangeError = (response) => {
    toastr.error("failed to change status");
    _logger(`Status change requested for`, response);
  };
  return (
    <div>
      <Table variant="primary" className="text-nowrap">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Date of Request</th>
            <th scope="col">Status of approval</th>
          </tr>
        </thead>
        <tbody>{busiReq.displayedRequests}</tbody>
      </Table>
    </div>
  );
}
export default BusinessConfirmation;
