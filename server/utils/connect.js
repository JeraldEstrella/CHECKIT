import mongoose from "mongoose";

const connection = {isConnected: null};

export const connectToDatabase = async () => {
    try {
        if(connection.isConnected){
            console.log("Already connected to the database");
            return;
        }

        const db = await mongoose.connect(process.env.MONGO_URL,{
            dbName: "CheckIT",
        });

        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};