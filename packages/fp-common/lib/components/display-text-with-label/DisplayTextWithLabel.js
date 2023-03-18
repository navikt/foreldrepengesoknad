"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ds_react_1 = require("@navikt/ds-react");
const DisplayTextWithLabel = (props) => ((0, jsx_runtime_1.jsxs)("div", { className: "textWithLabel", children: [props.label && ((0, jsx_runtime_1.jsx)(ds_react_1.Heading, { size: "xsmall", level: "3", children: props.label })), Array.isArray(props.text) &&
            props.text.map((textElement, index) => ((0, jsx_runtime_1.jsx)(ds_react_1.BodyShort, { children: textElement }, `${textElement}-${index}`))), !Array.isArray(props.text) && (0, jsx_runtime_1.jsx)(ds_react_1.BodyShort, { children: props.text })] }));
exports.default = DisplayTextWithLabel;
//# sourceMappingURL=DisplayTextWithLabel.js.map