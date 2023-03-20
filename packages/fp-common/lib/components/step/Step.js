"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const bemUtils_1 = __importDefault(require("./../../utils/bemUtils"));
const Page_1 = __importDefault(require("./Page"));
const StepIndicator_1 = __importDefault(require("../step-indicator/StepIndicator"));
const StepBanner_1 = __importDefault(require("../step-banner/StepBanner"));
const Block_1 = __importDefault(require("../block/Block"));
const BackLink_1 = __importDefault(require("../back-link/BackLink"));
const StepFooter_1 = __importDefault(require("../step-footer/StepFooter"));
require("./step.less");
const ds_react_1 = require("@navikt/ds-react");
const Step = ({ bannerTitle, pageTitle, stepTitle, backLinkHref, backLinkOnClick, steps, activeStepId, onCancel, onContinueLater, cancelOrContinueLaterAriaLabel, showStepIndicator = true, children, previousStepTitle, pageAriaLabel, kompakt, infoMessage, }) => {
    const currentStepIndex = steps.findIndex((s) => s.id === activeStepId);
    const bem = (0, bemUtils_1.default)('step');
    return ((0, jsx_runtime_1.jsxs)(Page_1.default, { className: bem.block, title: pageTitle, ariaLabel: pageAriaLabel, topContentRenderer: () => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: bannerTitle && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(StepBanner_1.default, { text: bannerTitle }) })) })), children: [infoMessage !== undefined && (0, jsx_runtime_1.jsx)("div", { className: bem.element('infoMessage'), children: infoMessage }), (showStepIndicator || backLinkHref) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Block_1.default, { padBottom: "l", children: (0, jsx_runtime_1.jsx)(ds_react_1.Heading, { size: "medium", className: bem.element('title'), children: stepTitle }) }), (0, jsx_runtime_1.jsx)("div", { role: "presentation", "aria-hidden": true, children: (0, jsx_runtime_1.jsx)(StepIndicator_1.default, { kompakt: kompakt, steps: steps, activeStep: currentStepIndex }) }), backLinkHref && ((0, jsx_runtime_1.jsx)(BackLink_1.default, { href: backLinkHref, ariaLabel: previousStepTitle, className: bem.element('backLink'), onClick: backLinkOnClick }))] })), (0, jsx_runtime_1.jsxs)("section", { "aria-label": `Steg ${currentStepIndex + 1} av ${steps.length}:  ${pageTitle}`, children: [(0, jsx_runtime_1.jsx)(Block_1.default, { margin: "xl", children: children }), (onCancel || onContinueLater) && ((0, jsx_runtime_1.jsx)("div", { role: cancelOrContinueLaterAriaLabel ? 'complementary' : undefined, "aria-label": cancelOrContinueLaterAriaLabel, children: (0, jsx_runtime_1.jsx)(StepFooter_1.default, { onAvbrytOgSlett: onCancel, onAvbrytOgFortsettSenere: onContinueLater }) }))] })] }));
};
exports.default = Step;
//# sourceMappingURL=Step.js.map