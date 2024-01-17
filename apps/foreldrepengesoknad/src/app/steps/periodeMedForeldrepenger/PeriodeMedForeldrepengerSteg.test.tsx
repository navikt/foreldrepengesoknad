import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import { Dekningsgrad } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import * as stories from './PeriodeMedForeldrepengerSteg.stories';
import { ContextDataType } from 'app/context/FpDataContext';

const {
    FarEllerMedmorAleneomsorgFødsel,
    FarEllerMedmorFødselBeggeHarRett,
    MorSøkerAdopsjonMedAleneomsorg,
    MorSøkerAdopsjonMedDeltUttak,
    MorFødselDeltUttakPrematurFødsel,
    MorFødselMedTvillingFlerbarnsuker,
    MorFødselAleneomsorgMedTrillingFlerbarnsuker,
    FarEllerMedmorSøkerOgMorHarLagetUttaksplan,
} = composeStories(stories);

describe('<PeriodeMedForeldrepengerSteg>', () => {
    it.skip('skal søke som far eller medmor og ha aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <FarEllerMedmorAleneomsorgFødsel
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvor lang periode med foreldrepenger vil du ha?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi hvor lang periode du vil ha')).toHaveLength(2);

        await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            },
            key: ContextDataType.PERIODE_MED_FORELDREPENGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it.skip('skal søke som far eller medmor der begge har rett', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <FarEllerMedmorFødselBeggeHarRett
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvor lang periode med foreldrepenger vil dere ha?')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Dette valget gjelder for begge og kan ikke endres senere. Den totale utbetalingen blir høyere ved å velge 100% foreldrepenger.',
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                'Hvis man tar foreldrepenger sammenhengende fra termin vil den siste dagen med foreldrepenger bli torsdag 09. februar 2023.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Hvis man tar foreldrepenger sammenhengende fra termin vil den siste dagen med foreldrepenger bli torsdag 20. april 2023.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
            },
            key: ContextDataType.PERIODE_MED_FORELDREPENGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it.skip('skal søke adopsjon som mor med aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <MorSøkerAdopsjonMedAleneomsorg
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvor lang periode med foreldrepenger vil du ha?')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Hvis man tar foreldrepenger sammenhengende fra omsorgsovertakelse vil den siste dagen med foreldrepenger bli mandag 31. januar 2022.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Hvis man tar foreldrepenger sammenhengende fra omsorgsovertakelse vil den siste dagen med foreldrepenger bli mandag 11. april 2022.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
            },
            key: ContextDataType.PERIODE_MED_FORELDREPENGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it.skip('skal søke adopsjon som mor med aleneomsorg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <MorSøkerAdopsjonMedDeltUttak
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Hvor lang periode med foreldrepenger vil dere ha?')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Hvis man tar foreldrepenger sammenhengende fra omsorgsovertakelse vil den siste dagen med foreldrepenger bli mandag 31. januar 2022.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Hvis man tar foreldrepenger sammenhengende fra omsorgsovertakelse vil den siste dagen med foreldrepenger bli mandag 11. april 2022.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            },
            key: ContextDataType.PERIODE_MED_FORELDREPENGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it.skip('skal søke som mor delt uttak for prematur fødsel', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <MorFødselDeltUttakPrematurFødsel
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();
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
            data: {
                dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            },
            key: ContextDataType.PERIODE_MED_FORELDREPENGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it.skip('skal søke som mor ved fødsel av tvillinger', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <MorFødselMedTvillingFlerbarnsuker
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();
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
            data: {
                dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            },
            key: ContextDataType.PERIODE_MED_FORELDREPENGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it.skip('skal søke som mor ved fødsel av trillinger', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <MorFødselAleneomsorgMedTrillingFlerbarnsuker
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();
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
            data: {
                dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            },
            key: ContextDataType.PERIODE_MED_FORELDREPENGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it.skip('skal søke som far der mor allerede har laget uttaksplan', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <FarEllerMedmorSøkerOgMorHarLagetUttaksplan
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('Periode med foreldrepenger')).toBeInTheDocument();

        expect(screen.queryByText('Hvor lang periode med foreldrepenger vil du ha?')).not.toBeInTheDocument();

        expect(screen.getByText('Dere har valgt 49 uker med 100% foreldrepenger')).toBeInTheDocument();
        expect(
            screen.getByText('Dette ble valgt av Helga i søknaden hennes, og det kan ikke endres av deg.'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
            },
            key: ContextDataType.PERIODE_MED_FORELDREPENGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.UTTAKSPLAN_INFO,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });
});
