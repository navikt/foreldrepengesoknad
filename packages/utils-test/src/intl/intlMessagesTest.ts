import { extract } from '@formatjs/cli-lib';
import { globSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

type Messages = Record<string, string>;

export interface IntlMessagesTestConfig {
    /** Navn på describe-blokken. */
    name: string;
    /**
     * Språkfilene som skal sammenlignes. Nøkkelen brukes i feilmeldinger (typisk filnavn,
     * f.eks. `nb_NO`). Hvis `referenceLocale` ikke er satt brukes `nb_NO` dersom den finnes,
     * ellers den første nøkkelen.
     */
    locales: Record<string, Messages>;
    /** Locale som koden sjekkes mot. Default: `nb_NO` (eller første locale). */
    referenceLocale?: string;
    /** Glob for kildefiler som skal skannes for i18n-nøkler. Default: `src/**\/*.{ts,tsx}`. */
    sourceGlob?: string;
    /** Hent ut ekstra i18n-nøkler som ikke fanges av defineMessages/FormattedMessage. */
    extractAdditionalCodeKeys?: (fileContent: string) => string[];
    /** Returner `true` for referansenøkler som ikke kreves å finnes i koden. */
    ignoreReferenceKey?: (key: string) => boolean;
}

const DEFAULT_SOURCE_GLOB = 'src/**/*.{ts,tsx}';
const DEFAULT_REFERENCE_LOCALE = 'nb_NO';

const finnManglendeNøkler = (kilde: Messages, mål: Messages): string[] => {
    const målNøkler = new Set(Object.keys(mål));
    return Object.keys(kilde).filter((key) => !målNøkler.has(key));
};

const hentKodeNøkler = async (
    sourceGlob: string,
    extractAdditionalCodeKeys?: (fileContent: string) => string[],
): Promise<string[]> => {
    const files = globSync(sourceGlob);
    const foundTranslations = await extract(files, {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
    });
    const ekstraNøkler = extractAdditionalCodeKeys
        ? files.flatMap((fileLoc) => extractAdditionalCodeKeys(readFileSync(fileLoc).toString()))
        : [];
    return [...Object.keys(JSON.parse(foundTranslations) as Messages), ...ekstraNøkler];
};

/**
 * Delt testoppsett for i18n-meldingsfiler. Verifiserer at:
 * - alle språkfilene har nøyaktig de samme nøklene, og
 * - i18n-nøkler i koden og i referansefila stemmer overens.
 *
 * Erstatter den tidligere nesten-identiske `intl.test.ts`-koden som var duplisert i hver app/pakke.
 */
export const createIntlMessagesTest = ({
    name,
    locales,
    referenceLocale,
    sourceGlob = DEFAULT_SOURCE_GLOB,
    extractAdditionalCodeKeys,
    ignoreReferenceKey,
}: IntlMessagesTestConfig): void => {
    const localeEntries = Object.entries(locales);
    const referanseNavn =
        referenceLocale ?? (DEFAULT_REFERENCE_LOCALE in locales ? DEFAULT_REFERENCE_LOCALE : localeEntries[0]?.[0]);
    const referanse = referanseNavn ? locales[referanseNavn] : undefined;

    if (!referanse || !referanseNavn) {
        throw new Error('createIntlMessagesTest krever minst én locale.');
    }

    // eslint-disable-next-line vitest/valid-title
    describe(name, () => {
        for (let i = 0; i < localeEntries.length; i++) {
            for (let j = i + 1; j < localeEntries.length; j++) {
                const [navnA, meldingerA] = localeEntries[i]!;
                const [navnB, meldingerB] = localeEntries[j]!;
                it(`${navnA} og ${navnB} skal ha de samme nøklene`, () => {
                    const manglerIB = finnManglendeNøkler(meldingerA, meldingerB);
                    const manglerIA = finnManglendeNøkler(meldingerB, meldingerA);
                    for (const key of manglerIB) {
                        // eslint-disable-next-line no-console
                        console.log(`Nøkkel '${key}' finnes i ${navnA} men ikke i ${navnB}.`);
                    }
                    for (const key of manglerIA) {
                        // eslint-disable-next-line no-console
                        console.log(`Nøkkel '${key}' finnes i ${navnB} men ikke i ${navnA}.`);
                    }
                    expect(manglerIB.length).toBe(0);
                    expect(manglerIA.length).toBe(0);
                });
            }
        }

        it(`i18n-strenger i koden skal finnes i ${referanseNavn}`, async () => {
            const kodeNøkler = await hentKodeNøkler(sourceGlob, extractAdditionalCodeKeys);
            const referanseNøkler = new Set(Object.keys(referanse));
            const mangler = kodeNøkler.filter((key) => !referanseNøkler.has(key));
            for (const key of mangler) {
                // eslint-disable-next-line no-console
                console.log(`Ikke funnet i ${referanseNavn}: ${key}`);
            }
            expect(mangler.length).toBe(0);
        });

        it(`alle i18n-strenger i ${referanseNavn} skal finnes i koden`, async () => {
            const kodeNøkler = new Set(await hentKodeNøkler(sourceGlob, extractAdditionalCodeKeys));
            const mangler = Object.keys(referanse).filter(
                (key) => !(ignoreReferenceKey?.(key) ?? false) && !kodeNøkler.has(key),
            );
            for (const key of mangler) {
                // eslint-disable-next-line no-console
                console.log(`Ikke funnet i koden: ${key}`);
            }
            expect(mangler.length).toBe(0);
        });
    });
};
