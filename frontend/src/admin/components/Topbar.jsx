function Topbar() {
  return (
    <div className="bg-white shadow-md h-14 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <button className="bg-red-500 text-white px-3 py-1 rounded-md">Logout</button>
    </div>
  );
}

export default Topbar;
