"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const TrashcanIkon_1 = __importDefault(require("./TrashcanIkon"));
require("./slettKnapp.less");
const SlettKnapp = ({ onClick, ariaLabel }) => ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "slettKnapp", "aria-label": ariaLabel, onClick: (e) => {
        e.stopPropagation();
        onClick();
    }, children: (0, jsx_runtime_1.jsx)(TrashcanIkon_1.default, { width: 20, height: 20 }) }));
exports.default = SlettKnapp;
//# sourceMappingURL=SlettKnapp.js.map