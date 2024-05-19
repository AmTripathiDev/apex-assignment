import "./all-scenerio-container.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../../icons/close.svg";
import { Vehicle } from "../../model/vehicle";
import { Scenerio } from "../../model/scenerio";
import Dialog from "../../components/dialog/dialog";
import AddIcon from "../../icons/add.svg";
import EditIcon from "../../icons/edit.svg";
import DeleteIcon from "../../icons/delete.svg";
import axios from "axios";
import NoDataScreen from "../../components/noData/no-data-screen";

const ScenerioDataScreen = () => {
  const BaseUrl = "http://localhost:5000";
  const [allScenerio, setAllScenerio] = useState<Scenerio[] | []>([]);
  const navigate = useNavigate();

  const deleteScenerio = async (itemId: any) => {
    console.log(itemId, " items id ");
    const del_scenerio = await axios.delete(
      `${BaseUrl}/api/scenerio/delete/${itemId}`
    );
    console.log(del_scenerio);
  };

  useEffect(() => {
    const fetchScenerios = async () => {
      const all_Scenerio = await axios.get(`${BaseUrl}/api/scenerio/all`);
      setAllScenerio(all_Scenerio.data);
    };
    fetchScenerios();
  }, [deleteScenerio]);

  return (
    <div className="data-screen">
      {allScenerio.length ? (
        <>
          <header>
            <h2>All Items</h2>
            <div className="header-actions">
              <button onClick={() => navigate("/add/scenerio")}>
                New Scenerio
              </button>
              <button onClick={() => navigate("/add/vehicle")}>
                Add Vehicle
              </button>
              <button>Delete All</button>
            </div>
          </header>
          <main className="data-table">
            <div className="table-header">
              <span>Scenerio Id</span>
              <span>Scenerio Name</span>
              <span>Scenerio Time</span>
              <span>Number of vehicles</span>
              <span>Add vehicles</span>
              <span>Edit</span>
              <span>Delete</span>
            </div>
            {allScenerio.map((item, index) => (
              <div className="data-table-item">
                <span>{item.id}</span>
                <span>{item?.scenerioName}</span>
                <span>{item?.scenerioTime}</span>
                <span>{item?.vehicles?.length}</span>
                <span>
                  <img
                    src={AddIcon}
                    alt="Add"
                    height={20}
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/add/vehicle/${item.id}`);
                    }}
                  />
                </span>
                <span>
                  <img
                    src={EditIcon}
                    alt="Edit"
                    height={20}
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/edit/scenerio/${item.id}`);
                    }}
                  />
                </span>
                <span>
                  <img
                    src={DeleteIcon}
                    alt="Delete"
                    height={35}
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteScenerio(item.id);
                    }}
                  />
                </span>
              </div>
            ))}
          </main>
        </>
      ) : (
        <NoDataScreen />
      )}
    </div>
  );
};

export default ScenerioDataScreen;
