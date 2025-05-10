const Layout = ({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div>
      {children}
      {/* モーダル用のParallelRoute */}
      {modal}
    </div>
  );
};

export default Layout;
