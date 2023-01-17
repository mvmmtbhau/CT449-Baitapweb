const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error');

const app = express();

const contactsRouter = require('./app/routes/contact.route');

app.use(cors());
app.use(express.json());
app.use('api/contacts', contactsRouter);

// Middleware xử lý lỗi
app.use((req, res, next) => {
    // Khi route không được nghĩa thì bắt lỗi ở đây
    // Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    //Middleware xử lý lỗi tập trung, 
    //các đoạn code gọi next(error) sẽ chuyển về middleware này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application!'});
});

module.exports = app;