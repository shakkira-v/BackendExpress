import mongoose from "mongoose";
export default async function collection() {
    const db = await mongoose.connect(
      `mongodb+srv://shakkira111_db_user:SsQvl7N20f2oISOi@cluster0.pgtelan.mongodb.net/BACKENDEXPRESS`,
    );
    console.log("Database created");


    return db;
    
}