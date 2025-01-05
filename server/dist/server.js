"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const leetcode_route_1 = __importDefault(require("./routes/leetcode.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const angularAppPath = path_1.default.join(__dirname, 'public/leet-code-stats/browser');
app.use(express_1.default.static(angularAppPath));
app.use('/api/leetcode', leetcode_route_1.default);
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(angularAppPath, 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
