interface ViteTypeOptions {
    // By adding this line, you can make the type of ImportMetaEnv strict
    // to disallow unknown keys.
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_SENTRY_RELEASE: string;
    readonly TEST_MODE?: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
