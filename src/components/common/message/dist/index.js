"use strict";
exports.__esModule = true;
exports.Message = void 0;
var styles_module_scss_1 = require("./styles.module.scss");
function Message(_a) {
    var type = _a.type, children = _a.children;
    return (React.createElement("span", { className: styles_module_scss_1["default"][type] }, children));
}
exports.Message = Message;
