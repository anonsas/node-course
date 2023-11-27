const fs = require('fs');

const usersData = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));

class UserController {
  checkID(req, res, next, val) {
    if (req.params.id * 1 > usersData.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    next();
  }

  getUsers(req, res) {
    res.status(200).json({
      status: 'success',
      results: usersData.length,
      data: { tours: usersData },
    });
  }

  getUser(req, res) {
    const id = +req.params.id;
    const user = usersData.find((user) => user.id === id);
    res.status(200).json({
      status: 'success',
      data: { tour: user },
    });
  }

  createUser(req, res) {
    const newUser = req.body;
    usersData.push({ id: usersData.length, ...newUser });
    fs.writeFile('./dev-data/data/users.json', JSON.stringify(usersData), (error) => {
      if (error) throw "Couldn't write a new tour";
      res.status(201).json({
        status: 'success',
        data: { user: { id: usersData.length - 1, ...newUser } },
      });
    });
  }

  updateUser(req, res) {
    const id = +req.params.id;
    const userUpdate = req.body;
    const selectedUser = usersData.find((tour) => tour.id === id);
    const updatedUser = { ...selectedUser, ...userUpdate };
    const newUsersList = usersData.map((user) => (user.id === updatedUser.id ? { ...updatedUser } : user));
    fs.writeFile('./dev-data/data/users.json', JSON.stringify(newUsersList), (error) => {
      if (error) throw "Couldn't update a tour";
      res.status(200).json({
        status: 'success',
        data: { user: updatedUser },
      });
    });
  }

  deleteUser(req, res) {
    const id = +req.params.id;
    const index = usersData.findIndex((tour) => tour.id === id);
    usersData.splice(index, 1);
    fs.writeFile('./dev-data/data/users.json', JSON.stringify(usersData), (error) => {
      if (error) throw "Couldn't delete a tour";
      res.status(200).json({
        status: 'success',
      });
    });
  }
}

module.exports = new UserController();
