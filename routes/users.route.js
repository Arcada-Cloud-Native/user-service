const route = require("express").Router();

const { checkAuth } = require("../middleware/auth");
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    userSignup,
    userLogout,
    userLogin,
} = require("../controllers/users.controller");

// Public
route.get("/", getAllUsers);
route.get("/logout", checkAuth, userLogout);
route.get("/:id", getUserById);
route.patch("/:id", checkAuth, updateUser);
route.delete("/:id", checkAuth, deleteUser);
route.post("/signup", userSignup);
route.post("/login", userLogin);

route.use((req, res, next) => {
    const error = new Error("Only GET, POST, PATCH, DELETE commands supported");
    error.status = 500;
    next(error);
});

module.exports = route;
