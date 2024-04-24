import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
