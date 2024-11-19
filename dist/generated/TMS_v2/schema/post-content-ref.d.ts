/**
 * Representation of the 'PostContentRef' schema.
 */
export type PostContentRef = {
    /**
     * Link to content; file ID in case if storage type is FILE;
     * Max Length: 256.
     */
    uri: string;
} & Record<string, any>;
