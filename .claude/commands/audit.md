# Audit Dependencies

Run a security audit and fix critical vulnerabilities.

## Steps

1. **Run security audit**: Execute `pnpm audit` to identify vulnerabilities in dependencies

2. **Fix critical vulnerabilities**: Run `pnpm audit --fix` to automatically fix critical and high severity issues. If that doesn't resolve all critical issues, try updating the specific vulnerable packages directly.

3. **Verify the app still works**:
   - Run `pnpm lint` to check for any linting errors
   - Run `pnpm build` to ensure the application builds successfully
   - If tests are configured (check for test script in package.json), run them

4. **Report results**: Summarize what vulnerabilities were found, what was fixed, and confirm the app is still functional.
