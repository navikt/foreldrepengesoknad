import { IntlShape } from 'react-intl';
import { describe, expect, it, vi } from 'vitest';

import { OmBarnetPlanlegger } from '@navikt/fp-types';

import messages from '../intl/messages/nb_NO.json';
import { HvemPlanlegger, HvemPlanleggerType } from '../types/HvemPlanlegger';
import {
    erLikekjønnetPar,
    getEffektivHvemPlanlegger,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnForHvemStarterPermisjon,
    getNavnPåForeldre,
} from './HvemPlanleggerUtils';

const mockIntl: IntlShape = {
    formatMessage: vi.fn(({ id }) => {
        return messages[id as keyof typeof messages] || id;
    }),
} as unknown as IntlShape;

describe('getNavnPåForeldre', () => {
    it('skal returnere riktige navn for FAR type', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR,
        };

        const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

        expect(resultat).toEqual({
            farMedmor: 'far',
            mor: 'mor',
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
        };

        const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

        expect(resultat).toEqual({
            mor: 'mor',
            farMedmor: 'far',
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
        it('skal bruke standardnavn når far er alene om omsorgen', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.FAR,
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                farMedmor: 'far',
                mor: 'mor',
            });
        });

        it('skal bruke standardnavn når mor er alene om omsorgen', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.MOR,
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                farMedmor: 'far',
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
                mor: 'far 2',
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
                farMedmor: 'medmor',
            });
        });
    });

    describe('edge cases', () => {
        it('skal håndtere tomme strenger som navn', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.MOR_OG_FAR,
                navnPåMor: '',
                navnPåFar: '',
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                farMedmor: 'far',
                mor: 'mor',
            });
        });

        it('skal håndtere navn med kun mellomrom', () => {
            const hvemPlanlegger: HvemPlanlegger = {
                type: HvemPlanleggerType.MOR_OG_FAR,
            };

            const resultat = getNavnPåForeldre(hvemPlanlegger, mockIntl);

            expect(resultat).toEqual({
                mor: 'mor',
                farMedmor: 'far',
            });
        });
    });
});

describe('erLikekjønnetPar', () => {
    it('skal returnere true for FAR_OG_FAR', () => {
        expect(erLikekjønnetPar({ type: HvemPlanleggerType.FAR_OG_FAR })).toBe(true);
    });

    it('skal returnere true for MOR_OG_MEDMOR', () => {
        expect(erLikekjønnetPar({ type: HvemPlanleggerType.MOR_OG_MEDMOR })).toBe(true);
    });

    it('skal returnere false for MOR_OG_FAR', () => {
        expect(erLikekjønnetPar({ type: HvemPlanleggerType.MOR_OG_FAR })).toBe(false);
    });
});

describe('getNavnForHvemStarterPermisjon', () => {
    it('skal returnere oppgitte navn for FAR_OG_FAR', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Ola Nordmann',
            navnPåMedfar: 'Per Hansen',
        };

        expect(getNavnForHvemStarterPermisjon(hvemPlanlegger, mockIntl)).toEqual({
            navnSøker1: 'Ola Nordmann',
            navnSøker2: 'Per Hansen',
        });
    });

    it('skal falle tilbake til Far 1/Far 2 når navn mangler for FAR_OG_FAR', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
        };

        expect(getNavnForHvemStarterPermisjon(hvemPlanlegger, mockIntl)).toEqual({
            navnSøker1: 'Far 1',
            navnSøker2: 'Far 2',
        });
    });

    it('skal falle tilbake til Mor/Medmor når navn mangler for MOR_OG_MEDMOR', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
        };

        expect(getNavnForHvemStarterPermisjon(hvemPlanlegger, mockIntl)).toEqual({
            navnSøker1: 'Mor',
            navnSøker2: 'Medmor',
        });
    });
});

