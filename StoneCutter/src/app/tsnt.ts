// Typescriptn't
// Bless this mess, live (s)laugh(ter) loiter
// Made By Ashton Andrepont


export class tsnt {
    /**
     * Get element by ID with type safety.
     * @param identifier - The ID of the element.
     * @throws Error if the element is not found.
     */
    static gebi<T extends HTMLElement>(identifier: string): T {
        const element = document.getElementById(identifier);
        if (element) return element as T;
        throw `Element ${identifier} not found or wrong type!`;
    }

    /**
     * Safely get element by ID with a fallback element.
     * @param identifier - The ID of the element.
     * @param fallback - The fallback element to return if the element is not found.
     */
    static safeGebi(identifier: string, fallback: HTMLElement): HTMLElement {
        return document.getElementById(identifier) || fallback;
    }

    /**
     * Execute a callback when the DOM is fully loaded.
     * @param callback - The callback to execute.
     */
    static domReady(callback: () => void): void {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    /**
     * Enhanced console.log with timestamps and optional context.
     * @param statement - The value to log.
     * @param context - Optional context label for the log.
     */
    static clog(statement: unknown, context?: string): void {
        console.log(`[${new Date().toISOString()}]${context ? ` [${context}]` : ''}`, statement);
    }

    /**
     * Bind an event listener to an element and return a cleanup function.
     * @param identifier - The ID of the element.
     * @param eventType - The event type (e.g., 'click', 'input').
     * @param handler - The event handler function.
     * @param options - Optional event listener options.
     * @returns A function to remove the event listener.
     */
    static bindEvent(
        identifier: string,
        eventType: string,
        handler: EventListener,
        options?: AddEventListenerOptions
    ): () => void {
        const element = this.gebi(identifier);
        element.addEventListener(eventType, handler, options);
        return () => element.removeEventListener(eventType, handler, options);
    }

    /**
     * Decorator to validate CSS selectors before DOM operations.
     * @param target - The target object.
     * @param key - The method name.
     * @param descriptor - The property descriptor.
     */
    static validateSelector(target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (selector: string, ...args: any[]) {
            if (!selector.match(/^[a-zA-Z][\w\-]*$/)) {
                throw `Invalid selector: ${selector}`;
            }
            return originalMethod.apply(this, [selector, ...args]);
        };
    }
}