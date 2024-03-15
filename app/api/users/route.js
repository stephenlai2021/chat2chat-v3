import User from "@/models/User";
import { NextResponse } from "next/server";
import connect from "@/lib/mongodb/connect";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users " + error, {
      status: 500,
    });
  }
};

export const PUT = async (req) => {
  const body = await req.json()
  const { name, email, avatarUrl } = body;
  console.log('name: ', name, ' email: ', email)
  // const { name, email, avatarUrl } = await req.json();
  try {
    await connect();
    // 透過 userId 更新用戶名稱和頭像圖標
    // const userToUpdate = await User.findById(_id)
    const userToUpdate = await User.where({ email }).findOne();
    if (!userToUpdate) {
      return new Response({ message: "User not found" }, { status: 404 });
    }
    userToUpdate.avatarUrl = avatarUrl;
    await userToUpdate.save();

    return new Response(JSON.stringify(userToUpdate), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update user", { status: 500 });
  }
};
