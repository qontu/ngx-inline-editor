"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Import all pipes
var sample_pipe_1 = require('./pipes/sample.pipe');
// Export all pipes
__export(require('./pipes/sample.pipe'));
// Export convenience property
exports.PIPES = [
    sample_pipe_1.SamplePipe
];
//# sourceMappingURL=pipes.js.map