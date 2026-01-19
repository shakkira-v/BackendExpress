import mongoose from "mongoose";
export default async function collection() {
    const db = await mongoose.connect(
      `mongodb+srv://shakkiraventhodi_db_user:Alliswell123@cluster0.7h2xfia.mongodb.net/BACKENDEXPRESS`,
    );
    console.log("Database created");


    return db;
    
}