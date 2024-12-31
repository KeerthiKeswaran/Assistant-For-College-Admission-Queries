/// <reference types="vite/client" />
/// <reference types="react-scripts" />

/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_CHATBOT_API: string;
    VITE_SERVER_CHECK_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
