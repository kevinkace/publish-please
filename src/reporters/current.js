'use strict';
const elegantStatusReporter = require('./elegant-status-reporter');
const ciReporter = require('./ci-reporter');
const reporters = [elegantStatusReporter, ciReporter];
/**
 * Current Reporter.
 * @module reporters/current
 */
module.exports = {
    /**
     * get current reporter
     * @returns {Reporter}
     */
    current() {
        try {
            const selectedReporter = reporters
                .filter((reporter) => reporter.canRun())
                .filter((reporter) => reporter.shouldRun())
                .pop();
            return selectedReporter || ciReporter;
        } catch (error) {
            console.log(error);
            return ciReporter;
        }
    },
};

/**
 * @typedef Reporter
 * @type {Object}
 * @property {string} name - name of the reporter. Must be unique among all reporters.
 * @property {function(): boolean} canRun - Check if this reporter can be used.
 * @property {function(): boolean} shouldRun - Check if this reporter should be used
 * @property {function(string): void} reportError - report error message
 * @property {function(string): function(boolean):void} reportRunningTask - report a task that is executing and may take some time,
 */
