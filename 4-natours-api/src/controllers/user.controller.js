const fs = require('fs');

const usersData = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));

class UserController {
  getUsers(req, res) {
    res.status(200).json({
      status: 'success',
      createdAt: req.requestTime,
      results: usersData.length,
      data: { tours: usersData },
    });
  }

  getUser(req, res) {
    const id = +req.params.id;
    const user = usersData.find((tour) => tour.id === id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: { tour: selectedTour },
    });
  }

  createUser(req, res) {
    const newTour = req.body;
    usersData.push({ id: usersData.length, ...newTour });
    fs.writeFile('./dev-data/data/users.json', JSON.stringify(usersData), (error) => {
      if (error) throw "Couldn't write a new tour";
      res.status(201).json({
        status: 'success',
        data: { tour: { id: usersData.length - 1, ...newTour } },
      });
    });
  }

  updateUser(req, res) {
    const id = +req.params.id;
    const tourUpdate = req.body;
    const selectedTour = usersData.find((tour) => tour.id === id);
    const updatedTour = { ...selectedTour, ...tourUpdate };
    const newTours = usersData.map((tour) => (tour.id === updatedTour.id ? { ...updatedTour } : tour));
    fs.writeFile('./dev-data/data/users.json', JSON.stringify(newTours), (error) => {
      if (error) throw "Couldn't update a tour";
      res.status(200).json({
        status: 'success',
        data: { tour: updatedTour },
      });
    });
  }

  deleteUser(req, res) {
    const id = +req.params.id;
    const index = usersData.findIndex((tour) => tour.id === id);
    if (index < 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
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
console.log(module);
