"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_nb_json_1 = __importDefault(require("./common.nb.json"));
const common_nn_json_1 = __importDefault(require("./common.nn.json"));
const common_en_json_1 = __importDefault(require("./common.en.json"));
const bokmålstekster = {
    ...common_nb_json_1.default,
};
const nynorsktekster = {
    ...common_nn_json_1.default,
};
const engelsktekster = {
    ...common_en_json_1.default,
};
const allCommonMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
    en: engelsktekster,
};
exports.default = allCommonMessages;
//# sourceMappingURL=allCommonMessages.js.map