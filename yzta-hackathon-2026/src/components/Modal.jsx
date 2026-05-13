import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          width: 90%;
          max-width: 500px;
          background: white;
          border-radius: var(--radius-xl);
          padding: 2rem;
          box-shadow: var(--shadow-xl);
          animation: modalAppear 0.3s ease-out;
        }

        @keyframes modalAppear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: var(--radius-md);
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: var(--background-color);
          color: var(--text-primary);
        }

        .modal-body {
          max-height: 70vh;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default Modal;
