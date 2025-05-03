const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="-mx-[8%] -my-24 bg-gray-200 pt-24 sm:-mx-[6%]">
      {children}
    </div>
  );
};

export default Layout;
