import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: String,
  name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

if (mongoose.models.User) {
  mongoose.deleteModel("User");
}

export default mongoose.model("User", UserSchema);
