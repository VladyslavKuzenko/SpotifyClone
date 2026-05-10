const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

export default MainLayout