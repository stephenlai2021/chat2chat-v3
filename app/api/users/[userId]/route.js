import { NextResponse } from "next/server";
import connect from "@/lib/mongodb/connect";
import User from "@/models/User";

// req cannot be omitted !!!
export const GET = async (req, { params }) => {
  const { userId } = params;
  try {
    await connect();
    const user = await User.findById(userId);
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching user " + error, {
      status: 500,
    });
  }
};
