"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ds_icons_1 = require("@navikt/ds-icons");
const bemUtils_1 = __importDefault(require("./../../utils/bemUtils"));
require("./infoToggler.less");
const InfoToggler = ({ apen = false, children, onToggle }) => {
    const cls = (0, bemUtils_1.default)('infoToggler');
    return ((0, jsx_runtime_1.jsx)("button", { className: cls.block, onClick: (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            onToggle();
        }, "aria-expanded": apen, children: (0, jsx_runtime_1.jsxs)("span", { className: cls.element('content'), children: [(0, jsx_runtime_1.jsx)("span", { className: cls.element('label'), children: children }), (0, jsx_runtime_1.jsx)("span", { className: cls.element('chevron'), children: apen ? (0, jsx_runtime_1.jsx)(ds_icons_1.Collapse, {}) : (0, jsx_runtime_1.jsx)(ds_icons_1.Expand, {}) })] }) }));
};
exports.default = InfoToggler;
//# sourceMappingURL=InfoToggler.js.map