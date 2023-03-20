"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_intl_1 = require("react-intl");
const bemUtils_1 = __importDefault(require("../../utils/bemUtils"));
const ActionLink_1 = __importDefault(require("../action-link/ActionLink"));
const AvbrytSoknadDialog_1 = __importDefault(require("../dialogs/avbryt-soknad-dialog/AvbrytSoknadDialog"));
const FortsettS_knadSenereDialog_1 = __importDefault(require("../dialogs/fortsett-s\u00F8knad-senere-dialog/FortsettS\u00F8knadSenereDialog"));
require("./stepFooter.less");
function StepFooter({ onAvbrytOgFortsettSenere, onAvbrytOgSlett }) {
    const [visAvbrytDialog, setVisAvbrytDialog] = react_1.default.useState(false);
    const [visFortsettSenereDialog, setVisFortsettSenereDialog] = react_1.default.useState(false);
    const bem = (0, bemUtils_1.default)('stepFooter');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: bem.block, children: [(0, jsx_runtime_1.jsx)("div", { className: bem.element('divider') }), (0, jsx_runtime_1.jsxs)("div", { className: bem.element('links'), children: [onAvbrytOgFortsettSenere && ((0, jsx_runtime_1.jsx)(ActionLink_1.default, { onClick: () => setVisFortsettSenereDialog(true), children: (0, jsx_runtime_1.jsx)(react_intl_1.FormattedMessage, { id: "steg.footer.fortsettSenere" }) })), onAvbrytOgSlett && ((0, jsx_runtime_1.jsx)(ActionLink_1.default, { className: bem.element('avbrytSoknadLenke'), onClick: () => setVisAvbrytDialog(true), children: (0, jsx_runtime_1.jsx)(react_intl_1.FormattedMessage, { id: "steg.footer.avbryt" }) }))] })] }), onAvbrytOgFortsettSenere && ((0, jsx_runtime_1.jsx)(FortsettS_knadSenereDialog_1.default, { synlig: visFortsettSenereDialog, "onFortsettS\u00F8knadSenere": onAvbrytOgFortsettSenere, "onFortsettS\u00F8knad": () => setVisFortsettSenereDialog(false) })), onAvbrytOgSlett && ((0, jsx_runtime_1.jsx)(AvbrytSoknadDialog_1.default, { synlig: visAvbrytDialog, "onAvbrytS\u00F8knad": onAvbrytOgSlett, "onFortsettS\u00F8knad": () => setVisAvbrytDialog(false) }))] }));
}
exports.default = StepFooter;
//# sourceMappingURL=StepFooter.js.map