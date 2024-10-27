import { connectToDatabase } from "@/utils/db"; 
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      try {
        const { db } = await connectToDatabase();
        const result = await db.collection("termsAcceptance").updateOne(
          { userId },
          { $set: { acceptedAt: new Date() } },
          { upsert: true }
        );
  
        return res.status(200).json({ message: "Terms accepted" });
      } catch (error) {
        console.error("Error saving acceptance:", error);
        return res.status(500).json({ message: "An error occurred while saving acceptance" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
