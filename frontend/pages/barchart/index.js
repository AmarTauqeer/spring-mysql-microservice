import React, { useEffect } from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";



export const options = {
    title: "Department and Employees",
    // is3D: true,
    pieHole: 0.4,
  };

const Baarchart = (props) => {
  const { department, employee } = props;
  const [data, setData] = useState(
//     [
//     ["Department", "no of employee"],
//     ["Sales", 1],
//     ["Purchase", 2],
   
//   ]
  );
      
  useEffect(() => {
    if (
      department !== null &&
      department !== undefined &&
      employee !== null &&
      employee !== undefined
    ) {
      let arr = [];
      arr.push(["Department", "no of employee"],)
      department.map((d) => {
        let countEmployee = 0;
        employee.map((e) => {
          if (e.departmentId == d.id) {
            countEmployee += 1;
          }
        });
        arr.push([d.departmentName, countEmployee],);
      });
      setData(arr);
    }
  }, [props]);

  return (
    <>
      {data !== undefined && (
        <>
          <Chart
            chartType="PieChart"
            data={data}
            width="100%"
            height="300px"
            options={options}
            legendToggle
          />
        </>
      )}
    </>
  );
};

export default Baarchart;
