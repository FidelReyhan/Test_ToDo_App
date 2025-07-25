"use client";

import ncrypt from "ncrypt-js";

import * as dotenv from "dotenv";
const config = dotenv.config();

const secretKey = config.parsed?.SECRET_KEY || "";

const nc = new ncrypt(secretKey);

function encrypt(text: string): string {
  return nc.encrypt(text);
}

function decrypt(text: string): string {
  return String(nc.decrypt(text));
}

export { decrypt, encrypt };
