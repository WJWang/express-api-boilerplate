class UserService {
  constructor({ usersRepository }) {
    this.usersRepository = usersRepository;
    this.user = 'test';
  }

  async getAllUser() {
    const users = await this.usersRepository.getAll();
    return users;
  }
}

module.exports = UserService;
