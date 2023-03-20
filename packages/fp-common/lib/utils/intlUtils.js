"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedIntlHelper = void 0;
const intlHelper = (intl, id, value) => intl.formatMessage({ id }, value);
function typedIntlHelper(intl) {
    return {
        intlText: (id, values) => {
            return intl.formatMessage({ id }, values);
        },
        intlHtml: (id, values) => {
            return intl.formatMessage({ id }, values);
        },
    };
}
exports.typedIntlHelper = typedIntlHelper;
exports.default = intlHelper;
//# sourceMappingURL=intlUtils.js.map