const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) res.status(401).json({ message: "Auth failed" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Auth failed" });
    }
};

exports.isOwner = (ownerId, req, res, next) => {
    try {
        const id = req.userData._id;
        if (id == ownerId) return;
        else res.status(401).json({ message: "Access denied" });
    } catch (err) {
        res.status(401).json({ message: "Access denied" });
    }
};
