module.exports = {
  production: {
    client: 'mysql',
    connection: {
      database: "eventbrite",
      user: "alexm",
      password: "password123",
      host: "173.194.251.221"
    }
  },
  local: {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'eventbrite'
    }
  }
};
