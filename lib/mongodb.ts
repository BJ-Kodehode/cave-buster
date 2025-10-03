import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("⚠️  MONGODB_URI environment variable is not defined. Database features will be disabled.");
  console.warn("   Please set up your MongoDB connection in .env.local");
  console.warn("   See SETUP.md for instructions.");
}

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Declare the global variable with proper typing
declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Connection> {
  // If no MongoDB URI is provided, throw a more user-friendly error
  if (!MONGODB_URI) {
    throw new Error(
      "MongoDB connection not configured. Please add MONGODB_URI to your .env.local file. See SETUP.md for instructions."
    );
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose.connection;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    console.error("❌ MongoDB connection error:", e);
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
