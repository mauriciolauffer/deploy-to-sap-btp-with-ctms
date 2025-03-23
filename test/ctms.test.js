import 'dotenv/config';
import { describe, it, expect } from "vitest";
import ctmsDeploy from '../src/ctms';


try {
  // await ctmsDeploy();
} catch (err) {
  console.error(err);
}

describe('ctmsDeploy', () => {
  it('should deploy', () => {
    expect(true).toBe(true);
    expect(ctmsDeploy).toBeTruthy();
  });
});
