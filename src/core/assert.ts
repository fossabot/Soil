/**
 * Specialized type of error to easily identify exceptions originated in `assert()` expressions.
 */
export class AssertionError extends Error {}

/**
 * Ensure that any given condition is true, adding basic support for design-by-contract pgoramming.
 *
 * When providing a function as opposed to a boolean as the first argument, the source code of the function will be
 * included as part of the error message in case of failure, thus providing immediate feedback to help determine the
 * the reason the assertion did not hold true.
 */
export function assert(assertion: boolean | (() => boolean), message: string = '') {
    const assertionIsFunction = typeof assertion === 'function'

    const ok = assertionIsFunction
        ? (assertion as () => boolean)()
        : assertion

    if (!ok) {
        if (assertionIsFunction) {
            message += ' | Assertion was: ' + assertion.toString()
        }
        throw new AssertionError(message)
    }
}