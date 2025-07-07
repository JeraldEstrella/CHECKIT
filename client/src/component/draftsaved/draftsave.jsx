import "./Draftsave.css";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";

const Draftsave = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>Saved Drafts</h3>

      <p>Your draft posts will appear here.</p>

      <div className="items">
        <div className="draft-item">
          <div>
            <span className="draft-title">
              <b>Editing:</b> Title
            </span>
            <span className="draft-time">
              <b>Last Edited:</b> 2023-10-01 12:00 PM
            </span>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="icon-btn" title="Edit">
              <EditIcon />
            </button>
            <button className="icon-btn" title="Delete">
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Draftsave;
