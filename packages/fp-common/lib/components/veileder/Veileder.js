"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const VeilederNormalSvg_1 = __importDefault(require("./VeilederNormalSvg"));
const VeilederKompaktSvg_1 = __importDefault(require("./VeilederKompaktSvg"));
require("./veileder.less");
const Veileder = (props) => {
    const { className, farge = 'lilla', ansikt = 'glad', stil = 'normal', ...rest } = props;
    const svgProps = {
        ...rest,
        className: (0, classnames_1.default)('veileder', `veileder--tema-${farge}`, `veileder--${ansikt}`, `veileder--${stil}`, props.className),
    };
    if (stil === 'normal') {
        return (0, jsx_runtime_1.jsx)(VeilederNormalSvg_1.default, { svgProps: svgProps });
    }
    else {
        return (0, jsx_runtime_1.jsx)(VeilederKompaktSvg_1.default, { svgProps: svgProps });
    }
};
exports.default = Veileder;
//# sourceMappingURL=Veileder.js.map