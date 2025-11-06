import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: ['./fpoversikt.json', './fpsoknad.json', './fpgrunndata.json'],
    output: ['temp-fpoversikt-types', 'temp-fpsoknad-types', 'temp-fpgrunndata-types'],
    plugins: [
        '@hey-api/client-fetch',
        {
            name: '@hey-api/typescript',
            definitions: {
                case: 'preserve',
                name: (typeName) => {
                    if (typeName.includes('no.nav.foreldrepenger.grunnlag')) {
                        const strippedName = typeName.substring(typeName.lastIndexOf('.') + 1);
                        return `${strippedName}`;
                    }
                    if (typeName.includes('.fpsoknad.')) {
                        const strippedName = typeName.substring(typeName.lastIndexOf('.') + 1);
                        return `${strippedName}`;
                    }
                    if (typeName.includes('.fpoversikt.')) {
                        const strippedName = typeName.substring(typeName.lastIndexOf('.') + 1);
                        return `${strippedName}_fpoversikt`;
                    }

                    return typeName;
                },
            },
        },
    ],
});
