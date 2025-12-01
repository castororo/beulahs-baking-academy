/// <reference types="vite/client" />

declare module "*&as=metadata" {
    const content: { src: string; width: number; height: number; format: string }[];
    export default content;
}
