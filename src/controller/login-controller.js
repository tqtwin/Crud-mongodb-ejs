
const userModel =require('../models/student');
const path = require('path');
const bcrypt = require('bcryptjs');
class loginController {
    async signup(req, res, next) {
        try {
            const { name, age, gender, mathScore, physicsScore, chemistryScore } = req.body;
            // Tạo một đối tượng user mới với mật khẩu đã mã hóa và các thông tin khác
            const user = new userModel({
                name: name,
                age: age,
                gender: gender,
                mathScore: mathScore,
                physicsScore: physicsScore,
                chemistryScore: chemistryScore,
            });
            // Lưu người dùng vào cơ sở dữ liệu
            await user.save();
            console.log('User added successfully');
            res.redirect('/view');
        } catch (error) {
            console.error('Error adding user:', error);
            console.log('Request body:', req.body);
            res.status(500).send("Error adding user");
        }
    }
    async getUsersList(req, res, next) {
        try {
            const usersFromDB = await userModel.find();

            return usersFromDB;
        } catch (error) {
            console.error('Error fetching product list from MongoDB:', error);
            res.status(500).send("An error occurred while fetching product list from MongoDB");
        }
    }
    async editUser(req, res, next) {
        try {
            const userId = req.params._id;
            const userData = req.body;
            // Log the incoming data for debugging
            console.log("Updating user ID:", userId);
            console.log("user data:", userData);
            // Ensure to use the { new: true } option to return the updated document
            const updateduser = await userModel.findByIdAndUpdate(userId, userData, { new: true });

            if (!updateduser) {
                console.error('user not found for ID:', userId);
                return res.status(404).json({ message: 'user not found' });
            }

            console.log("Updated user:", updateduser);
            res.redirect('/view');//chuyển đến trang cart
        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).send("An error occurred while updating the product");
        }
    }
    async getUserOne(req, res, next) {
        try {
            const userId = req.params._id;
            const newUser = userModel.findById(userId);
            // console.log(newProduct);
            return newUser
        } catch (error) {
            console.error('Error fetching product from MongoDB:', error);
            res.status(500).send("An error occurred while fetching product from MongoDB");
        }
    }
    async deleteProduct(req, res, next) {
        const id = req.params._id;
        const deleteUser = await userModel.findByIdAndDelete(id);
        res.redirect('/view');
    }

}
module.exports = new loginController();