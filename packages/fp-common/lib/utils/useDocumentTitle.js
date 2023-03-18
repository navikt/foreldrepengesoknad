"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useDocumentTitle(title) {
    (0, react_1.useEffect)(() => {
        const originalTitle = document.title;
        document.title = title;
        return () => {
            document.title = originalTitle;
        };
    }, [title]);
}
exports.default = useDocumentTitle;
//# sourceMappingURL=useDocumentTitle.js.map