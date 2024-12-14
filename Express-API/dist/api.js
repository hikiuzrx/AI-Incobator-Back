"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const User_1 = __importDefault(require("./routes/User"));
const swagerConfig_1 = __importDefault(require("./utils/swagerConfig"));
const Project_1 = __importDefault(require("./routes/Project"));
const authValidator_1 = require("./middlewares/authValidator");
(0, dotenv_1.configDotenv)();
const api = (0, express_1.default)();
api.use((0, cors_1.default)());
console.log(process.env.PORT);
api.listen(process.env.PORT, () => {
    console.log("it's working");
});
api.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagerConfig_1.default));
api.use(express_1.default.urlencoded({ extended: true }));
api.use(express_1.default.json());
api.use((0, cookie_parser_1.default)());
api.use('/project', authValidator_1.authMiddleware, Project_1.default);
api.use('/user', authValidator_1.authMiddleware, User_1.default);
api.use('/auth', Auth_1.default);
