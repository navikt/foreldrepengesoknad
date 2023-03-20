"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ds_react_1 = require("@navikt/ds-react");
const Block_1 = __importDefault(require("../../block/Block"));
const BekreftDialog = (props) => {
    const { tittel, onAvbryt, onBekreft, avbrytLabel, bekreftLabel, children, ...modalProps } = props;
    return ((0, jsx_runtime_1.jsx)(ds_react_1.Modal, { ...modalProps, closeButton: false, children: (0, jsx_runtime_1.jsxs)(ds_react_1.Modal.Content, { children: [tittel && ((0, jsx_runtime_1.jsx)(ds_react_1.Heading, { level: "2", size: "medium", children: tittel })), (0, jsx_runtime_1.jsx)(Block_1.default, { padBottom: "m", children: children }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-evenly' }, children: [(0, jsx_runtime_1.jsx)(ds_react_1.Button, { type: "button", variant: "primary", onClick: () => onBekreft(), className: "bekreftDialog__bekreftKnapp", children: bekreftLabel }), (0, jsx_runtime_1.jsx)(ds_react_1.Button, { type: "button", variant: "secondary", onClick: () => (onAvbryt ? onAvbryt() : props.onClose()), className: "bekreftDialog__avbrytKnapp", children: avbrytLabel })] })] }) }));
};
exports.default = BekreftDialog;
//# sourceMappingURL=BekreftDialog.js.map