import { IntlShape } from 'react-intl';
import { describe, expect, it, vi } from 'vitest';

import { HvemPlanleggerType } from '@navikt/fp-types';

import { HvemPlanlegger } from '../types/HvemPlanlegger';
import { getNavnPåForeldre } from './HvemPlanleggerUtils';

const mockIntl: IntlShape = {
    formatMessage: vi.fn(({ id }) => {
        const messages: Record<string, string> = {
            'HvemPlanlegger.DefaultFarNavn': 'far',
            'HvemPlanlegger.DefaultMorNavn': 'mor',
        };
        return messages[id] || id;
    }),
} as any;

describe('getNavnPåForeldre', () => {
    it('skal returnere riktige navn for FAR type', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR,
            navnPåFar: 'Ola Nordmann',
        };

        const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

        expect(resultat).toEqual({
            farMedmor: 'Ola Nordmann',
        });
    });

    it('skal returnere riktige navn for FAR_OG_FAR type', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Ola Nordmann',
            navnPåMedfar: 'Per Hansen',
        };

        const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

        expect(resultat).toEqual({
            farMedmor: 'Ola Nordmann',
            mor: 'Per Hansen',
        });
    });

    it('skal returnere riktige navn for MOR type', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.MOR,
            navnPåMor: 'Kari Nordmann',
        };

        const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

        expect(resultat).toEqual({
            mor: 'Kari Nordmann',
        });
    });

    it('skal returnere riktige navn for MOR_OG_MEDMOR type', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMor: 'Kari Nordmann',
            navnPåMedmor: 'Anne Hansen',
        };

        const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

        expect(resultat).toEqual({
            farMedmor: 'Anne Hansen',
            mor: 'Kari Nordmann',
        });
    });

    it('skal returnere riktige navn for MOR_OG_FAR type (default case)', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_FAR,
            navnPåMor: 'Kari Nordmann',
            navnPåFar: 'Ola Hansen',
        };

        const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

        expect(resultat).toEqual({
            farMedmor: 'Ola Hansen',
            mor: 'Kari Nordmann',
        });
    });

    describe('fallback til standardnavn', () => {
        it('skal bruke standardnavn når navnPåFar er undefined for FAR type', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.FAR,
                navnPåFar: undefined,
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                farMedmor: 'far',
            });
        });

        it('skal bruke standardnavn når navnPåMor er undefined for MOR type', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.MOR,
                navnPåMor: undefined,
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                mor: 'mor',
            });
        });

        it('skal bruke standardnavn når navnPåMedfar er undefined for FAR_OG_FAR type', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.FAR_OG_FAR,
                navnPåFar: 'Ola Nordmann',
                navnPåMedfar: undefined,
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                farMedmor: 'Ola Nordmann',
                mor: 'far',
            });
        });

        it('skal bruke standardnavn når navnPåMedmor er undefined for MOR_OG_MEDMOR type', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.MOR_OG_MEDMOR,
                navnPåMor: 'Kari Nordmann',
                navnPåMedmor: undefined,
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                mor: 'Kari Nordmann',
                farMedmor: 'mor',
            });
        });
    });

    describe('edge cases', () => {
        it('skal håndtere tomme strenger som navn', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.FAR,
                navnPåFar: '',
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                farMedmor: 'far',
            });
        });

        it('skal håndtere navn med kun mellomrom', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.MOR,
                navnPåMor: '   ',
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                mor: 'mor',
            });
        });
    });
});