describe('getEffektivHvemPlanlegger', () => {
    const adoptertBarnet = {
        erFødsel: false,
        fødselsdato: '2024-01-01',
        overtakelsesdato: '2024-01-01',
        antallBarn: '1',
    } as OmBarnetPlanlegger;

    const fødtBarnet = {
        erFødsel: true,
        erBarnetFødt: true,
        fødselsdato: '2024-01-01',
        antallBarn: '1',
    } as OmBarnetPlanlegger;

    it('skal ikke bytte om navn når hvemStarterPermisjon er søker1', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Ola Nordmann',
            navnPåMedfar: 'Per Hansen',
        };

        const resultat = getEffektivHvemPlanlegger(
            hvemPlanlegger,
            { antallDagerSøker1: 75, hvemStarterPermisjon: 'søker1' },
            adoptertBarnet,
            mockIntl,
        );

        expect(resultat).toEqual(hvemPlanlegger);
    });

    it('skal bytte om navnPåFar/navnPåMedfar når hvemStarterPermisjon er søker2 for FAR_OG_FAR', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Ola Nordmann',
            navnPåMedfar: 'Per Hansen',
        };

        const resultat = getEffektivHvemPlanlegger(
            hvemPlanlegger,
            { antallDagerSøker1: 75, hvemStarterPermisjon: 'søker2' },
            adoptertBarnet,
            mockIntl,
        );

        expect(resultat).toEqual({
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Per Hansen',
            navnPåMedfar: 'Ola Nordmann',
        });
    });

    it('skal bytte om navnPåMor/navnPåMedmor når hvemStarterPermisjon er søker2 for MOR_OG_MEDMOR', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMor: 'Kari Nordmann',
            navnPåMedmor: 'Anne Hansen',
        };

        const resultat = getEffektivHvemPlanlegger(
            hvemPlanlegger,
            { antallDagerSøker1: 75, hvemStarterPermisjon: 'søker2' },
            adoptertBarnet,
            mockIntl,
        );

        expect(resultat).toEqual({
            type: HvemPlanleggerType.MOR_OG_MEDMOR,
            navnPåMor: 'Anne Hansen',
            navnPåMedmor: 'Kari Nordmann',
        });
    });

    it('skal ikke bytte om navn ved fødsel selv om par er likekjønnet', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Ola Nordmann',
            navnPåMedfar: 'Per Hansen',
        };

        const resultat = getEffektivHvemPlanlegger(
            hvemPlanlegger,
            { antallDagerSøker1: 75, hvemStarterPermisjon: 'søker2' },
            fødtBarnet,
            mockIntl,
        );

        expect(resultat).toEqual(hvemPlanlegger);
    });

    it('skal bytte om Far 1/Far 2 fallback-navn når hvemStarterPermisjon er søker2 og navn ikke er oppgitt', () => {
        const hvemPlanlegger: HvemPlanlegger = { type: HvemPlanleggerType.FAR_OG_FAR };

        const resultat = getEffektivHvemPlanlegger(
            hvemPlanlegger,
            { antallDagerSøker1: 75, hvemStarterPermisjon: 'søker2' },
            adoptertBarnet,
            mockIntl,
        );

        expect(resultat).toEqual({
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Far 2',
            navnPåMedfar: 'Far 1',
        });
    });

    it('skal ikke bytte om navn for ulikekjønnet par selv ved adopsjon', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.MOR_OG_FAR,
            navnPåMor: 'Kari Nordmann',
            navnPåFar: 'Ola Hansen',
        };

        const resultat = getEffektivHvemPlanlegger(
            hvemPlanlegger,
            { antallDagerSøker1: 75, hvemStarterPermisjon: 'søker2' },
            adoptertBarnet,
            mockIntl,
        );

        expect(resultat).toEqual(hvemPlanlegger);
    });
});

describe('getFornavnPåSøker1 og getFornavnPåSøker2 for likekjønnede par uten navn', () => {
    it('skal bruke «far 1»/«far 2» (ikke bare «far») som fornavn for FAR_OG_FAR uten navn', () => {
        const hvemPlanlegger: HvemPlanlegger = { type: HvemPlanleggerType.FAR_OG_FAR };

        expect(getFornavnPåSøker1(hvemPlanlegger, mockIntl)).toBe('far 1');
        expect(getFornavnPåSøker2(hvemPlanlegger, mockIntl)).toBe('far 2');
    });

    it('skal fortsatt bruke «mor»/«medmor» for MOR_OG_MEDMOR uten navn (allerede distinkte roller, ingen nummerering nødvendig)', () => {
        const hvemPlanlegger: HvemPlanlegger = { type: HvemPlanleggerType.MOR_OG_MEDMOR };

        expect(getFornavnPåSøker1(hvemPlanlegger, mockIntl)).toBe('mor');
        expect(getFornavnPåSøker2(hvemPlanlegger, mockIntl)).toBe('medmor');
    });

    it('skal fortsatt bruke «far»/«mor» for MOR_OG_FAR uten navn (ikke likekjønnet, ingen nummerering nødvendig)', () => {
        const hvemPlanlegger: HvemPlanlegger = { type: HvemPlanleggerType.MOR_OG_FAR };

        expect(getFornavnPåSøker1(hvemPlanlegger, mockIntl)).toBe('mor');
        expect(getFornavnPåSøker2(hvemPlanlegger, mockIntl)).toBe('far');
    });

    it('skal bruke oppgitt fornavn når navn er satt for FAR_OG_FAR', () => {
        const hvemPlanlegger: HvemPlanlegger = {
            type: HvemPlanleggerType.FAR_OG_FAR,
            navnPåFar: 'Ola Nordmann',
            navnPåMedfar: 'Per Hansen',
        };

        expect(getFornavnPåSøker1(hvemPlanlegger, mockIntl)).toBe('Ola');
        expect(getFornavnPåSøker2(hvemPlanlegger, mockIntl)).toBe('Per');
    });
});
