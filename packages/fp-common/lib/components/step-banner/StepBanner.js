"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ds_react_1 = require("@navikt/ds-react");
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
const Banner_1 = __importDefault(require("../banner/Banner"));
require("./stepBanner.less");
const bem = (0, bemUtils_1.default)('stepBanner');
const StepBanner = ({ text, level = '2' }) => ((0, jsx_runtime_1.jsx)(Banner_1.default, { size: "small", className: bem.block, children: (0, jsx_runtime_1.jsx)(ds_react_1.Heading, { size: "small", level: level, children: text }) }));
exports.default = StepBanner;
//# sourceMappingURL=StepBanner.js.map