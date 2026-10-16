import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BarnType } from '@navikt/fp-constants';
import { UttakPeriodeDto } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';

import { FjernAltIUttaksplanModal } from '../../../FjernAltIUttaksplanModal';
import { UttaksplanDataProvider } from '../../../context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider, useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { nyUttaksplanMessages } from '../../../intl/nyUttaksplanMessages';
import { ForeldreInfo } from '../../../types/ForeldreInfo';
import { UttakPeriodeBuilder } from '../../../utils/UttakPeriodeBuilder';
import { KalenderRedigeringProvider, useKalenderRedigeringContext } from './KalenderRedigeringContext';

const ORIGINAL_PERIODS: UttakPeriodeDto[] = [
    {
        fom: '2024-06-03',
        tom: '2024-06-28',
        søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
    },
];

const SELECTED_PERIODS: CalendarPeriod[] = [
    { fom: '2024-06-03', tom: '2024-06-28', color: 'BLUE', srText: 'Valgt periode' },
];

const foreldreInfo: ForeldreInfo = {
    rettighetType: 'BEGGE_RETT',
    søker: 'MOR',
    navnPåForeldre: { mor: 'Hanne', farMedmor: 'Hans' },
    erMedmorDelAvSøknaden: false,
};

const lagFerieperiode = (fom: string, tom: string): UttakPeriodeDto => ({
    fom,
    tom,
    søker: { forelder: 'MOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
});

const lagGraderingsperiode = (fom: string, tom: string): UttakPeriodeDto => ({
    fom,
    tom,
    søker: {
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        flerbarnsdager: false,
        gradering: { arbeidstidprosent: 50 },
    },
});

type HarnessProps = {
    perioder?: UttakPeriodeDto[];
    erEndringssøknad?: boolean;
    datoer?: { fom: string; tom: string };
    oppdaterUttaksplan: (perioder: UttakPeriodeDto[] | undefined) => void;
    etterUtført: () => void;
};

const Harness = ({
    perioder = ORIGINAL_PERIODS,
    erEndringssøknad = true,
    datoer = { fom: '2024-06-10', tom: '2024-06-12' },
    oppdaterUttaksplan,
    etterUtført,
}: HarnessProps) => {
    const [fom, setFom] = useState(datoer.fom);
    const [tom, setTom] = useState(datoer.tom);

    return (
        <IntlProvider locale="nb" messages={nyUttaksplanMessages.nb}>
            <UttaksplanDataProvider
                barn={{ type: BarnType.FØDT, fødselsdatoer: ['2024-01-01'], antallBarn: 1 }}
                foreldreInfo={foreldreInfo}
                valgtStønadskvote={{
                    kontoer: [
                        { konto: 'MØDREKVOTE', dager: 95 },
                        { konto: 'FEDREKVOTE', dager: 95 },
                        { konto: 'FELLESPERIODE', dager: 101 },
                        { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 15 },
                    ],
                    minsteretter: { farRundtFødsel: 10, toTette: 0 },
                }}
                harAktivitetskravIPeriodeUtenUttak={false}
                erPeriodeneTilAnnenPartLåst={false}
                perioder={perioder}
                erEndringssøknad={erEndringssøknad}
            >
                <UttaksplanRedigeringProvider oppdaterUttaksplan={oppdaterUttaksplan} harEndretPlan={false}>
                    <KalenderRedigeringProvider
                        valgtePerioder={SELECTED_PERIODS}
                        setValgtePerioder={() => undefined}
                        setEndredePerioder={() => undefined}
                    >
                        <ApiHarness fom={fom} tom={tom} setFom={setFom} setTom={setTom} etterUtført={etterUtført} />
                    </KalenderRedigeringProvider>
                    <FjernAltIUttaksplanModal />
                </UttaksplanRedigeringProvider>
            </UttaksplanDataProvider>
        </IntlProvider>
    );
};

const ApiHarness = ({
    fom,
    tom,
    setFom,
    setTom,
    etterUtført,
}: {
    fom: string;
    tom: string;
    setFom: (value: string) => void;
    setTom: (value: string) => void;
    etterUtført: () => void;
}) => {
    const { leggTilUttaksplanPerioder, slettUttaksplanPerioder, sammenslåtteValgtePerioder } =
        useKalenderRedigeringContext();
    const uttaksplanRedigering = useUttaksplanRedigering();

    return (
        <>
            <label>
                Fra
                <input aria-label="Fra" value={fom} onChange={(event) => setFom(event.target.value)} />
            </label>
            <label>
                Til
                <input aria-label="Til" value={tom} onChange={(event) => setTom(event.target.value)} />
            </label>
            <output aria-label="Valgte perioder">{JSON.stringify(sammenslåtteValgtePerioder)}</output>
            <button
                type="button"
                onClick={() => leggTilUttaksplanPerioder([lagFerieperiode(fom, tom)], false, 'ferie', etterUtført)}
            >
                Legg til ferie
            </button>
            <button type="button" onClick={() => slettUttaksplanPerioder([{ fom, tom }], false, etterUtført)}>
                Slett periode
            </button>
            <button type="button" onClick={() => slettUttaksplanPerioder([{ fom, tom }], true, etterUtført)}>
                Slett periode med forskyvning
            </button>
            <button
                type="button"
                onClick={() => leggTilUttaksplanPerioder([lagFerieperiode(fom, tom)], true, 'ferie', etterUtført)}
            >
                Legg til ferie med forskyvning
            </button>
            <button
                type="button"
                onClick={() =>
                    leggTilUttaksplanPerioder([lagGraderingsperiode(fom, tom)], false, 'gradering', etterUtført)
                }
            >
                Legg til gradering
            </button>
            <button type="button" onClick={() => uttaksplanRedigering?.setVisFjernAltModal(true)}>
                Åpne Fjern alt modal
            </button>
        </>
    );
};

const renderHarness = (
    options: {
        perioder?: UttakPeriodeDto[];
        erEndringssøknad?: boolean;
        datoer?: { fom: string; tom: string };
    } = {},
) => {
    const oppdaterUttaksplan = vi.fn();
    const etterUtført = vi.fn();
    render(<Harness {...options} oppdaterUttaksplan={oppdaterUttaksplan} etterUtført={etterUtført} />);
    return { oppdaterUttaksplan, etterUtført };
};

const forventetPlanEtterTillegg = (perioder: UttakPeriodeDto[], nyePerioder: UttakPeriodeDto[], forskyv: boolean) =>
    new UttakPeriodeBuilder(perioder, 'kalender').leggTilUttakPerioder(nyePerioder, forskyv).getUttakPerioder();

const forventetPlanEtterSletting = (
    perioder: UttakPeriodeDto[],
    intervaller: Array<{ fom: string; tom: string }>,
    forskyv: boolean,
) => new UttakPeriodeBuilder(perioder, 'kalender').fjernUttakPerioder(intervaller, forskyv, false).getUttakPerioder();

describe('KalenderRedigeringContext', () => {
    beforeEach(() => {
        vi.setSystemTime(new Date('2024-07-01T12:00:00.000Z'));
    });

    it.each([false, true])(
        'utsetter ferieendring i historisk periode til bekreftelse (forskyvning: %s)',
        async (forskyv) => {
            const user = userEvent.setup();
            const { oppdaterUttaksplan, etterUtført } = renderHarness();

            await user.click(
                screen.getByRole('button', { name: forskyv ? 'Legg til ferie med forskyvning' : 'Legg til ferie' }),
            );

            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(oppdaterUttaksplan).not.toHaveBeenCalled();
            expect(etterUtført).not.toHaveBeenCalled();

            await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Endre' }));

            expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
            expect(oppdaterUttaksplan).toHaveBeenCalledWith(
                forventetPlanEtterTillegg(ORIGINAL_PERIODS, [lagFerieperiode('2024-06-10', '2024-06-12')], forskyv),
            );
            expect(etterUtført).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        },
    );

    it.each([false, true])(
        'utsetter sletting i historisk periode til bekreftelse (forskyvning: %s)',
        async (forskyv) => {
            const user = userEvent.setup();
            const { oppdaterUttaksplan, etterUtført } = renderHarness();

            await user.click(
                screen.getByRole('button', {
                    name: forskyv ? 'Slett periode med forskyvning' : 'Slett periode',
                }),
            );

            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(oppdaterUttaksplan).not.toHaveBeenCalled();
            expect(etterUtført).not.toHaveBeenCalled();

            await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Slett' }));

            expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
            expect(oppdaterUttaksplan).toHaveBeenCalledWith(
                forventetPlanEtterSletting(ORIGINAL_PERIODS, [{ fom: '2024-06-10', tom: '2024-06-12' }], forskyv),
            );
            expect(etterUtført).toHaveBeenCalledTimes(1);
        },
    );

    it('beholder dato-input og valgte perioder når bekreftelsen avbrytes, lukkes med Escape eller lukkes fra header', async () => {
        const user = userEvent.setup();
        const { oppdaterUttaksplan, etterUtført } = renderHarness();
        const selected = screen.getByLabelText('Valgte perioder').textContent;
        const closeDialog = async (lukkemåte: 'avbryt' | 'escape' | 'header') => {
            await user.click(screen.getByRole('button', { name: 'Legg til ferie' }));
            expect(screen.getByRole('dialog')).toBeInTheDocument();

            if (lukkemåte === 'avbryt') {
                await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Avbryt' }));
            } else if (lukkemåte === 'escape') {
                await user.keyboard('{Escape}');
            } else {
                await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: /lukk/i }));
            }

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(screen.getByLabelText('Fra')).toHaveValue('2024-06-10');
            expect(screen.getByLabelText('Til')).toHaveValue('2024-06-12');
            expect(screen.getByLabelText('Valgte perioder')).toHaveTextContent(selected ?? '');
            expect(oppdaterUttaksplan).not.toHaveBeenCalled();
            expect(etterUtført).not.toHaveBeenCalled();
        };

        await closeDialog('avbryt');
        await closeDialog('escape');
        await closeDialog('header');
    });

    it('viser ferieendring i historisk gap før planen oppdateres', async () => {
        const user = userEvent.setup();
        const gapPeriods: UttakPeriodeDto[] = [
            { ...ORIGINAL_PERIODS[0]!, tom: '2024-06-07' },
            {
                fom: '2024-06-17',
                tom: '2024-06-21',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ];
        const { oppdaterUttaksplan, etterUtført } = renderHarness({ perioder: gapPeriods });

        await user.click(screen.getByRole('button', { name: 'Legg til ferie' }));

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(oppdaterUttaksplan).not.toHaveBeenCalled();

        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Endre' }));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenCalledWith(
            forventetPlanEtterTillegg(gapPeriods, [lagFerieperiode('2024-06-10', '2024-06-12')], false),
        );
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it('bekrefter historisk ferieendring bare i endringssøknad', async () => {
        const user = userEvent.setup();
        const { oppdaterUttaksplan, etterUtført } = renderHarness({ erEndringssøknad: false });

        await user.click(screen.getByRole('button', { name: 'Legg til ferie' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it('oppdaterer periode i inneværende måned uten historisk bekreftelse', async () => {
        const user = userEvent.setup();
        const currentPeriod: UttakPeriodeDto[] = [
            {
                fom: '2024-07-03',
                tom: '2024-07-19',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ];
        const { oppdaterUttaksplan, etterUtført } = renderHarness({
            perioder: currentPeriod,
            datoer: { fom: '2024-07-03', tom: '2024-07-05' },
        });

        await user.click(screen.getByRole('button', { name: 'Legg til ferie' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it('bekrefter ikke sletting i et historisk intervall uten uttak og beholder dermed planen uendret', async () => {
        const user = userEvent.setup();
        const futurePeriods: UttakPeriodeDto[] = [
            {
                fom: '2024-07-15',
                tom: '2024-07-26',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ];
        const { oppdaterUttaksplan, etterUtført } = renderHarness({ perioder: futurePeriods });

        await user.click(screen.getByRole('button', { name: 'Slett periode' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenCalledWith(futurePeriods);
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it('oppdaterer historisk uttak med uendret gradering uten historisk bekreftelse', async () => {
        const user = userEvent.setup();
        const gradedPeriods = [lagGraderingsperiode('2024-06-10', '2024-06-12')];
        const { oppdaterUttaksplan, etterUtført } = renderHarness({ perioder: gradedPeriods });

        await user.click(screen.getByRole('button', { name: 'Legg til gradering' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenCalledWith(
            forventetPlanEtterTillegg(gradedPeriods, [lagGraderingsperiode('2024-06-10', '2024-06-12')], false),
        );
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it('viser kun én dialog når FjernAltIUttaksplanModal åpnes med kalenderredigering montert', async () => {
        const user = userEvent.setup();
        const { oppdaterUttaksplan } = renderHarness();

        await user.click(screen.getByRole('button', { name: 'Åpne Fjern alt modal' }));

        const dialogs = document.querySelectorAll('[role="dialog"]');
        expect(dialogs).toHaveLength(1);
        expect(dialogs[0]).toHaveTextContent('Ønsker du å fjerne alt som er lagt til?');
        expect(oppdaterUttaksplan).not.toHaveBeenCalled();
    });
});
