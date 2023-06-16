"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("./utils/logger"));
const connect_1 = __importDefault(require("./utils/connect"));
const routes_1 = __importDefault(require("./routes"));
const cors = require('cors');
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(cors({
    origin: ["http://localhost:3000", "https://fuschia-racer.vercel.app"]
}));
// app.use(errorHandler);
(0, routes_1.default)(app);
const PORT = process.env.PORT;
const MODE = process.env.MODE;
(0, connect_1.default)();
mongoose_1.default.connection.once("open", () => {
    app.listen(PORT, () => {
        logger_1.default.info(`${MODE} server is up on port ${PORT}`);
    });
});
