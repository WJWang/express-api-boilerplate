const { Router } = require('express');
const { inject } = require('awilix-express');

const router = new Router();

function getUser({ userService }) {
  return async (req, res) => {
    res.json({
      users: await userService.getAllUser(),
    });
  };
}

router.get('/', inject(getUser));

module.exports = router;
