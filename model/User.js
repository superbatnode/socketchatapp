const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema({
  username: String,
  password: String,
});
const UserModel = mongoose.model("User", schema);

class User {
  static async saveUser(username, password) {
    if(await this.getUser(username))
    throw new Error("user already exists");
    try {
      const user = new UserModel({
        username,
        password: await bcrypt.hash(password, 2),
      });
      return await user.save();
    } catch (e) {
      throw new Error(e);
    }
  }
  static async getUser(username) {
    try {
      return await UserModel.findOne({ username });
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = User;
