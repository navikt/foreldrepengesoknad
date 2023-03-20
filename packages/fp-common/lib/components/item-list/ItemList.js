"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const bemUtils_1 = __importDefault(require("./../../utils/bemUtils"));
const ActionLink_1 = __importDefault(require("../action-link/ActionLink"));
const SlettKnapp_1 = __importDefault(require("../slett-knapp/SlettKnapp"));
const guid_1 = require("./../../utils/guid");
require("./itemList.less");
const bem = (0, bemUtils_1.default)('itemList');
const bemItem = bem.child('item');
function ItemList({ items, onDelete, onEdit, labelRenderer, iconRender, getItemId, getItemTitle, }) {
    return ((0, jsx_runtime_1.jsx)("ol", { className: bem.classNames(bem.block), children: items.map((item) => {
            const itemTitle = getItemTitle(item);
            return ((0, jsx_runtime_1.jsxs)("li", { className: bemItem.block, children: [iconRender && ((0, jsx_runtime_1.jsx)("span", { className: bemItem.element('icon'), role: "presentation", children: iconRender(item) })), (0, jsx_runtime_1.jsx)("span", { className: bemItem.element('label'), children: labelRenderer ? (labelRenderer(item)) : onEdit ? ((0, jsx_runtime_1.jsx)(ActionLink_1.default, { onClick: () => onEdit(item), children: itemTitle })) : (itemTitle) }), onDelete && ((0, jsx_runtime_1.jsx)("span", { className: bemItem.element('delete'), children: (0, jsx_runtime_1.jsx)(SlettKnapp_1.default, { ariaLabel: `Fjern ${itemTitle}`, onClick: () => onDelete(item) }) }))] }, getItemId(item) || (0, guid_1.guid)()));
        }) }));
}
exports.default = ItemList;
//# sourceMappingURL=ItemList.js.map