"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InfoToggler_1 = __importDefault(require("./InfoToggler"));
const guid_1 = require("./../../utils/guid");
const EkspanderbartInnhold_1 = __importDefault(require("./EkspanderbartInnhold"));
const react_intl_1 = require("react-intl");
const intlUtils_1 = __importDefault(require("./../../utils/intlUtils"));
const ds_react_1 = require("@navikt/ds-react");
require("./utvidetInformasjon.less");
const UtvidetInformasjon = ({ children, erApen, apneLabel }) => {
    const intl = (0, react_intl_1.useIntl)();
    const innholdId = (0, guid_1.guid)();
    const [apen, setApen] = (0, react_1.useState)(erApen || false);
    const lukkLabel = (0, intlUtils_1.default)(intl, 'utvidetInformasjon.lukkTekst');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "utvidetInformasjon", children: [(0, jsx_runtime_1.jsx)("div", { className: "utvidetInformasjon__toggler no-print", children: (0, jsx_runtime_1.jsx)(InfoToggler_1.default, { onToggle: () => setApen(!apen), apen: apen, children: (0, jsx_runtime_1.jsx)(ds_react_1.BodyLong, { children: apen ? lukkLabel : apneLabel }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "utvidetInformasjon__innhold", id: innholdId, children: [(0, jsx_runtime_1.jsx)(EkspanderbartInnhold_1.default, { erApen: apen, children: children }), (0, jsx_runtime_1.jsx)("div", { className: "print-only", children: children })] })] }));
};
exports.default = UtvidetInformasjon;
//# sourceMappingURL=UtvidetInformasjon.js.map