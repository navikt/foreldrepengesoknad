import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BarnType } from '@navikt/fp-constants';
import { UttakPeriodeDto } from '@navikt/fp-types';
import { CalendarPeriod, IntlProvider } from '@navikt/fp-ui';

import { FjernAltIUttaksplanModal } from '../../../FjernAltIUttaksplanModal';
import { UttaksplanDataProvider } from '../../../context/UttaksplanDataContext';
import { UttaksplanRedigeringProvider, useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { nyUttaksplanMessages } from '../../../intl/nyUttaksplanMessages';
import { ForeldreInfo } from '../../../types/ForeldreInfo';
import { UttakPeriodeBuilder } from '../../../utils/UttakPeriodeBuilder';
import { KalenderRedigeringProvider, useKalenderRedigeringContext } from './KalenderRedigeringContext';

const ORIGINAL_PERIODS: UttakPeriodeDto[] = [
    {
        fom: '2026-09-07',
        tom: '2026-10-02',
        søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
    },
];

const SELECTED_PERIODS: CalendarPeriod[] = [
    { fom: '2026-09-07', tom: '2026-10-02', color: 'BLUE', srText: 'Valgt periode' },
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

const lagGraderingsperiode = (
    fom: string,
    tom: string,
    kontoType: 'MØDREKVOTE' | 'FELLESPERIODE' = 'MØDREKVOTE',
): UttakPeriodeDto => ({
    fom,
    tom,
    søker: {
        forelder: 'MOR',
        kontoType,
        flerbarnsdager: false,
        gradering: { arbeidstidprosent: 50 },
    },
});

const lagKvoteperiode = (fom: string, tom: string): UttakPeriodeDto => ({
    fom,
    tom,
    søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
});

const lagUtsettelsesperiode = (fom: string, tom: string, utsettelseÅrsak: 'FRI' | 'SØKER_SYKDOM'): UttakPeriodeDto => ({
    fom,
    tom,
    søker: { forelder: 'MOR', utsettelseÅrsak, flerbarnsdager: false },
});

type HarnessProps = {
    perioder?: UttakPeriodeDto[];
    erEndringssøknad?: boolean;
    datoer?: { fom: string; tom: string };
    fødselsdato?: string;
    oppdaterUttaksplan: (perioder: UttakPeriodeDto[] | undefined) => void;
    etterUtført: () => void;
};

const Harness = ({
    perioder = ORIGINAL_PERIODS,
    erEndringssøknad = true,
    datoer = { fom: '2026-09-14', tom: '2026-09-16' },
    fødselsdato = '2026-06-01',
    oppdaterUttaksplan,
    etterUtført,
}: HarnessProps) => {
    const [fom, setFom] = useState(datoer.fom);
    const [tom, setTom] = useState(datoer.tom);

    return (
        <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: nyUttaksplanMessages.nb }}>
            <UttaksplanDataProvider
                barn={{ type: BarnType.FØDT, fødselsdatoer: [fødselsdato], antallBarn: 1 }}
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
                onClick={() => leggTilUttaksplanPerioder([lagUtsettelsesperiode(fom, tom, 'FRI')], false, etterUtført)}
            >
                Legg til pause
            </button>
            <button
                type="button"
                onClick={() =>
                    leggTilUttaksplanPerioder([lagUtsettelsesperiode(fom, tom, 'SØKER_SYKDOM')], false, etterUtført)
                }
            >
                Legg til utsettelse
            </button>
            <button
                type="button"
                onClick={() => leggTilUttaksplanPerioder([lagFerieperiode(fom, tom)], false, etterUtført)}
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
                onClick={() => leggTilUttaksplanPerioder([lagFerieperiode(fom, tom)], true, etterUtført)}
            >
                Legg til ferie med forskyvning
            </button>
            <button
                type="button"
                onClick={() => leggTilUttaksplanPerioder([lagGraderingsperiode(fom, tom)], false, etterUtført)}
            >
                Legg til gradering
            </button>
            <button
                type="button"
                onClick={() =>
                    leggTilUttaksplanPerioder([lagGraderingsperiode(fom, tom, 'FELLESPERIODE')], false, etterUtført)
                }
            >
                Endre kvotetype uten forskyvning
            </button>
            <button
                type="button"
                onClick={() =>
                    leggTilUttaksplanPerioder([lagGraderingsperiode(fom, tom, 'FELLESPERIODE')], true, etterUtført)
                }
            >
                Endre kvotetype med forskyvning
            </button>
            <button
                type="button"
                onClick={() => leggTilUttaksplanPerioder([lagKvoteperiode(fom, tom)], true, etterUtført)}
            >
                Legg til ugraderte foreldrepenger med forskyvning
            </button>
            <button
                type="button"
                onClick={() => leggTilUttaksplanPerioder([lagKvoteperiode(fom, tom)], false, etterUtført)}
            >
                Legg til ugraderte foreldrepenger uten forskyvning
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
        fødselsdato?: string;
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
        vi.setSystemTime(new Date('2026-10-16T12:00:00.000Z'));
    });

    it.each([
        { knapp: 'Legg til pause', årsak: 'FRI' as const, lagPeriode: lagGraderingsperiode },
        { knapp: 'Legg til utsettelse', årsak: 'SØKER_SYKDOM' as const, lagPeriode: lagGraderingsperiode },
        { knapp: 'Legg til utsettelse', årsak: 'SØKER_SYKDOM' as const, lagPeriode: lagFerieperiode },
    ])(
        'bekrefter $knapp som fjerner historisk gradering eller ferie ($årsak)',
        async ({ knapp, årsak, lagPeriode }) => {
            const user = userEvent.setup();
            const perioder = [lagPeriode('2026-09-14', '2026-09-18')];
            const original = structuredClone(perioder);
            const { oppdaterUttaksplan, etterUtført } = renderHarness({
                perioder,
                datoer: { fom: '2026-09-14', tom: '2026-09-18' },
            });

            await user.click(screen.getByRole('button', { name: knapp }));
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(oppdaterUttaksplan).not.toHaveBeenCalled();
            expect(etterUtført).not.toHaveBeenCalled();

            await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Avbryt' }));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(oppdaterUttaksplan).not.toHaveBeenCalled();
            expect(etterUtført).not.toHaveBeenCalled();
            expect(perioder).toEqual(original);

            await user.click(screen.getByRole('button', { name: knapp }));
            await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Endre' }));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
            expect(oppdaterUttaksplan).toHaveBeenCalledWith([lagUtsettelsesperiode('2026-09-14', '2026-09-18', årsak)]);
            expect(etterUtført).toHaveBeenCalledTimes(1);
        },
    );

    it.each([
        { label: 'ugradert periode', perioder: [lagKvoteperiode('2026-09-14', '2026-09-18')] },
        { label: 'hull', perioder: [] },
        {
            label: 'inneværende måned',
            perioder: [lagGraderingsperiode('2026-10-05', '2026-10-09')],
            fom: '2026-10-05',
            tom: '2026-10-09',
        },
        { label: 'ny søknad', perioder: [lagGraderingsperiode('2026-09-14', '2026-09-18')], erEndringssøknad: false },
    ])(
        'legger til pause uten varsel for $label',
        async ({ perioder, fom = '2026-09-14', tom = '2026-09-18', erEndringssøknad = true }) => {
            const user = userEvent.setup();
            const { oppdaterUttaksplan, etterUtført } = renderHarness({
                perioder,
                datoer: { fom, tom },
                erEndringssøknad,
            });

            await user.click(screen.getByRole('button', { name: 'Legg til pause' }));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
            expect(oppdaterUttaksplan).toHaveBeenCalledWith([lagUtsettelsesperiode(fom, tom, 'FRI')]);
            expect(etterUtført).toHaveBeenCalledTimes(1);
        },
    );

    it.each([
        { knapp: 'Legg til ferie', lagPeriode: lagFerieperiode },
        { knapp: 'Legg til gradering', lagPeriode: lagGraderingsperiode },
    ])('varsler ikke når $knapp 2. november forlenger lik periode over helgen', async ({ knapp, lagPeriode }) => {
        vi.setSystemTime(new Date('2026-11-02T12:00:00.000Z'));
        const user = userEvent.setup();
        const { oppdaterUttaksplan, etterUtført } = renderHarness({
            perioder: [lagPeriode('2026-10-30', '2026-10-30')],
            datoer: { fom: '2026-11-02', tom: '2026-11-02' },
        });

        await user.click(screen.getByRole('button', { name: knapp }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledExactlyOnceWith([lagPeriode('2026-10-30', '2026-11-02')]);
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it.each([lagFerieperiode, lagGraderingsperiode])(
        'varsler fortsatt når fredag 30. oktober endres',
        async (lagPeriode) => {
            vi.setSystemTime(new Date('2026-11-02T12:00:00.000Z'));
            const user = userEvent.setup();
            const { oppdaterUttaksplan } = renderHarness({
                perioder: [lagPeriode('2026-10-30', '2026-10-30')],
                datoer: { fom: '2026-10-30', tom: '2026-10-30' },
            });

            await user.click(
                screen.getByRole('button', { name: 'Legg til ugraderte foreldrepenger uten forskyvning' }),
            );
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(oppdaterUttaksplan).not.toHaveBeenCalled();
        },
    );

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
                forventetPlanEtterTillegg(ORIGINAL_PERIODS, [lagFerieperiode('2026-09-14', '2026-09-16')], forskyv),
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
                forventetPlanEtterSletting(ORIGINAL_PERIODS, [{ fom: '2026-09-14', tom: '2026-09-16' }], forskyv),
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
            expect(screen.getByLabelText('Fra')).toHaveValue('2026-09-14');
            expect(screen.getByLabelText('Til')).toHaveValue('2026-09-16');
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
            { ...ORIGINAL_PERIODS[0]!, tom: '2026-09-11' },
            {
                fom: '2026-09-21',
                tom: '2026-09-25',
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
            forventetPlanEtterTillegg(gapPeriods, [lagFerieperiode('2026-09-14', '2026-09-16')], false),
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
                fom: '2026-10-07',
                tom: '2026-10-23',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ];
        const { oppdaterUttaksplan, etterUtført } = renderHarness({
            perioder: currentPeriod,
            datoer: { fom: '2026-10-07', tom: '2026-10-09' },
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
                fom: '2026-10-19',
                tom: '2026-10-30',
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
        const gradedPeriods = [lagGraderingsperiode('2026-09-14', '2026-09-16')];
        const { oppdaterUttaksplan, etterUtført } = renderHarness({ perioder: gradedPeriods });

        await user.click(screen.getByRole('button', { name: 'Legg til gradering' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenCalledWith(
            forventetPlanEtterTillegg(gradedPeriods, [lagGraderingsperiode('2026-09-14', '2026-09-16')], false),
        );
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it('oppdaterer historisk gradering uten varsel når bare kvotetype endres uten forskyvning', async () => {
        vi.setSystemTime(new Date('2026-10-16T12:00:00.000Z'));
        const historicalGradedPeriods = [
            lagGraderingsperiode('2026-09-07', '2026-09-11'),
            lagGraderingsperiode('2026-09-14', '2026-09-18'),
        ];
        const submittedGrading = lagGraderingsperiode('2026-09-07', '2026-09-11', 'FELLESPERIODE');

        const withoutShift = renderHarness({
            perioder: historicalGradedPeriods,
            datoer: { fom: '2026-09-07', tom: '2026-09-11' },
            fødselsdato: '2026-06-01',
        });
        await userEvent.click(screen.getByRole('button', { name: 'Endre kvotetype uten forskyvning' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(withoutShift.oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(withoutShift.oppdaterUttaksplan).toHaveBeenCalledWith(
            forventetPlanEtterTillegg(historicalGradedPeriods, [submittedGrading], false),
        );

        const candidateWithoutShift = withoutShift.oppdaterUttaksplan.mock.calls[0]?.[0];
        expect(candidateWithoutShift).toHaveLength(2);
        expect(candidateWithoutShift).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    fom: '2026-09-07',
                    tom: '2026-09-11',
                    søker: expect.objectContaining({
                        kontoType: 'FELLESPERIODE',
                        gradering: { arbeidstidprosent: 50 },
                    }),
                }),
                expect.objectContaining({ fom: '2026-09-14', tom: '2026-09-18' }),
            ]),
        );
    });

    it('varsler om historisk gradering som forskyves av en kvotetypeendring og avbryter uten å endre planen', async () => {
        vi.setSystemTime(new Date('2026-10-16T12:00:00.000Z'));
        const historicalGradedPeriods = [
            lagGraderingsperiode('2026-09-07', '2026-09-11'),
            lagKvoteperiode('2026-09-14', '2026-09-18'),
        ];
        const submittedGrading = lagGraderingsperiode('2026-09-07', '2026-09-11', 'FELLESPERIODE');
        const originalPlan = structuredClone(historicalGradedPeriods);
        const user = userEvent.setup();
        const withShift = renderHarness({
            perioder: historicalGradedPeriods,
            datoer: { fom: '2026-09-07', tom: '2026-09-11' },
            fødselsdato: '2026-06-01',
        });
        await user.click(screen.getByRole('button', { name: 'Endre kvotetype med forskyvning' }));

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(withShift.oppdaterUttaksplan).not.toHaveBeenCalled();
        expect(withShift.etterUtført).not.toHaveBeenCalled();

        const closeDialog = within(screen.getByRole('dialog'));
        await user.click(closeDialog.getByRole('button', { name: 'Avbryt' }));

        expect(withShift.oppdaterUttaksplan).not.toHaveBeenCalled();
        expect(withShift.etterUtført).not.toHaveBeenCalled();
        expect(historicalGradedPeriods).toEqual(originalPlan);

        await user.click(screen.getByRole('button', { name: 'Endre kvotetype med forskyvning' }));
        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Endre' }));

        expect(withShift.oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(withShift.oppdaterUttaksplan).toHaveBeenCalledWith(
            forventetPlanEtterTillegg(historicalGradedPeriods, [submittedGrading], true),
        );
        const committedGrading = withShift.oppdaterUttaksplan.mock.calls[0]?.[0];
        expect(committedGrading).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ fom: '2026-09-07', tom: '2026-09-11' }),
                expect.objectContaining({ fom: '2026-09-21', tom: '2026-09-25' }),
            ]),
        );
        expect(withShift.etterUtført).toHaveBeenCalledTimes(1);
    });

    it('varsler om historisk ferie som forskyves selv når den innlagte ferien er uendret', async () => {
        vi.setSystemTime(new Date('2026-10-16T12:00:00.000Z'));
        const historicalVacationPeriods = [
            lagFerieperiode('2026-09-07', '2026-09-11'),
            lagKvoteperiode('2026-09-14', '2026-09-18'),
        ];
        const user = userEvent.setup();
        const { oppdaterUttaksplan, etterUtført } = renderHarness({
            perioder: historicalVacationPeriods,
            datoer: { fom: '2026-09-07', tom: '2026-09-11' },
            fødselsdato: '2026-06-01',
        });

        await user.click(screen.getByRole('button', { name: 'Legg til ferie med forskyvning' }));

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(oppdaterUttaksplan).not.toHaveBeenCalled();
        expect(etterUtført).not.toHaveBeenCalled();

        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Endre' }));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenCalledWith(
            forventetPlanEtterTillegg(historicalVacationPeriods, [lagFerieperiode('2026-09-07', '2026-09-11')], true),
        );
        expect(oppdaterUttaksplan.mock.calls[0]?.[0]).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ fom: '2026-09-07', tom: '2026-09-18' }),
                expect.objectContaining({ fom: '2026-09-21', tom: '2026-09-25' }),
            ]),
        );
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it('varsler når innlegging av ugraderte foreldrepenger forskyver historisk ferie', async () => {
        vi.setSystemTime(new Date('2026-10-16T12:00:00.000Z'));
        const historicalVacation = lagFerieperiode('2026-09-14', '2026-09-18');
        const user = userEvent.setup();
        const { oppdaterUttaksplan, etterUtført } = renderHarness({
            perioder: [historicalVacation],
            datoer: { fom: '2026-09-07', tom: '2026-09-11' },
            fødselsdato: '2026-06-01',
        });

        await user.click(screen.getByRole('button', { name: 'Legg til ugraderte foreldrepenger med forskyvning' }));

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(oppdaterUttaksplan).not.toHaveBeenCalled();

        await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Endre' }));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenCalledWith(
            forventetPlanEtterTillegg([historicalVacation], [lagKvoteperiode('2026-09-07', '2026-09-11')], true),
        );
        expect(oppdaterUttaksplan.mock.calls[0]?.[0]).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ fom: '2026-09-07', tom: '2026-09-11' }),
                expect.objectContaining({ fom: '2026-09-21', tom: '2026-09-25' }),
            ]),
        );
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it.each([
        { label: 'inneværende måned', fom: '2026-10-19', tom: '2026-10-23', erEndringssøknad: true },
        { label: 'framtidig måned', fom: '2026-11-02', tom: '2026-11-06', erEndringssøknad: true },
        { label: 'ny søknad', fom: '2026-09-07', tom: '2026-09-11', erEndringssøknad: false },
    ])('viser ikke historisk dialog for $label', async ({ fom, tom, erEndringssøknad }) => {
        vi.setSystemTime(new Date('2026-10-16T12:00:00.000Z'));
        const user = userEvent.setup();
        const periods = [lagGraderingsperiode(fom, tom)];
        const { oppdaterUttaksplan, etterUtført } = renderHarness({
            perioder: periods,
            datoer: { fom, tom },
            erEndringssøknad,
            fødselsdato: '2026-06-01',
        });

        await user.click(screen.getByRole('button', { name: 'Legg til gradering' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(etterUtført).toHaveBeenCalledTimes(1);
    });

    it.each([
        { label: '30. september', fom: '2026-09-30', tom: '2026-09-30', skalVarsle: true },
        { label: '1. oktober', fom: '2026-10-01', tom: '2026-10-01', skalVarsle: false },
        { label: '5.–9. oktober før dagens dato', fom: '2026-10-05', tom: '2026-10-09', skalVarsle: false },
    ])('bruker historisk grense riktig for $label', async ({ fom, tom, skalVarsle }) => {
        vi.setSystemTime(new Date('2026-10-16T12:00:00.000Z'));
        const user = userEvent.setup();
        const { oppdaterUttaksplan } = renderHarness({
            perioder: [lagGraderingsperiode(fom, tom)],
            datoer: { fom, tom },
            fødselsdato: '2026-06-01',
        });

        await user.click(screen.getByRole('button', { name: 'Legg til ugraderte foreldrepenger uten forskyvning' }));

        expect(screen.queryAllByRole('dialog')).toHaveLength(skalVarsle ? 1 : 0);
        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(skalVarsle ? 0 : 1);
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
