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

  const tableUser = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS User(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)",
        )
    })
  };

  const addTask(title, description, status) {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)", 
      [title, description, status],
      (_, { rowsAffected, }) => {
        if (rowsAffected.isEmpty()){
          console.log("Task added successfully");
        }
        else{
          console.log("Failed to add task");
        }
      },
      (_, error) => {
        console.log(error);
      }
      );
    })
  }

  const getTasks = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM tasks",
          [],
          (_, { rows }) => {
            resolve(rows);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  const deleteTask = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Task deleted successfully");
          } else {
            console.log("Failed to delete task");
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  }

  const updateTask = (id, title, description, status) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
        [title, description, status, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Task updated successfully");
          } else {
            console.log("Failed to update task");
          }
        },
        (_, error) => {
          console.log(error);
        }
      );
    });

    const addUser = (name, email, password) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
          [name, email, password],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log("User added successfully");
            } else {
              console.log("Failed to add user");
            }
          },
          (_, error) => {
            console.log(error);
          }
        );
      }); 
    }
  }

  return { tableUser, addTask, getTasks, deleteTask, updateTask };

};
