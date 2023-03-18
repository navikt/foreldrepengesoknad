"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ds_react_1 = require("@navikt/ds-react");
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
require("./speechBubble.less");
const SpeechBubble = ({ title = null, text }) => {
    const bem = (0, bemUtils_1.default)('speechBubble');
    return ((0, jsx_runtime_1.jsx)("div", { className: `${bem.block} ${bem.modifier('white')}`, children: (0, jsx_runtime_1.jsxs)("div", { className: bem.element('content'), children: [title && ((0, jsx_runtime_1.jsx)("div", { className: `${bem.element('title')} capitalizeName`, children: (0, jsx_runtime_1.jsx)(ds_react_1.Heading, { size: "small", as: "p", style: { margin: '0' }, children: title }) })), (0, jsx_runtime_1.jsx)("div", { className: bem.element('text'), children: text })] }) }));
};
exports.default = SpeechBubble;
//# sourceMappingURL=SpeechBubble.js.map