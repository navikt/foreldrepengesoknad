"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guid = void 0;
const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString()
        .substring(1);
};
const guid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
exports.guid = guid;
//# sourceMappingURL=guid.js.map