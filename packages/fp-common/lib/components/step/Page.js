"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useDocumentTitle_1 = __importDefault(require("../../utils/useDocumentTitle"));
const react_1 = require("react");
const react_intl_1 = require("react-intl");
const intlUtils_1 = __importDefault(require("../../utils/intlUtils"));
require("./page.less");
const Page = ({ ariaLabel, id = 'pageMainContent', title, className, topContentRenderer, children, }) => {
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    (0, useDocumentTitle_1.default)(title);
    const intl = (0, react_intl_1.useIntl)();
    const ariaLabelToUse = ariaLabel ? (0, intlUtils_1.default)(intl, 'page.defaultMainRoleLabel') : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { role: "main", "aria-label": ariaLabelToUse, id: id, children: [topContentRenderer && topContentRenderer(), (0, jsx_runtime_1.jsx)("div", { className: `page ${className}`, children: children })] }));
};
exports.default = Page;
//# sourceMappingURL=Page.js.map