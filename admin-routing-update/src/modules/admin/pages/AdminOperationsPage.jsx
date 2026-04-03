import { useEffect, useRef, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import {
  approvalRows,
  operationsTiles,
  requestRows,
  salespersonOptions
} from "../data/adminOperationsData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminOperationsCss from "../styles/admin_operations.css?raw";

export default function AdminOperationsPage() {
  useAdminPageStyles({ pageKey: "operations", pageCssText: adminOperationsCss });
  const [activeCard, setActiveCard] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedSalesperson, setSelectedSalesperson] = useState("Select Salesperson");
  const [popupMessage, setPopupMessage] = useState("");
  const popupTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, []);

  function showPopup(message) {
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }

    setPopupMessage(message);
    popupTimerRef.current = setTimeout(() => {
      setPopupMessage("");
      popupTimerRef.current = null;
    }, 3000);
  }

  function sendEmail() {
    showPopup("Email sent successfully");
  }

  function assign() {
    setIsAssignModalOpen(false);
    showPopup("Salesperson assigned successfully");
  }

  return (
    <>
      <AdminHeader adminName="Admin" />

      <div className="page">
        <div className="page-header">
          <h2>
            <i className="fa fa-gears"></i>Operations
          </h2>
        </div>

        <div className="tiles">
          {operationsTiles.map((tile) => (
            <div
              key={tile.key}
              className="tile"
              onClick={() => {
                setActiveCard(tile.key);
              }}
            >
              <i className={tile.iconClass}></i>
              <h3>{tile.title}</h3>
              <p>{tile.description}</p>
            </div>
          ))}
        </div>

        <div className="card" id="approvalCard" style={{ display: activeCard === "approval" ? "block" : "none" }}>
          <h3>Approval List</h3>
          <br />
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Reference</th>
                <th>Requested By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvalRows.map((row) => (
                <tr key={`${row.type}-${row.reference}`}>
                  <td>{row.type}</td>
                  <td>{row.reference}</td>
                  <td>{row.requestedBy}</td>
                  <td>
                    <button className="btn approve" type="button">
                      Approve
                    </button>{" "}
                    <button
                      className="btn email"
                      type="button"
                      onClick={() => {
                        sendEmail();
                      }}
                    >
                      Send Email
                    </button>{" "}
                    <button
                      className="btn assign"
                      type="button"
                      onClick={() => {
                        setIsAssignModalOpen(true);
                      }}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" id="requestCard" style={{ display: activeCard === "request" ? "block" : "none" }}>
          <h3>Request Form</h3>
          <br />
          <table>
            <thead>
              <tr>
                <th>Request Type</th>
                <th>Reference</th>
                <th>From</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requestRows.map((row) => (
                <tr key={`${row.requestType}-${row.reference}`}>
                  <td>{row.requestType}</td>
                  <td>{row.reference}</td>
                  <td>{row.from}</td>
                  <td>
                    <button className="btn view" type="button">
                      View
                    </button>{" "}
                    <button
                      className="btn email"
                      type="button"
                      onClick={() => {
                        sendEmail();
                      }}
                    >
                      Send Email
                    </button>{" "}
                    <button
                      className="btn assign"
                      type="button"
                      onClick={() => {
                        setIsAssignModalOpen(true);
                      }}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal"
        id="assignModal"
        style={{ display: isAssignModalOpen ? "flex" : "none" }}
        onClick={(event) => {
          if (event.target.id === "assignModal") {
            setIsAssignModalOpen(false);
          }
        }}
      >
        <div className="modal-content">
          <h3>Assign Salesperson</h3>
          <select
            value={selectedSalesperson}
            onChange={(event) => {
              setSelectedSalesperson(event.target.value);
            }}
          >
            <option>Select Salesperson</option>
            {salespersonOptions.map((salesperson) => (
              <option key={salesperson}>{salesperson}</option>
            ))}
          </select>
          <button className="btn approve" type="button" onClick={assign}>
            Assign
          </button>
        </div>
      </div>

      <div className="popup" id="popup" style={{ display: popupMessage ? "block" : "none" }}>
        {popupMessage}
      </div>
    </>
  );
}
