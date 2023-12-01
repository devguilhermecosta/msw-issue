import {TestEnvironment } from 'jest-environment-jsdom';

const Environment = TestEnvironment;

export default class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    this.global.TextEncoder = TextEncoder;
    this.global.TextDecoder = TextDecoder;
    this.global.Headers = Headers;
    this.global.Response = Response;
    this.global.Request = Request;
  }
}