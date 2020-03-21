const types: { [key: string]: boolean } = {};

/**
 * Ensures that the created action string is unique. If you register
 * an action that is already registered it will log the problem.
 */
export function isUniqueActionType(type: string): void {
    // Check if we have already registered the type.
    const result = types[type];
    if (!result) {
        types[type] = true;
        return;
    }

    // In develop mode we throw an error when you register a non-unique type,
    // but in production mode we just show a console message and return a
    // unique key, so the application will not break.
    if (process.env.NODE_ENV === 'development') {
        throw new Error(`Action type '${type}' is already registered.`);
    } else {
        console.error(`Action type '${type}' is already registered.`);
    }
}
