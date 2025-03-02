import dbConnection from "@/lib/dbConnect";
import User from "@/models/users";

export async function GET(req) {
  await dbConnection();

  const userId = req.nextUrl.searchParams.get("userId");

  const user = await User.findOne({ userId: userId });

  return Response.json(user, { status: 200 });
}

export async function POST(req) {
  await dbConnection();

  const { userId, email, name, image } = await req.json();
  // console.log("userId: ", userId);
  // console.log("body: ", email, name, image);

  const user = await User.findOne({ userId: userId });

  if (user) {
    user.name = name ? name : "";
    image ? (user.image = image) : "";
    // console.log("edited user: ", user);

    await user.save();

    return Response.json(user);
  } else {
    const user = new User({
      userId: userId,
      email: email,
      name: name ? name : "",
      image: image ? image : {},
    });

    await user.save();

    return Response.json(user, { status: 200 });
  }
}
