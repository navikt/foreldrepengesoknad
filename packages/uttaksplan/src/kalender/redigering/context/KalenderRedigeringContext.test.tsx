import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BarnType } from '@navikt/fp-constants';
import { UttakDto, UttakPeriodeDto } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import { FjernAltIUttaksplanModal } from '../../../FjernAltIUttaksplanModal';
import { UttaksplanDataProvider } from '../../../context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider, useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { nyUttaksplanMessages } from '../../../intl/nyUttaksplanMessages';
import { UttakPeriodeBuilder } from '../../../utils/UttakPeriodeBuilder';
import { KalenderRedigeringProvider, useKalenderRedigeringContext } from './KalenderRedigeringContext';

type Kontekst = ReturnType<typeof useKalenderRedigeringContext>;
type Operasjon = (kontekst: Kontekst, etterUtført: () => void) => void;

const periode = (fom: string, tom: string, ekstra: Partial<UttakDto> = {}): UttakPeriodeDto => ({
    fom,
    tom,
    søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false, ...ekstra },
});
const ferie = { utsettelseÅrsak: 'FERIE', kontoType: undefined } as const;
const gradering = { gradering: { arbeidstidprosent: 50 } };

const PLAN = [periode('2026-09-07', '2026-10-02')];
const UTVALG = { fom: '2026-09-14', tom: '2026-09-16' };

const leggTil =
    (ny: UttakPeriodeDto): Operasjon =>
    (kontekst, etterUtført) =>
        kontekst.leggTilUttaksplanPerioder([ny], false, etterUtført);
const slett: Operasjon = (kontekst, etterUtført) => kontekst.slettUttaksplanPerioder([UTVALG], false, etterUtført);

const Knapper = ({ operasjon, etterUtført }: { operasjon: Operasjon; etterUtført: () => void }) => {
    const kontekst = useKalenderRedigeringContext();
    const redigering = useUttaksplanRedigering();
    return (
        <>
            <button type="button" onClick={() => operasjon(kontekst, etterUtført)}>
                Utfør
            </button>
            <button type="button" onClick={() => redigering?.setVisFjernAltModal(true)}>
                Fjern alt
            </button>
        </>
    );
};

const renderKontekst = ({
    perioder = PLAN,
    erEndringssøknad = true,
    operasjon = slett,
}: { perioder?: UttakPeriodeDto[]; erEndringssøknad?: boolean; operasjon?: Operasjon } = {}) => {
    const oppdaterUttaksplan = vi.fn();
    const etterUtført = vi.fn();
    render(
        <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: nyUttaksplanMessages.nb }}>
            <UttaksplanDataProvider
                barn={{ type: BarnType.FØDT, fødselsdatoer: ['2026-06-01'], antallBarn: 1 }}
                foreldreInfo={{
                    rettighetType: 'BEGGE_RETT',
                    søker: 'MOR',
                    navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
                    erMedmorDelAvSøknaden: false,
                }}
                valgtStønadskvote={{
                    kontoer: [{ konto: 'MØDREKVOTE', dager: 95 }],
                    minsteretter: { farRundtFødsel: 10, toTette: 0 },
                }}
                harAktivitetskravIPeriodeUtenUttak={false}
                erPeriodeneTilAnnenPartLåst={false}
                perioder={perioder}
                erEndringssøknad={erEndringssøknad}
            >
                <UttaksplanRedigeringProvider oppdaterUttaksplan={oppdaterUttaksplan} harEndretPlan={false}>
                    <KalenderRedigeringProvider
                        valgtePerioder={[]}
                        setValgtePerioder={() => undefined}
                        setEndredePerioder={() => undefined}
                    >
                        <Knapper operasjon={operasjon} etterUtført={etterUtført} />
                    </KalenderRedigeringProvider>
                    <FjernAltIUttaksplanModal />
                </UttaksplanRedigeringProvider>
            </UttaksplanDataProvider>
        </IntlProvider>,
    );
    return { oppdaterUttaksplan, etterUtført };
};

