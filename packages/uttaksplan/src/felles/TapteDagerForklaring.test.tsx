import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { IntlProvider } from 'react-intl';
import { describe, expect, it } from 'vitest';

import { BarnType } from '@navikt/fp-constants';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import messages from '../intl/messages/nb_NO.json';
import { TapteDagerForklaring } from './TapteDagerForklaring';

const FAMILIEHENDELSESDATO = '2026-01-20';
const INNEN_SEKS_UKER = '2026-02-10'; // ~3 uker etter fødsel
const ETTER_SEKS_UKER = '2026-04-01'; // godt over 6 uker etter fødsel

const BEGGE_RETT_FØRSTE_SEKS_UKER = messages['uttaksplan.tapteDager.forklaring.beggeRettFørsteSeksUker'];
const BARE_FAR_MEDMOR_RETT = messages['uttaksplan.tapteDager.forklaring.bareFarMedmorRett'];

const DEFAULT_DATA = {
    foreldreInfo: {
        søker: 'MOR',
        rettighetType: 'BEGGE_RETT',
        erMedmorDelAvSøknaden: false,
        navnPåForeldre: { farMedmor: 'Far Medmor', mor: 'Mor' },
    },
    valgtStønadskvote: {
        kontoer: [
            { konto: 'MØDREKVOTE', dager: 100 },
            { konto: 'FELLESPERIODE', dager: 100 },
        ],
        minsteretter: {
            farRundtFødsel: 10,
            toTette: 14,
        },
    },
    barn: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: [FAMILIEHENDELSESDATO],
    },
    harAktivitetskravIPeriodeUtenUttak: false,
    uttakPerioder: [],
    erPeriodeneTilAnnenPartLåst: false,
    children: [],
    erEndringssøknad: false,
} satisfies ComponentProps<typeof UttaksplanDataProvider>;

const renderForklaring = (fom: string, customData?: Partial<ComponentProps<typeof UttaksplanDataProvider>>) => {
    const data = { ...DEFAULT_DATA, ...customData } as ComponentProps<typeof UttaksplanDataProvider>;
    return render(
        <IntlProvider locale="nb" messages={messages}>
            <UttaksplanDataProvider {...data}>
                <TapteDagerForklaring fom={fom} />
            </UttaksplanDataProvider>
        </IntlProvider>,
    );
};

describe('TapteDagerForklaring', () => {
    it('viser forklaring om de første seks ukene når begge har rett og perioden er innen seks uker etter fødsel', () => {
        renderForklaring(INNEN_SEKS_UKER);

        expect(screen.getByText(BEGGE_RETT_FØRSTE_SEKS_UKER)).toBeInTheDocument();
        expect(screen.queryByText(BARE_FAR_MEDMOR_RETT)).not.toBeInTheDocument();
    });

    it('viser ikke seks-ukers-forklaringen når perioden er etter de første seks ukene', () => {
        renderForklaring(ETTER_SEKS_UKER);

        expect(screen.queryByText(BEGGE_RETT_FØRSTE_SEKS_UKER)).not.toBeInTheDocument();
    });

    it('viser ikke seks-ukers-forklaringen ved prematur fødsel før uke 33', () => {
        renderForklaring(INNEN_SEKS_UKER, {
            valgtStønadskvote: {
                ...DEFAULT_DATA.valgtStønadskvote,
                tillegg: { flerbarn: 0, prematur: 25 },
            },
        });

        expect(screen.queryByText(BEGGE_RETT_FØRSTE_SEKS_UKER)).not.toBeInTheDocument();
    });

    it('viser aktivitetskrav-forklaring når bare far/medmor har rett', () => {
        renderForklaring(INNEN_SEKS_UKER, {
            foreldreInfo: {
                ...DEFAULT_DATA.foreldreInfo,
                søker: 'FAR_MEDMOR',
                rettighetType: 'BARE_SØKER_RETT',
            },
        });

        expect(screen.getByText(BARE_FAR_MEDMOR_RETT)).toBeInTheDocument();
        expect(screen.queryByText(BEGGE_RETT_FØRSTE_SEKS_UKER)).not.toBeInTheDocument();
    });

    it('viser ingen forklaring når bare mor har rett', () => {
        const { container } = renderForklaring(INNEN_SEKS_UKER, {
            foreldreInfo: {
                ...DEFAULT_DATA.foreldreInfo,
                søker: 'MOR',
                rettighetType: 'BARE_SØKER_RETT',
            },
        });

        expect(screen.queryByText(BEGGE_RETT_FØRSTE_SEKS_UKER)).not.toBeInTheDocument();
        expect(screen.queryByText(BARE_FAR_MEDMOR_RETT)).not.toBeInTheDocument();
        expect(container).toBeEmptyDOMElement();
    });
});
