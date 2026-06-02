import { createContext, useState } from "react";

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);

  const addSubmission = (paper) => {
    setSubmissions((prevSubmissions) => [
      ...prevSubmissions,
      {
        id: Date.now(),
        status: "Submitted",
        reviewer: null,
        ...paper,
      },
    ]);
  };

  const updateStatus = (id, newStatus) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((paper) =>
        paper.id === id ? { ...paper, status: newStatus } : paper
      )
    );
  };

  const assignReviewer = (id, reviewerName) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((paper) =>
        paper.id === id ? { ...paper, reviewer: reviewerName } : paper
      )
    );
  };

  return (
    <JournalContext.Provider
      value={{ submissions, addSubmission, updateStatus, assignReviewer }}
    >
      {children}
    </JournalContext.Provider>
  );
};
