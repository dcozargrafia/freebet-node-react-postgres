// date.utils.js

/**
 * Validates if a string is a valid date in YYYY-MM-DD format
 * @param {string} dateStr - The date string to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidDateFormat = (dateStr) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormatRegex.test(dateStr)) return false;

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;

    const [year, month, day] = dateStr.split('-').map(Number);
    return date.getFullYear() === year &&
           date.getMonth() + 1 === month &&
           date.getDate() === day;
};

/**
 * Validates if a date is not in the future
 * @param {string} dateStr - The date string to validate
 * @returns {boolean} True if valid (not in future), false otherwise
 */
export const isNotFutureDate = (dateStr) => {
    const inputDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate <= today;
};

/**
 * Validates and formats a date for PostgreSQL
 * @param {string} dateStr - The date string to validate and format
 * @returns {Object} Object with validation result and formatted date
 */
export const validateAndFormatDate = (dateStr) => {
    if (!dateStr) {
        return {
            isValid: false,
            error: 'Date is required',
            formattedDate: null
        };
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return {
            isValid: false,
            error: 'Invalid date format',
            formattedDate: null
        };
    }

    return {
        isValid: true,
        error: null,
        formattedDate: date.toISOString().split('T')[0]
    };
};


/**
 * Comprehensive date validation with custom error messages
 * @param {string} dateStr - The date string to validate
 * @param {Object} options - Validation options
 * @param {boolean} options.allowFuture - Whether to allow future dates
 * @param {Date} options.minDate - Minimum allowed date
 * @param {Date} options.maxDate - Maximum allowed date
 * @returns {string|null} Error message if invalid, null if valid
 */
export const validateDate = (dateStr, options = {}) => {
    const { allowFuture = false, minDate = null, maxDate = null } = options;

    if (!dateStr) return 'Date is required';
    
    if (!isValidDateFormat(dateStr)) {
        return 'Invalid date format. Use YYYY-MM-DD';
    }

    const date = new Date(dateStr);

    if (!allowFuture && !isNotFutureDate(dateStr)) {
        return 'Future dates are not allowed';
    }

    if (minDate && date < minDate) {
        return `Date must be after ${minDate.toISOString().split('T')[0]}`;
    }

    if (maxDate && date > maxDate) {
        return `Date must be before ${maxDate.toISOString().split('T')[0]}`;
    }

    return null;
};