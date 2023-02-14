import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "antd";
import { loadSelections } from "../selectionActions";

const SelectionHistory = () => {
  const dispatch = useDispatch();

  const selectionHistory = useSelector(
    (state) => state.selections.selectionHistory
  );

  useEffect(() => {
    dispatch(loadSelections());
  }, []);

  useEffect(() => {
    //console.log(selectionHistory);
  }, [selectionHistory]);

  return (
    <div>
      {selectionHistory.length !== 0 ? (
        <List
          header={
            <div style={{ fontWeight: "bold" }}>
              List of Accessed Places ฅ^•ﻌ•^ฅ
            </div>
          }
          bordered
          dataSource={selectionHistory}
          renderItem={(item) => (
            <List.Item>{item.result.formatted_address}</List.Item>
          )}
        />
      ) : (
        <List
          header={
            <div style={{ fontWeight: "bold" }}>
              List of Accessed Places ฅ^•ﻌ•^ฅ
            </div>
          }
          bordered
          dataSource={selectionHistory}
          renderItem={(item) => (
            <List.Item>Select a location pwease :3</List.Item>
          )}
        />
      )}
    </div>
  );
};

export default SelectionHistory;
