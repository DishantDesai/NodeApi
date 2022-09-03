const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    password: "test",
  },
];

const getAllUsers = (req, res, next) => {
  if (!DUMMY_USERS.length) {
    next(new HttpError("No user found", 404));
    return;
  }
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, username, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exists!", 422)
    );
  }
  const createdUser = {
    id: uuidv4(),
    name,
    username,
    email,
    password,
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  const authUser = DUMMY_USERS.filter(
    (u) => u.email === email && u.password === password
  );
  if (authUser.length) {
    return res.status(200).json({ user: authUser[0] });
  }
  next(new HttpError("Wrong email or password or both", 401));
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
