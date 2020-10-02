import React, { useState, useEffect } from "react";
import API from "../utils/api";
import SearchForm from "../components/Search";



export default function Employees() {
  const [employeeState, setEmployeeState] = useState({
    employees: [],
    filteredEmployees: [],
  });

  useEffect(() => {
    API.getUsers().then((res) => {
      setEmployeeState({
        ...employeeState,
        employees: res.data.results,
        filteredEmployees: res.data.results,
      });
    });
  }, []);

  const employeeSearch = (e) => {
    let searchValue = e.target.value;
    searchValue = searchValue.toLowerCase();
    let searchResults = [...employeeState.employees];
    searchResults = searchResults.filter((employee) => {
      let fullName = `${employee.name.first}${employee.name.last}`.toLowerCase();
      return fullName.includes(searchValue);
    });
    setEmployeeState({ ...employeeState, filteredEmployees: searchResults });
  };


  return (
    <div id="container">
      <SearchForm employeeSearch={employeeSearch} />
      <table className="highlight centered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Cell Number</th>
            <th>Email</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {employeeState.filteredEmployees.map((user) => (
            <tr>
              <img src={user.picture.medium} alt="" />
              <td>
                {`${user.name.first}
                ${user.name.last}`}
              </td>
              <td>{user.cell}</td>
              <td>{user.email}</td>
              <td>{new Date(user.dob.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}