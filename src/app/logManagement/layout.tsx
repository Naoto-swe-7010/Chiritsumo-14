import React from "react";

const layout = ({
  children,
  EditModal,
  DeleteModal,
}: {
  children: React.ReactNode;
  EditModal: React.ReactNode;
  DeleteModal: React.ReactNode;
}) => {
  return (
    <div>
      {children}
      {EditModal}
      {DeleteModal}
    </div>
  );
};

export default layout;
