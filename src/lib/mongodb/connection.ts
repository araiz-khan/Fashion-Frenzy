import mongoose, { Connection } from "mongoose";

const USERS_MONGODB_URI = process.env.USERS_MONGODB_URI;
const PRODUCTS_MONGODB_URI = process.env.PRODUCTS_MONGODB_URI;

if (!USERS_MONGODB_URI || !PRODUCTS_MONGODB_URI) {
  throw new Error("Missing USERS_MONGODB_URI or PRODUCTS_MONGODB_URI in environment.");
}

type MongooseConnectionCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

let cachedUsers = (global as any).mongooseUsers as MongooseConnectionCache;
let cachedProducts = (global as any).mongooseProducts as MongooseConnectionCache;

if (!cachedUsers) {
  cachedUsers = (global as any).mongooseUsers = { conn: null, promise: null };
}

if (!cachedProducts) {
  cachedProducts = (global as any).mongooseProducts = { conn: null, promise: null };
}

export async function connectToUsersDb(): Promise<Connection> {
  if (cachedUsers.conn) return cachedUsers.conn;

  if (!cachedUsers.promise) {
    cachedUsers.promise = mongoose.createConnection(USERS_MONGODB_URI!).asPromise();
  }

  cachedUsers.conn = await cachedUsers.promise;
  return cachedUsers.conn;
}

export async function connectToProductsDb(): Promise<Connection> {
  if (cachedProducts.conn) return cachedProducts.conn;

  if (!cachedProducts.promise) {
    cachedProducts.promise = mongoose.createConnection(PRODUCTS_MONGODB_URI!).asPromise();
  }

  cachedProducts.conn = await cachedProducts.promise;
  return cachedProducts.conn;
}
