import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: ['./fpoversikt-swagger.json', './fpsoknad-swagger.json'],
    output: [
        {
            clean: false,
            format: 'prettier',
            lint: 'eslint',
            path: 'src/',
            fileName: {
                name: 'fpoversiktDtoGenerert',
                suffix: null,
            },
        },
        {
            clean: false,
            format: 'prettier',
            lint: 'eslint',
            path: 'src/',
            fileName: {
                name: 'fpsoknadDtoGenerert',
                suffix: null,
            },
        },
    ],
    parser: {
        transforms: {
            readWrite: false,
        },
    },
    plugins: [
        {
            name: '@hey-api/typescript',
            definitions: {
                case: 'preserve',
                name: (typeName) => {
                    if (typeName.includes('.fpsoknad.')) {
                        const strippedName = typeName.substring(typeName.lastIndexOf('.') + 1);
                        return `${strippedName}`;
                    }
                    if (['no.nav.foreldrepenger.oversikt.', '.fpoversikt.'].some((t) => typeName.includes(t))) {
                        const strippedName = typeName.substring(typeName.lastIndexOf('.') + 1);
                        return `${strippedName}_fpoversikt`;
                    }

                    return typeName;
                },
            },
            exportFromIndex: false,
        },
    ],
});
