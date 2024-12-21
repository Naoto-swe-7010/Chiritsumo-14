// 編集/削除ページにて使用
const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6">
      <div className="relative w-full max-w-sm rounded-lg bg-gray-800 p-4 text-white shadow-lg sm:max-w-md sm:p-6 md:max-w-lg lg:max-w-xl">
        {children}
      </div>
    </div>
  );
};

export default Modal;
