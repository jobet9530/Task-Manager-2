import React, { useState } from "react";
import { useDatabase } from "./useDatabase";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Database } from "sqlite";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const database = userDatabase();

  const handleLogin = async () => {
    try{
      const = await database.getUser(email, password);
      console.log("Login successful:",);
    }
    catch(error){
      console.log(error); 
    }
  }

  return (
   <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Login</Text>

   </SafeAreaView> 
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, 
  }
})
