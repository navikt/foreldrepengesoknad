import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import MockDate from 'mockdate';

import { Dekningsgrad } from '@navikt/fp-types';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './PeriodeMedForeldrepengerSteg.stories';

const {
    FarEllerMedmorAleneomsorgFødsel,
    FarEllerMedmorFødselBeggeHarRett,
    MorSøkerAdopsjonMedAleneomsorg,
    MorSøkerAdopsjonMedDeltUttak,
    MorFødselDeltUttakPrematurFødsel,
    MorFødselMedTvillingFlerbarnsuker,
    MorFødselAleneomsorgMedTrillingFlerbarnsuker,
    FarEllerMedmorSøkerOgMorHarLagetUttaksplan,
    FarMedMorMedTermin1Juli2024,
    MorMedTermin1Juli2024OgFarsSøknad,
    MorFødselBeggeHarRettFødselFør1Juli2024,
    FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024,
    MorBeggeHarRettAdopsjonEtter1Juli2024,
} = composeStories(stories);

describe('<PeriodeMedForeldrepengerSteg>', () => {
    it(
        'skal søke som far eller medmor og ha aleneomsorg',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FarEllerMedmorAleneomsorgFødsel.parameters.msw);
            render(
                <FarEllerMedmorAleneomsorgFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(screen.getByText('Hvor lang periode med foreldrepenger vil du ha?')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Du må oppgi hvor lang periode du vil ha')).toHaveLength(2);

            await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: Dekningsgrad.HUNDRE_PROSENT,
                key: ContextDataType.PERIODE_MED_FORELDREPENGER,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.FORDELING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal søke som far eller medmor der begge har rett',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(FarEllerMedmorFødselBeggeHarRett.parameters.msw);
            render(
                <FarEllerMedmorFødselBeggeHarRett
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(screen.getByText('Hvor lang periode med foreldrepenger vil dere ha?')).toBeInTheDocument();
            expect(
                screen.getByText(
                    'Dette valget gjelder for begge og kan ikke endres senere. Den totale utbetalingen blir omtrent lik om man velger 100 % eller 80 %.',
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: Dekningsgrad.ÅTTI_PROSENT,
                key: ContextDataType.PERIODE_MED_FORELDREPENGER,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.FORDELING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal søke adopsjon som mor med aleneomsorg',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(MorSøkerAdopsjonMedAleneomsorg.parameters.msw);
            render(
                <MorSøkerAdopsjonMedAleneomsorg
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(screen.getByText('Hvor lang periode med foreldrepenger vil du ha?')).toBeInTheDocument();

            expect(
                screen.getByText(
                    'Hvis man tar foreldrepenger sammenhengende fra omsorgsovertakelse vil den siste dagen med foreldrepenger bli fredag 28. januar 2022.',
                ),
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    'Hvis man tar foreldrepenger sammenhengende fra omsorgsovertakelse vil den siste dagen med foreldrepenger bli fredag 08. april 2022.',
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: Dekningsgrad.ÅTTI_PROSENT,
                key: ContextDataType.PERIODE_MED_FORELDREPENGER,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.FORDELING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal søke adopsjon som mor med delt uttak',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(MorSøkerAdopsjonMedDeltUttak.parameters.msw);
            render(
                <MorSøkerAdopsjonMedDeltUttak
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(screen.getByText('Hvor lang periode med foreldrepenger vil dere ha?')).toBeInTheDocument();

            expect(
                screen.getByText(
                    'Hvis man tar foreldrepenger sammenhengende fra omsorgsovertakelse vil den siste dagen med foreldrepenger bli fredag 28. januar 2022.',
                ),
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    'Hvis man tar foreldrepenger sammenhengende fra omsorgsovertakelse vil den siste dagen med foreldrepenger bli fredag 08. april 2022.',
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: Dekningsgrad.HUNDRE_PROSENT,
                key: ContextDataType.PERIODE_MED_FORELDREPENGER,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.FORDELING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal søke som mor delt uttak for prematur fødsel',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(MorFødselDeltUttakPrematurFødsel.parameters.msw);
            render(
                <MorFødselDeltUttakPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(screen.getByText('Hvor lang periode med foreldrepenger vil dere ha?')).toBeInTheDocument();

            expect(
                screen.getByText('Dere får lenger periode med foreldrepenger siden barnet er født før uke 33'),
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    'Perioden blir forlenget med like mange uker og dager som barnet er født før termin. For dere blir det 8 uker og 3 dager.',
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: Dekningsgrad.HUNDRE_PROSENT,
                key: ContextDataType.PERIODE_MED_FORELDREPENGER,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.FORDELING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal søke som mor ved fødsel av tvillinger',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(MorFødselMedTvillingFlerbarnsuker.parameters.msw);
            render(
                <MorFødselMedTvillingFlerbarnsuker
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(screen.getByText('Hvor lang periode med foreldrepenger vil dere ha?')).toBeInTheDocument();

            expect(
                screen.getByText('Dere får lenger periode med foreldrepenger siden dere skal ha tvillinger'),
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    'Perioden blir forlenget med 17 uker hvis dere velger 100% foreldrepenger eller 21 uker hvis dere velger 80% foreldrepenger.',
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('66 uker med 100 prosent foreldrepenger'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: Dekningsgrad.HUNDRE_PROSENT,
                key: ContextDataType.PERIODE_MED_FORELDREPENGER,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.FORDELING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal søke som mor ved fødsel av trillinger',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(MorFødselAleneomsorgMedTrillingFlerbarnsuker.parameters.msw);
            render(
                <MorFødselAleneomsorgMedTrillingFlerbarnsuker
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(screen.getByText('Hvor lang periode med foreldrepenger vil du ha?')).toBeInTheDocument();

            expect(
                screen.getByText('Du får lenger periode med foreldrepenger siden du skal ha flere barn'),
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    'Perioden blir forlenget med 46 uker hvis du velger 100% foreldrepenger eller 56 uker hvis du velger 80% foreldrepenger.',
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('66 uker med 100 prosent foreldrepenger'));

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: Dekningsgrad.HUNDRE_PROSENT,
                key: ContextDataType.PERIODE_MED_FORELDREPENGER,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.FORDELING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );

    it(
        'skal søke som far der mor allerede har laget uttaksplan',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(FarEllerMedmorSøkerOgMorHarLagetUttaksplan.parameters.msw);
            render(
                <FarEllerMedmorSøkerOgMorHarLagetUttaksplan
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);

            expect(screen.queryByText('Hvor lang periode med foreldrepenger vil du ha?')).not.toBeInTheDocument();

            expect(screen.getByText('Dere har valgt 49 uker med 100% foreldrepenger')).toBeInTheDocument();
            expect(
                screen.getByText('Dette ble valgt av Helga i søknaden hennes, og det kan ikke endres av deg.'),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

            expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: Dekningsgrad.HUNDRE_PROSENT,
                key: ContextDataType.PERIODE_MED_FORELDREPENGER,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: SøknadRoutes.FORDELING,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });
        }),
    );
    it(
        'skal vise informasjon om utvidet 80% dekningsgrad for far som søker første gang med barn med termin' +
            ' etter 1 juli 2024 og søkedato før 1 juli 2024',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-06-30'));
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();

            setHandlers(FarMedMorMedTermin1Juli2024.parameters.msw);
            render(
                <FarMedMorMedTermin1Juli2024
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(
                await screen.findByText(
                    'Hvis barnet deres blir født etter 1. juli, vil dere få en lengre periode hvis dere velger 80 prosent foreldrepenger',
                ),
            ).toBeInTheDocument();
            MockDate.reset();
        }),
    );
    it(
        'skal ikke vise informasjon om utvidet 80% dekningsgrad for far som søker første gang hvis søkedato er etter 1 juli 2024',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-07-01'));
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(FarMedMorMedTermin1Juli2024.parameters.msw);
            render(
                <FarMedMorMedTermin1Juli2024
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(
                await screen.queryByText(
                    'Hvis barnet deres blir født etter 1. juli, vil dere få en lengre periode hvis dere velger 80 prosent foreldrepenger',
                ),
            ).not.toBeInTheDocument();
            MockDate.reset();
        }),
    );
    it(
        'skal vise informasjon om utvidet 80% dekningsgrad for mor som søker etter far der far valgte 80% dekning for' +
            ' et barn med termin etter 1 juli 2024 og søkedato før 1 juli 2024',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-06-30'));
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(MorMedTermin1Juli2024OgFarsSøknad.parameters.msw);
            render(
                <MorMedTermin1Juli2024OgFarsSøknad
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(
                await screen.findByText(
                    'Hvis barnet deres blir født etter 1. juli, vil dere få en lengre periode hvis dere velger 80 prosent foreldrepenger',
                ),
            ).toBeInTheDocument();
            MockDate.reset();
        }),
    );
    it(
        'skal ikke vise informasjon om utvidet 80% dekningsgrad for mor som søker etter far der far valgte 80% dekning' +
            ' hvis søkedato er etter 1 juli 2024',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-07-01'));
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            setHandlers(MorMedTermin1Juli2024OgFarsSøknad.parameters.msw);
            render(
                <MorMedTermin1Juli2024OgFarsSøknad
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            expect(
                await screen.queryByText(
                    'Hvis barnet deres blir født etter 1. juli, vil dere få en lengre periode hvis dere velger 80 prosent foreldrepenger',
                ),
            ).not.toBeInTheDocument();
            MockDate.reset();
        }),
    );

    it(
        'Skal vise info om forskjell på 80% og 100% dekningsgrad for barn født før 1.juli 2024, hvis dato er før 1. juli 2024',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            MockDate.set(new Date('2024-06-30'));
            setHandlers(MorFødselBeggeHarRettFødselFør1Juli2024.parameters.msw);
            render(
                <MorFødselBeggeHarRettFødselFør1Juli2024
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(
                screen.getByText(
                    'Dette valget gjelder for begge og kan ikke endres senere. Den totale utbetalingen blir høyere ved å velge 100% foreldrepenger.',
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Hva lønner seg for oss?'));
            expect(
                await screen.findByText(
                    'Den totale utbetalingen fra Nav blir høyere dersom man velger 100% i stedet for 80%. ' +
                        'Likevel kan det være andre grunner som påvirker hva som lønner seg,',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            MockDate.reset();
        }),
    );

    it(
        'Skal vise info om forskjell på 80% og 100% dekningsgrad for barn født før 1.juli 2024, hvis dato er etter 1. juli 2024',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            MockDate.set(new Date('2024-07-01'));
            setHandlers(MorFødselBeggeHarRettFødselFør1Juli2024.parameters.msw);
            render(
                <MorFødselBeggeHarRettFødselFør1Juli2024
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(
                screen.getByText(
                    'Dette valget gjelder for begge og kan ikke endres senere. Den totale utbetalingen blir høyere ved å velge 100% foreldrepenger.',
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Hva lønner seg for oss?'));
            expect(
                await screen.findByText(
                    'Den totale utbetalingen fra Nav blir høyere dersom man velger 100% i stedet for 80%.' +
                        ' Likevel kan det være andre grunner som påvirker hva som lønner seg,',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            MockDate.reset();
        }),
    );

    it(
        'Skal vise info om at det er lite forskjell på 80% og 100% dekningsgrad for barn med termin før 1.juli 2024,' +
            ' hvis dato er etter 1. juli 2024',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            MockDate.set(new Date('2024-07-01'));
            setHandlers(FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024.parameters.msw);
            render(
                <FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(
                screen.getByText(
                    'Dette valget gjelder for begge og kan ikke endres senere. Den totale utbetalingen blir omtrent lik om man velger 100 % eller 80 %.',
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Hva lønner seg for oss?'));
            expect(
                await screen.findByText(
                    'Den totale utbetalingen blir omtrent lik om man velger 100 % eller 80 %. Likevel kan det være andre ' +
                        'grunner som påvirker hva som lønner seg,',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            MockDate.reset();
        }),
    );

    it(
        'Skal vise info om forskjell på 80% og 100% dekningsgrad for barn med adopsjonsdato etter 1.juli 2024, hvis dato er før 1. juli 2024',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            MockDate.set(new Date('2024-06-30'));
            setHandlers(MorBeggeHarRettAdopsjonEtter1Juli2024.parameters.msw);
            render(
                <MorBeggeHarRettAdopsjonEtter1Juli2024
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(
                screen.getByText(
                    'Dette valget gjelder for begge og kan ikke endres senere. Den totale utbetalingen blir høyere ved å velge 100% foreldrepenger.',
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Hva lønner seg for oss?'));
            expect(
                await screen.findByText(
                    'Den totale utbetalingen fra Nav blir høyere dersom man velger 100% i stedet for 80%.' +
                        ' Likevel kan det være andre grunner som påvirker hva som lønner seg,',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            MockDate.reset();
        }),
    );

    it(
        'Skal vise info om at det er lite forskjell på 80% og 100% dekningsgrad for barn med adopsjonsdato' +
            ' etter 1.juli 2024, hvis dato er etter 1. juli 2024.',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            MockDate.set(new Date('2024-07-01'));
            setHandlers(MorBeggeHarRettAdopsjonEtter1Juli2024.parameters.msw);
            render(
                <MorBeggeHarRettAdopsjonEtter1Juli2024
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText('Periode med foreldrepenger')).toHaveLength(2);
            expect(
                screen.getByText(
                    'Dette valget gjelder for begge og kan ikke endres senere. Den totale utbetalingen blir omtrent lik om man velger 100 % eller 80 %.',
                    {
                        exact: false,
                    },
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Hva lønner seg for oss?'));
            expect(
                await screen.findByText(
                    'Den totale utbetalingen blir omtrent lik om man velger 100 % eller 80 %. Likevel kan det være andre' +
                        ' grunner som påvirker hva som lønner seg, hvis man for eksempel må ha ulønnet permisjon i en periode.',
                ),
            ).toBeInTheDocument();

            MockDate.reset();
        }),
    );
});