describe('KalenderRedigeringContext', () => {
    beforeEach(() => {
        vi.setSystemTime(new Date('2026-10-16T12:00:00.000Z'));
    });

    it.each([
        {
            navn: 'sletting',
            operasjon: slett,
            knapp: 'Slett',
            forventet: new UttakPeriodeBuilder(PLAN, 'kalender')
                .fjernUttakPerioder([UTVALG], false, false)
                .getUttakPerioder(),
        },
        ...[
            { navn: 'ferie', ny: periode(UTVALG.fom, UTVALG.tom, ferie) },
            { navn: 'gradering', ny: periode(UTVALG.fom, UTVALG.tom, gradering) },
        ].map(({ navn, ny }) => ({
            navn,
            operasjon: leggTil(ny),
            knapp: 'Endre',
            forventet: new UttakPeriodeBuilder(PLAN, 'kalender').leggTilUttakPerioder([ny], false).getUttakPerioder(),
        })),
    ])('ber om bekreftelse før historisk $navn', async ({ operasjon, knapp, forventet }) => {
        const user = userEvent.setup();
        const { oppdaterUttaksplan, etterUtført } = renderKontekst({ operasjon });

        await user.click(screen.getByRole('button', { name: 'Utfør' }));
        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Avbryt' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).not.toHaveBeenCalled();

        await user.click(screen.getByRole('button', { name: 'Utfør' }));
        expect(oppdaterUttaksplan).not.toHaveBeenCalled();
        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: knapp }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledExactlyOnceWith(forventet);
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it.each(['Avbryt', 'Escape', 'Lukk'])('endrer ikke planen når dialogen lukkes med %s', async (lukkemåte) => {
        const user = userEvent.setup();
        const perioder = [periode('2026-09-07', '2026-10-02')];
        const original = structuredClone(perioder);
        const { oppdaterUttaksplan, etterUtført } = renderKontekst({
            perioder,
            operasjon: leggTil(periode(UTVALG.fom, UTVALG.tom, ferie)),
        });

        await user.click(screen.getByRole('button', { name: 'Utfør' }));
        if (lukkemåte === 'Escape') {
            await user.keyboard('{Escape}');
        } else {
            await user.click(
                within(screen.getByRole('dialog')).getByRole('button', { name: new RegExp(lukkemåte, 'i') }),
            );
        }

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).not.toHaveBeenCalled();
        expect(etterUtført).not.toHaveBeenCalled();
        expect(perioder).toEqual(original);
    });

    it.each([
        { navn: 'ny søknad', erEndringssøknad: false, operasjon: leggTil(periode(UTVALG.fom, UTVALG.tom, ferie)) },
        { navn: 'ny søknad ved sletting', erEndringssøknad: false, operasjon: slett },
        {
            navn: 'endring i inneværende måned',
            operasjon: leggTil(periode('2026-10-07', '2026-10-09', ferie)),
        },
        { navn: 'sletting uten uttak', perioder: [periode('2026-10-19', '2026-10-30')], operasjon: slett },
    ])('utfører uten dialog for $navn', async ({ erEndringssøknad, perioder, operasjon }) => {
        const user = userEvent.setup();
        const { oppdaterUttaksplan, etterUtført } = renderKontekst({ erEndringssøknad, perioder, operasjon });

        await user.click(screen.getByRole('button', { name: 'Utfør' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it('viser bare én dialog når FjernAltIUttaksplanModal åpnes', async () => {
        const user = userEvent.setup();
        renderKontekst();

        await user.click(screen.getByRole('button', { name: 'Fjern alt' }));

        const dialoger = screen.getAllByRole('dialog');
        expect(dialoger).toHaveLength(1);
        expect(dialoger[0]).toHaveTextContent('Ønsker du å fjerne alt som er lagt til?');
    });
});
