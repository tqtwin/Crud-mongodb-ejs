var express = require('express');
const loginController = require('../controller/login-controller');
const methodOverride = require('method-override');
var router = express.Router();

//chat
router.use(methodOverride('_method'));
const path = require('path')
/* GET users listing. */
router.use('/api/v1/users', require('./users'));

const session = require('express-session');
router.use(session({
    secret: 'tranquocthangdeptrai', // Thay bằng chuỗi bí mật thực sự
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
router.get('/delete/:_id', async (req, res) => {
    try {
        await loginController.deleteProduct(req, res);
        // res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send("Error deleting product");
    }
});
//admin product
router.get('/view', async (req, res) => {
    const usersFromDB = await loginController.getUsersList()
    const indexView = path.join(__dirname, '../views/view.ejs');
    res.render(indexView, { users: usersFromDB });
})

router.get('/', (req, res) => {
    const signup = path.join(__dirname, '../views/them.ejs');
    res.render(signup);
});

router.get('/edit/:_id', async (req, res) => {
    try {
        const newUser = await loginController.getUserOne(req, res);
        res.render('edit', { user: newUser });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send("An error occurred while rendering the page.");
    }
});
module.exports = router;

