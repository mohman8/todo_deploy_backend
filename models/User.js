import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
    minlength: 8,
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format ",
    },
    unique: "true",
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  tasks: [
    {
      type: String,
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password"))
    return (
      next(),
      (this.password = await bcrypt.hash(this.password, 12)),
      (this.passwordConfirm = undefined),
      next()
    );
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {};
const user = mongoose.model("User", UserSchema);
export default user;
