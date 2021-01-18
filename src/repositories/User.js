class User {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async getAll(...args) {
    const users = await this.UserModel.findAll(...args);
    return users;
  }
}

module.exports = User;
