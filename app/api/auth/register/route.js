import User from "@/models/User";
import connect from "@/lib/mongodb/connect";
import { hash } from "bcryptjs";

export const POST = async (req, res) => {
  try {
    await connect();
    const body = await req.json();
    const { name, email, password, avatarUrl } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", {
        status: 400,
      });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a user", {
      status: 500,
    });
  }
};
