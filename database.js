import React, { useEffect } from "react";
import * as SQLite from "expo-sqlite";

export const useDatabase = () => {
  const db = SQLite.openDatabase("task.db");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, status INTEGER)",
      );
    });
  }, []);
};
