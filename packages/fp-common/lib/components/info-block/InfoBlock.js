"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const bemUtils_1 = __importDefault(require("./../../utils/bemUtils"));
require("./infoBlock.less");
const InfoBlock = ({ children }) => {
    const bem = (0, bemUtils_1.default)('infoBlock');
    return (0, jsx_runtime_1.jsx)("div", { className: bem.block, children: children });
};
exports.default = InfoBlock;
//# sourceMappingURL=InfoBlock.js.map