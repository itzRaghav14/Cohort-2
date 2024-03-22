import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const new_user = await client.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });

  console.log(new_user);

  return Response.json({
    message: "User created successfully!",
  });
}

