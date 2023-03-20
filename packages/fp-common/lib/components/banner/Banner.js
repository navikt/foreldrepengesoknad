"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
require("./banner.less");
const bem = (0, bemUtils_1.default)('banner');
const Banner = ({ size, className, children }) => ((0, jsx_runtime_1.jsx)("div", { className: `${bem.block} ${bem.block}--${size} ${className}`, children: children }));
exports.default = Banner;
//# sourceMappingURL=Banner.js.map