"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ds_react_1 = require("@navikt/ds-react");
const stopClickEvent = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
};
const ActionLink = ({ onClick, children, className, ariaLabel }) => {
    return ((0, jsx_runtime_1.jsx)(ds_react_1.Link, { className: className, href: "#", "aria-label": ariaLabel, onClick: (evt) => {
            stopClickEvent(evt);
            onClick();
        }, children: children }));
};
exports.default = ActionLink;
//# sourceMappingURL=ActionLink.js.map