import { EmployeeTable } from "./components/EmployeeTable"
import { NavigationBar } from "./components/Navbar"

export const App = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <EmployeeTable />
      </div>
    </div>
  )
}
