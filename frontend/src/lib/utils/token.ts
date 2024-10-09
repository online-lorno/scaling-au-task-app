import { NextRequest } from "next/server";

export const getTokenFromRequest = (request: NextRequest) => {
  return request.cookies.get("token")?.value || null; // Adjust based on where you store the token
};
