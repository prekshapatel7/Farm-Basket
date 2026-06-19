const userModel = require('../models/userModel');

const userController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById(req.userId);

        // validate user
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // hide password
        user.password = undefined;

        return res.status(200).send({
            success: true,
            message: 'User info fetched successfully',
            user
        });

    } catch (error) {
        console.error("Error fetching user info:", error);

        return res.status(500).send({
            success: false,
            message: 'Error fetching user info'
        });
    }
};

module.exports = userController;