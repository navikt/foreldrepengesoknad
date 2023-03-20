"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const bemUtils_1 = __importDefault(require("./../../utils/bemUtils"));
const StatusIkon_1 = __importDefault(require("./../../assets/status-ikon/StatusIkon"));
const ds_react_1 = require("@navikt/ds-react");
const bem = (0, bemUtils_1.default)('pictureScanningGuide').child('example');
const PictureScanningExample = ({ image, status, statusText, description }) => ((0, jsx_runtime_1.jsxs)("div", { className: bem.block, children: [(0, jsx_runtime_1.jsx)("div", { className: bem.element('image'), children: image }), (0, jsx_runtime_1.jsxs)(ds_react_1.Heading, { size: "small", as: "div", className: bem.element('title'), children: [(0, jsx_runtime_1.jsx)("span", { className: bem.element('statusIcon'), role: "presentation", children: (0, jsx_runtime_1.jsx)(StatusIkon_1.default, { status: status }) }), statusText] }), (0, jsx_runtime_1.jsx)("div", { className: bem.element('description'), children: description })] }));
exports.default = PictureScanningExample;
//# sourceMappingURL=PictureScanningExample.js.map