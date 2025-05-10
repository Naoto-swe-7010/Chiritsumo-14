const Layout = ({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div>
      {/* メインページの内容 */}
      {children}
      {/* モーダル用のParallelRoute */}
      {modal}
    </div>
  );
};

export default Layout;
