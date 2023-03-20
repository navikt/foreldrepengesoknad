"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
const SpeechBubble_1 = __importDefault(require("./SpeechBubble"));
const Veileder_1 = __importDefault(require("../veileder/Veileder"));
require("./sidebanner.less");
const Sidebanner = ({ dialog, veileder }) => {
    const bem = (0, bemUtils_1.default)('sidebanner');
    return ((0, jsx_runtime_1.jsxs)("div", { className: bem.block, children: [dialog && ((0, jsx_runtime_1.jsx)("div", { className: bem.element('speechbubble'), children: (0, jsx_runtime_1.jsx)(SpeechBubble_1.default, { title: dialog.title, text: dialog.text }) })), (0, jsx_runtime_1.jsx)(Veileder_1.default, { ...veileder })] }));
};
exports.default = Sidebanner;
//# sourceMappingURL=Sidebanner.js.map