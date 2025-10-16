"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartVideoCall = void 0;
class StartVideoCall {
    constructor(callRepository) {
        this.callRepository = callRepository;
    }
    async execute(callData) {
        return this.callRepository.createCall(callData);
    }
}
exports.StartVideoCall = StartVideoCall;
