const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors');
const connect = require("./global/config/mongodbConfig");

require('dotenv').config();

const projectRouter = require("./domain/project/controller/projectRouter");
const taskRouter = require("./domain/task/controller/taskRouter");

// express 실행
const app = express();

app.set("port", process.env.PORT);

// 세션 사용
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 세션 만료 기간 - 일주일
        resave: false,
        saveUninitialized: true,
        secret: process.env.COOKIE_SECRET,
    })
);

connect(); // mongoose 접속

app.use(morgan("dev"));
app.use(express.json()); // json 사용
app.use(express.urlencoded({ extended: true }));


// cors
app.use(cors({ credentials: true, origin: true}));

// Router 연결
app.use("/projects", projectRouter);
app.use("/", taskRouter);

// 에러 라우터 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 로깅 미들웨어
app.use((err, req, res, next) => {
    res.status(statusCode).json({
        status: 'error',
        code: err.statusCode,
        message: err.message
    });
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
