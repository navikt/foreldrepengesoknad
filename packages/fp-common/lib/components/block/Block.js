"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
require("./block.less");
const bem = (0, bemUtils_1.default)('block');
const Block = ({ margin, padBottom, className, textAlignCenter, visible = true, children, }) => {
    const classNames = bem.classNames(bem.block, bem.modifierConditional(margin, margin !== undefined), bem.modifierConditional(`bottom-${padBottom}`, padBottom !== undefined), {
        [bem.modifier('textAlignCenter')]: textAlignCenter,
        [`${className}`]: className !== undefined,
    });
    if (!visible) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)("div", { className: classNames, children: children });
};
exports.default = Block;
//# sourceMappingURL=Block.js.map