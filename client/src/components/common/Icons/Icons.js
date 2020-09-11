import React from 'react';

export const EditIcon = ({ onEditClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-edit cursor-pointer"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#FF9800"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onEditClick}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
    <line x1="16" y1="5" x2="19" y2="8" />
  </svg>
);

export const TrashIcon = ({ onDeleteClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-trash cursor-pointer"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#FF9800"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onDeleteClick}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>
);

export const EyeIcon = ({ onViewClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-eye cursor-pointer"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#FF9800"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onViewClick}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <circle cx="12" cy="12" r="2" />
    <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
    <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
  </svg>
);
