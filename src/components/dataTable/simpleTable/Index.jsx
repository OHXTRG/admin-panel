import React, { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDeleteModal from "../../Modals/DeleteModal/Index";
import "./simpleTable.css";

const Index = ({ rows, columns, deleteHandler, loading }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const deleteData = useRef(null);
  return (
    <>
      <table className="simple-table">
        <thead>
          <tr>
            {columns.map((item, index) => (
              <th
                key={`table-head-users-${index}`}
                style={item?.width ? { width: item.width } : {}}
              >
                {item.lable}
              </th>
            ))}
          </tr>
        </thead>
        {loading ? (
          "...loading"
        ) : (
          // <tbody>
          //   {rows.map((item, index) => (
          //     <tr key={item.id} className="">
          //       <td>{item[columns[0]]}</td>
          //       <td style={{ wordBreak: "break-all" }}>{item[columns[0]]}</td>
          //       <td>
          //         {columns
          //           .filter((head) => head.name == "action")?.[0]
          //           ["actions"].map((action) => {
          //             if (action.name == "Delete") {
          //               return (
          //                 <IconButton
          //                   onClick={() => {
          //                     deleteData.current = item;
          //                     setOpenDelete(true);
          //                   }}
          //                 >
          //                   <DeleteIcon
          //                     sx={{
          //                       color: "#3758F9",
          //                       height: "20px",
          //                       width: "20px",
          //                     }}
          //                   />
          //                 </IconButton>
          //               );
          //             } else if (action.name == "View") {
          //               return (
          //                 <IconButton
          //                   onClick={() => {
          //                     navigate(
          //                       `${action.navigate}/${item.id}?page=${page + 1}`
          //                     );
          //                   }}
          //                 >
          //                   <VisibilityIcon
          //                     sx={{
          //                       height: "20px",
          //                       width: "20px",
          //                       color: "#3758F9",
          //                     }}
          //                   />
          //                 </IconButton>
          //               );
          //             }
          //           })}
          //       </td>
          //     </tr>
          //   ))}
          // </tbody>
          <tbody>
            {rows.map((item, index) => (
              <tr key={item.id} className="">
                {columns.map((col) => {
                  if (col.name == "action") {
                    return (
                      <td style={col?.width ? { width: col.width } : {}}>
                        {columns
                          .filter((head) => head.name == "action")?.[0]
                          ["actions"].map((action) => {
                            if (action.name == "Delete") {
                              return (
                                <IconButton
                                  onClick={() => {
                                    deleteData.current = item;
                                    setOpenDelete(true);
                                  }}
                                >
                                  <DeleteIcon
                                    sx={{
                                      color: "#3758F9",
                                      height: "20px",
                                      width: "20px",
                                    }}
                                  />
                                </IconButton>
                              );
                            } else if (action.name == "View") {
                              return (
                                <IconButton
                                  onClick={() => {
                                    navigate(
                                      `${action.navigate}/${item.id}?page=${
                                        page + 1
                                      }`
                                    );
                                  }}
                                >
                                  <VisibilityIcon
                                    sx={{
                                      height: "20px",
                                      width: "20px",
                                      color: "#3758F9",
                                    }}
                                  />
                                </IconButton>
                              );
                            }
                          })}
                      </td>
                    );
                  }
                  if (col.type == "img") {
                    return (
                      <td style={col?.width ? { width: col.width } : {}}>
                        <div className="img-wrapper">
                          <img src={item[col.name]} className="img-class" />
                        </div>
                      </td>
                    );
                  } else {
                    return (
                      <td style={col?.width ? { width: col.width } : {}}>
                        <p>{item[col.name]}</p>
                      </td>
                    );
                  }
                })}
                {/* <td>{item[columns[0]]}</td>
                <td style={{ wordBreak: "break-all" }}>{item[columns[0]]}</td>
                <td>
                  {columns
                    .filter((head) => head.name == "action")?.[0]
                    ["actions"].map((action) => {
                      if (action.name == "Delete") {
                        return (
                          <IconButton
                            onClick={() => {
                              deleteData.current = item;
                              setOpenDelete(true);
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                color: "#3758F9",
                                height: "20px",
                                width: "20px",
                              }}
                            />
                          </IconButton>
                        );
                      } else if (action.name == "View") {
                        return (
                          <IconButton
                            onClick={() => {
                              navigate(
                                `${action.navigate}/${item.id}?page=${page + 1}`
                              );
                            }}
                          >
                            <VisibilityIcon
                              sx={{
                                height: "20px",
                                width: "20px",
                                color: "#3758F9",
                              }}
                            />
                          </IconButton>
                        );
                      }
                    })}
                </td> */}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <ConfirmDeleteModal
        open={openDelete}
        setClose={setOpenDelete}
        actionHandler={deleteHandler.func}
        message={deleteHandler.message}
        data={deleteData.current}
      />
    </>
  );
};

export default Index;
