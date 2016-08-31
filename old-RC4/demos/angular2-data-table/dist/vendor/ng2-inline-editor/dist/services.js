"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Import all services
var sample_service_1 = require('./services/sample.service');
// Export all services
__export(require('./services/sample.service'));
// Export convenience property
exports.PROVIDERS = [
    sample_service_1.SampleService
];
//# sourceMappingURL=services.js.map