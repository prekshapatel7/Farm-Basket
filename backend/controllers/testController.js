//Controllers contain the actual logic.

const testUserController =(req, res) =>{
    try {
        return res.status(200).json({ message: 'Test user route is working fine!' });
    } catch (error) {
        console.error('Error in testUserController:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = testUserController;