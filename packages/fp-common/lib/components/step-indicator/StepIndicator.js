"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const stegindikator_1 = __importDefault(require("nav-frontend-stegindikator/lib/stegindikator"));
const stegindikator_steg_1 = __importDefault(require("nav-frontend-stegindikator/lib/stegindikator-steg"));
const StepIndicator = ({ steps, activeStep, kompakt, visLabel = false }) => {
    return ((0, jsx_runtime_1.jsx)(stegindikator_1.default, { visLabel: visLabel, autoResponsiv: false, aktivtSteg: activeStep, kompakt: kompakt, children: steps.map(({ id, index, label }) => {
            return (0, jsx_runtime_1.jsx)(stegindikator_steg_1.default, { index: index, label: label }, id);
        }) }));
};
exports.default = StepIndicator;
//# sourceMappingURL=StepIndicator.js.map