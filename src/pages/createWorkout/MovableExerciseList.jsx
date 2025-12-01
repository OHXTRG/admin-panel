import React from "react";
import { List, arrayMove } from "react-movable";
import ExerciseListComponent from "./ExerciseListComponent";
import { ExpandRounded } from "@mui/icons-material";
import { Box } from "@mui/material";

const MovableExerciseList = ({
  exerciseList,
  setExerciseList,
  options,
  formik,
}) => {
  const [items, setItems] = React.useState(
    Array.from(Array(100).keys()).map((val) => `Item ${val}`)
  );
  return (
    <List
      lockVertically
      values={exerciseList}
      // values={items}
      onChange={
        ({ oldIndex, newIndex }) =>
          setExerciseList(arrayMove(exerciseList, oldIndex, newIndex))
        // setExerciseList(arrayMove(items, oldIndex, newIndex))
      }
      renderList={({ children, props }) => (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "0",
          }}
          {...props}
        >
          {children}
        </ul>
      )}
      renderItem={({ value, props }) => (
        <li
          //  key={value.list_id}
          {...props}
          style={{ listStyle: "none" }}
        >
          <ExerciseListComponent
            //   {...props}
            options={options}
            formik={formik}
            exerciseItem={value}
            setExerciseList={setExerciseList}
            exerciseList={exerciseList}
          />
          {/* {value} */}
        </li>
      )}
    />
    // exerciseList.map((item, index) => (
    //   <ExerciseListComponent
    //     options={options}
    //     setExerciseList={setExerciseList}
    //     exerciseList={exerciseList}
    //     formik={formik}
    //     exerciseItem={item}
    //   />
    // ))
  );
};

export default MovableExerciseList;
