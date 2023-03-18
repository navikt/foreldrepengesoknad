"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_aria_menubutton_1 = require("react-aria-menubutton");
const react_intl_1 = require("react-intl");
const intlUtils_1 = __importDefault(require("../../utils/intlUtils"));
const NorwayFlag_1 = __importDefault(require("./NorwayFlag"));
const ds_icons_1 = require("@navikt/ds-icons");
require("./languageToggle.less");
const renderMenuItem = (intl, locale) => {
    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_aria_menubutton_1.MenuItem, { className: "languageToggle__menu__item", children: [(0, jsx_runtime_1.jsx)("div", { className: "languageToggle__button__flag", children: (0, jsx_runtime_1.jsx)(NorwayFlag_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "languageToggle__button__language", "data-locale": locale, children: (0, intlUtils_1.default)(intl, `locale.${locale}`) })] }) }, locale));
};
const LanguageToggle = ({ locale, toggle: toggleLanguage, availableLocales, }) => {
    const selectableOtherMenuLanguages = [...availableLocales].filter((code) => code !== locale);
    const intl = (0, react_intl_1.useIntl)();
    return ((0, jsx_runtime_1.jsx)("div", { className: "languageToggle", children: (0, jsx_runtime_1.jsxs)(react_aria_menubutton_1.Wrapper, { className: "languageToggle__wrapper", onSelection: (element) => toggleLanguage(element[1].props['data-locale']), children: [(0, jsx_runtime_1.jsxs)(react_aria_menubutton_1.Button, { className: "languageToggle__button", children: [(0, jsx_runtime_1.jsx)("div", { className: "languageToggle__button__flag", children: (0, jsx_runtime_1.jsx)(NorwayFlag_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "languageToggle__button__language", children: (0, intlUtils_1.default)(intl, `locale.${locale}`) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(ds_icons_1.Expand, {}) })] }), (0, jsx_runtime_1.jsx)(react_aria_menubutton_1.Menu, { className: "languageToggle__menu", children: (0, jsx_runtime_1.jsx)("ul", { children: selectableOtherMenuLanguages.map((code) => renderMenuItem(intl, code)) }) })] }) }));
};
exports.default = LanguageToggle;
//# sourceMappingURL=LanguageToggle.js.map