"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = __importDefault(require("classnames"));
const bemUtils = (cls) => ({
    block: cls,
    element: (e, m) => `${cls}__${e}${m ? ` ${cls}__${e}--${m}` : ''}`,
    modifier: (m) => `${cls}--${m}`,
    modifierConditional: (m, condition) => condition === true && m !== undefined ? `${cls}--${m}` : undefined,
    child: (c) => bemUtils(bemUtils(cls).element(c)),
    classNames: classnames_1.default,
});
exports.default = bemUtils;
//# sourceMappingURL=bemUtils.js.map