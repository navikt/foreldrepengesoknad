"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_intl_1 = require("react-intl");
const react_router_dom_1 = require("react-router-dom");
const ds_react_1 = require("@navikt/ds-react");
const ds_icons_1 = require("@navikt/ds-icons");
const BackLink = ({ className, href, onClick, ariaLabel }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleOnClick = (event) => {
        if (onClick) {
            onClick(href, event);
        }
        else {
            event.preventDefault();
            navigate(href);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(ds_react_1.Link, { href: href, "aria-label": ariaLabel, onClick: handleOnClick, children: [(0, jsx_runtime_1.jsx)(ds_icons_1.Back, {}), (0, jsx_runtime_1.jsx)(react_intl_1.FormattedMessage, { id: "backlink.label" })] }));
};
exports.default = BackLink;
//# sourceMappingURL=BackLink.js.map