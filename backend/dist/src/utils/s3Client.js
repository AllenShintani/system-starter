"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const credential_provider_sso_1 = require("@aws-sdk/credential-provider-sso");
const s3Client = new client_s3_1.S3Client({
    region: "ap-northeast-1",
    credentials: (0, credential_provider_sso_1.fromSSO)({ profile: "hackers-guild-admin" }),
});
exports.default = s3Client;
//# sourceMappingURL=s3Client.js.map