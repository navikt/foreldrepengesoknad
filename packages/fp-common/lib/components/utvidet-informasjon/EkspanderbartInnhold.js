"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const react_collapse_1 = require("react-collapse");
require("./ekspanderbartInnhold.less");
const EkspanderbartInnhold = ({ children, animert = true, erApen = false, ariaLive = 'off', }) => {
    const content = (0, jsx_runtime_1.jsx)("div", { "aria-live": ariaLive, children: erApen ? (0, jsx_runtime_1.jsx)("div", { children: children }) : (0, jsx_runtime_1.jsx)("div", {}) });
    if (!animert) {
        return content;
    }
    return ((0, jsx_runtime_1.jsx)(react_collapse_1.Collapse, { isOpened: erApen, className: (0, classnames_1.default)('ekspanderbartInnhold', {
            'ekspanderbartInnhold--apen': erApen,
        }), children: content }));
};
exports.default = EkspanderbartInnhold;
//# sourceMappingURL=EkspanderbartInnhold.js.map