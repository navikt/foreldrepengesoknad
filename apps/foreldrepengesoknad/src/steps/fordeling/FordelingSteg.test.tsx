import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './FordelingSteg.stories';

import messages from '../../intl/nb_NO.json';

const {
    MorAleneomsorgDekning80EttBarnFør1Okt2021,
    MorAleneomsorgEttBarnPrematurFødsel,
    MorAleneomsorgAdopsjonTrillinger,
    FarMedmorAleneomsorgFødtTvillinger,
    FarMedmorAleneomsorgFødtFireBarnFør1Okt2021,
    FarMedmorAleneomsorgFødtTreBarnFørWLB,
    FarMedmorAleneomsorgEttBarnTerminEtterWLB,
    FarMedmorAleneomsorgPrematurtFødtBarn,
    FarMedmorAleneomsorgAdopsjonFireBarn,
    MorDeltUttakEttBarnPrematurFødsel,
    MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning,
    MorDeltUttakEttBarnTermin,
    MorDeltUttakTvillingerFødt,
    MorDeltUttakFarSøkteMorsKvoteOgFellesperiode,
    FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021,
    FarMedmorSøkerDeltUttakTrillingerFødtFørWLB,
    FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB,
    FarMedmorSøkerDeltUttakEttBarnFødtPrematurt,
    FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode,
    MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80,
    MorSøkerFarHarRettIEØSTerminDekningsgrad80,
    FarMedmorSøkerMorHarRettIEØSAdopsjon,
    BareMorHarRettTermin,
    BareMorHarRettAdopsjon,
    BareFarHarRettOgMorErUførTermin4Barn,
    BareFarHarRettOgMorErIkkeUførFødtBarn,
    BareFarHarRettTvillingerFødtFør1Okt2021,
    BareFarHarRettAdopsjonMorErUfør,
} = composeStories(stories);

describe('Fordeling - MorAleneomsorgDekning80EttBarnFør1Okt2021', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor med aleneomsorg der barnet er født før 1 oktober 2021',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('56 + 3 uker til deg')).toBeInTheDocument();
            expect(screen.getAllByText('3 uker', { exact: false })).toHaveLength(2);
            expect(screen.getByText('kan kun brukes før fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('6 uker', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('er satt av til rett etter fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('50 uker')).toBeInTheDocument();
            expect(screen.getByText('med foreldrepenger.')).toBeInTheDocument();
            expect(
                screen.getByText('Siden du har fått barn før 1. oktober 2021', { exact: false }),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText('Tre uker før fødsel fra 31. august 2021')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(
                screen.getAllByText(messages['fordeling.oppstartValg.måOppgis']),
            ).toHaveLength(2);

            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            expect(screen.getByText(messages['fordeling.oppstartDato.input'])).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));

            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText(messages['fordeling.oppstartDato.måOppgis'])).toHaveLength(2);

            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '31.08.2021');
            fireEvent.blur(oppstart);
            expect(screen.getByText('3 uker før fødsel.')).toBeInTheDocument();
            expect(screen.queryByText('Du mister', { exact: false })).not.toBeInTheDocument();
            expect(screen.queryByText('tas fra fellesperioden', { exact: false })).not.toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));
            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenCalled();
        }),
    );

    it(
        'skal vise riktig informasjon når mor starter på fødselsdato og mister all periode før fødsel',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(await screen.findByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '21.09.2021');
            fireEvent.blur(oppstart);
            expect(screen.getByText('På fødselsdato')).toBeInTheDocument();
            expect(screen.getByText('Du mister 3 uker.')).toBeInTheDocument();
            expect(
                screen.getByText(messages['fordeling.oppstartValg.morFødsel.info']),
            ).toBeInTheDocument();
        }),
    );

    it(
        'skal vise riktig informasjon om mor skal trekkes noen uker og dager av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(await screen.findByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '15.07.2021');
            fireEvent.blur(oppstart);
            expect(screen.getByText('9 uker og 3 dager før fødsel.')).toBeInTheDocument();
            expect(screen.getByText('6 uker og 3 dager tas fra fellesperioden.')).toBeInTheDocument();
            expect(
                screen.getByText(messages['fordeling.oppstartValg.morFødsel.info']),
            ).toBeInTheDocument();
        }),
    );

    it(
        'skal vise riktig informasjon om mor skal trekkes en dag av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(await screen.findByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '30.08.2021');
            fireEvent.blur(oppstart);
            expect(screen.getByText('3 uker og 1 dag før fødsel.')).toBeInTheDocument();
            expect(screen.getByText('1 dag tas fra fellesperioden.')).toBeInTheDocument();
        }),
    );

    it(
        'skal vise riktig informasjon om mor skal mister en dag av foreldrepenger før fødsel',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(await screen.findByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '01.09.2021');
            fireEvent.blur(oppstart);
            expect(screen.getByText('2 uker og 4 dager før fødsel.')).toBeInTheDocument();
            expect(screen.getByText('Du mister 1 dag.')).toBeInTheDocument();
        }),
    );

    it(
        'skal vise riktig informasjon om mor mister 2 uker og 4 dager av foreldrepenger før fødsel',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(await screen.findByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '20.09.2021');
            fireEvent.blur(oppstart);
            expect(screen.getByText('1 dag før fødsel.')).toBeInTheDocument();
            expect(screen.getByText('Du mister 2 uker og 4 dager.')).toBeInTheDocument();
        }),
    );

    it(
        'kan ikke angi feil format for oppstartdato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, 'x');
            fireEvent.blur(oppstart);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(
                screen.getAllByText(messages['fordeling.oppstartDato.gyldig'],
                ),
            ).toHaveLength(2);
        }),
    );

    it(
        'kan ikke angi for sen oppstartsdato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '22.09.2021');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være senest 21.09.2021.')).toHaveLength(2);
        }),
    );

    it(
        'kan ikke angi for tidlig oppstartsdato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '28.06.2021');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 02.07.2021.')).toHaveLength(
                2,
            );
        }),
    );

    it(
        'kan ikke angi for oppstartsdato på en helgedag',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgDekning80EttBarnFør1Okt2021.parameters.msw);
            const utils = render(
                <MorAleneomsorgDekning80EttBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '03.07.2021');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText(messages['fordeling.oppstartsdato.ukedag'])).toHaveLength(2);
        }),
    );
});

describe('Fordeling - MorAleneomsorgEttBarnPrematurFødsel', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor med aleneomsorg der barnet er født prematurt etter 1 okt 2021',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorAleneomsorgEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('58 uker og 4 dager + 3 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('kan kun brukes før fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('6 uker', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('er satt av til rett etter fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('52 uker og 4 dager')).toBeInTheDocument();
            expect(screen.getByText('kan brukes når som helst før barnet fyller 3 år.')).toBeInTheDocument();
            expect(screen.getByText('12 uker og 4 dager av disse', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText('er lagt til fordi barnet ble født før svangerskapsuke 33.', { exact: false }),
            ).toBeInTheDocument();
            expect(
                screen.queryByText(messages['fordeling.sammenhengendeUttak.info.enHarRett'],
                ),
            ).not.toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.queryByText(/Tre uker før fødsel fra/)).not.toBeInTheDocument();
            expect(screen.queryByText('På fødselsdato')).not.toBeInTheDocument();
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartValg.spørsmål']);

            await userEvent.type(oppstart, '21.09.2023');
            fireEvent.blur(oppstart);
            expect(screen.getByText('På fødselsdato')).toBeInTheDocument();
            expect(screen.getByText('Du mister 3 uker.')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));
            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenCalled();
        }),
    );

    it(
        'kan ikke angi for sen oppstartsdato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorAleneomsorgEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartValg.spørsmål']);
            await userEvent.type(oppstart, '22.09.2023');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være senest 21.09.2023.')).toHaveLength(2);
        }),
    );

    it(
        'kan ikke angi for tidlig oppstartsdato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorAleneomsorgEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartValg.spørsmål']);
            await userEvent.type(oppstart, '20.09.2023');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 21.09.2023.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - MorAleneomsorgAdopsjonTrillinger', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor med aleneomsorg der tre barn er adoptert',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgAdopsjonTrillinger.parameters.msw);
            render(
                <MorAleneomsorgAdopsjonTrillinger
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('92 uker til deg')).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes når som helst innen tre år etter omsorgsovertakelsen.', { exact: false }),
            ).toBeInTheDocument();
            expect(screen.queryByText('6 uker', { exact: false })).not.toBeInTheDocument();
            expect(screen.queryByText('fødsel.', { exact: false })).not.toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.queryByText(/Tre uker før fødsel fra/)).not.toBeInTheDocument();
            expect(screen.queryByText('På fødselsdato')).not.toBeInTheDocument();
            expect(screen.getByText('På omsorgsovertakelsen, 21. februar 2024')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();

            await userEvent.click(screen.getByText('På omsorgsovertakelsen, 21. februar 2024'));
            await userEvent.click(screen.getByText('Neste steg'));
            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenCalled();
        }),
    );

    it(
        'skal ikke kunne starte før adopsjonsdatoen',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorAleneomsorgAdopsjonTrillinger.parameters.msw);
            const utils = render(
                <MorAleneomsorgAdopsjonTrillinger
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '20.02.2024');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 21.02.2024.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - FarMedmorAleneomsorgFødtTvillinger', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med aleneomsorg med fødte tvillinger',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorAleneomsorgFødtTvillinger.parameters.msw);
            render(
                <FarMedmorAleneomsorgFødtTvillinger
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('77 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('Disse ukene kan brukes når som helst før barna fyller 3 år.')).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.queryByText(/Tre uker før fødsel fra/)).not.toBeInTheDocument();
            expect(screen.queryByText('På fødselsdato')).not.toBeInTheDocument();
            expect(screen.getByText('På datoen jeg ble alene om omsorgen, 23. september 2023')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();

            await userEvent.click(screen.getByText('På datoen jeg ble alene om omsorgen, 23. september 2023'));
            await userEvent.click(screen.getByText('Neste steg'));
            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenCalled();
        }),
    );

    it(
        'skal ikke kunne starte før datoen for alenomsorg',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorAleneomsorgFødtTvillinger.parameters.msw);
            const utils = render(
                <FarMedmorAleneomsorgFødtTvillinger
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '22.09.2023');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 25.09.2023.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - FarMedmorAleneomsorgFødtFireBarnFør1Okt2021', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med aleneomsorg med fire barn født før 1 okt 2021',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorAleneomsorgFødtFireBarnFør1Okt2021.parameters.msw);
            render(
                <FarMedmorAleneomsorgFødtFireBarnFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('92 uker til deg')).toBeInTheDocument();
            expect(
                screen.queryByText('Disse ukene kan brukes når som helst før barna fyller 3 år.'),
            ).not.toBeInTheDocument();
            expect(screen.getByText('med foreldrepenger.', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText(messages['fordeling.sammenhengendeUttak.info.enHarRett'],
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText('På datoen jeg ble alene om omsorgen, 21. september 2021')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();

            await userEvent.click(screen.getByText('På datoen jeg ble alene om omsorgen, 21. september 2021'));
            await userEvent.click(screen.getByText('Neste steg'));
            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenCalled();
        }),
    );
});

describe('Fordeling - FarMedmorAleneomsorgFødtTreBarnFørWLB', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med aleneomsorg med tre barn født før 2 august 2022',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorAleneomsorgFødtTreBarnFørWLB.parameters.msw);
            render(
                <FarMedmorAleneomsorgFødtTreBarnFørWLB
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('92 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('Disse ukene kan brukes når som helst før barna fyller 3 år.')).toBeInTheDocument();
            expect(
                screen.queryByText(messages['fordeling.sammenhengendeUttak.info.enHarRett'],
                ),
            ).not.toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText('På datoen jeg ble alene om omsorgen, 21. september 2022')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
        }),
    );
});
describe('Fordeling - FarMedmorAleneomsorgEttBarnTerminEtterWLB', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med aleneomsorg med fødte tvillinger',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorAleneomsorgEttBarnTerminEtterWLB.parameters.msw);
            render(
                <FarMedmorAleneomsorgEttBarnTerminEtterWLB
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );

            MockDate.set(new Date('2024-09-12'));

            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('46 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('Disse ukene kan brukes når som helst før barna fyller 3 år.')).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();
            expect(screen.getByText('Hvis barna blir født før svangerskapsuke 33')).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.queryByText('På termindato')).not.toBeInTheDocument();
            expect(screen.getByText('På datoen jeg blir alene om omsorgen, 21. september 2024')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();

            MockDate.reset();
        }),
    );
});

describe('Fordeling - FarMedmorAleneomsorgPrematurtFødtBarn', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med aleneomsorg der barnet er født prematurt',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorAleneomsorgPrematurtFødtBarn.parameters.msw);
            render(
                <FarMedmorAleneomsorgPrematurtFødtBarn
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('54 uker og 3 dager til deg')).toBeInTheDocument();
            expect(
                screen.getByText('Disse ukene kan brukes når som helst før barnet fyller 3 år.'),
            ).toBeInTheDocument();
            expect(screen.getByText('12 uker og 4 dager av disse', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText('er lagt til fordi barnet ble født før svangerskapsuke 33.', { exact: false }),
            ).toBeInTheDocument();

            expect(
                screen.queryByText(messages['fordeling.sammenhengendeUttak.info.enHarRett'],
                ),
            ).not.toBeInTheDocument();
        }),
    );
});
describe('Fordeling - FarMedmorAleneomsorgAdopsjonFireBarn', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med aleneomsorg der barna er adopterte',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorAleneomsorgAdopsjonFireBarn.parameters.msw);
            render(
                <FarMedmorAleneomsorgAdopsjonFireBarn
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('92 uker til deg')).toBeInTheDocument();
            expect(screen.getAllByText('92 uker', { exact: false })).toHaveLength(2);
            expect(screen.getByText('med foreldrepenger.', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText(messages['fordeling.sammenhengendeUttak.info.enHarRett'],
                ),
            ).toBeInTheDocument();
        }),
    );

    it(
        'skal ikke kunne starte foreldrepengene før adopsjonsdatoen',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorAleneomsorgAdopsjonFireBarn.parameters.msw);
            const utils = render(
                <FarMedmorAleneomsorgAdopsjonFireBarn
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '20.08.2021');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 23.08.2021.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - MorDeltUttakEttBarnPrematurFødsel', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor med delt uttak der barnet er født prematurt',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['søkersituasjon.radioButton.fødsel'])).toBeInTheDocument();
            expect(screen.getByText('Din del')).toBeInTheDocument();
            expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
            expect(screen.getByText("Hans' del")).toBeInTheDocument();
            expect(screen.getByText('15 + 3 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('kan kun brukes før fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('6 uker', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('er satt av til rett etter fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('9 uker')).toBeInTheDocument();
            expect(screen.getByText('20 uker kan deles, fellesperiode')).toBeInTheDocument();
            expect(screen.getByText('13 uker av disse', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText('er lagt til i fellesperioden fordi barnet ble født før svangerskapsuke 33.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(screen.getByText('15 uker til Hans', { exact: false })).toBeInTheDocument();
            expect(screen.getAllByText('kan brukes når som helst før barnet fyller 3 år.')).toHaveLength(2);
            expect(screen.getByText('2 av disse ukene')).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(
                screen.getByText('Hvis barnet blir innlagt på sykehus de første 6 ukene etter fødsel.'),
            ).toBeInTheDocument();
            expect(screen.getByText('Hvis du blir syk de første seks ukene med foreldrepenger')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.morSykISinPeriode.tittel'])).toBeInTheDocument();
            expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.samtidigUttak.tittel'])).toBeInTheDocument();
            expect(screen.queryByText('Hvis barnet blir født før svangerskapsuke 33')).not.toBeInTheDocument();

            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.alt'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.senere'])).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.queryByText(/Tre uker før fødsel fra/)).not.toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.alt']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartValg.spørsmål']);
            await userEvent.type(oppstart, '21.09.2023');
            expect(screen.getByText('På fødselsdato')).toBeInTheDocument();
            expect(screen.getByText('Du mister 3 uker.')).toBeInTheDocument();
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenCalled();
        }),
    );

    it(
        'skal ikke kunne gå videre med ikke utfylt informasjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnPrematurFødsel.parameters.msw);
            render(
                <MorDeltUttakEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText(messages['fordeling.fordelingsvalg.måOppgis'])).toHaveLength(2);
            expect(screen.getAllByText(messages['fordeling.oppstartDato.måOppgis'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getAllByText(messages['fordeling.antallUkerDager.måOppgis'])).toHaveLength(2);
        }),
    );

    it(
        'skal ikke kunne skrive inn tekst for antall uker hun ønsker av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            const ukerInput = utils.getByLabelText(messages['fordeling.antallUker.spørsmål']);
            await userEvent.type(ukerInput, 'test');
            fireEvent.blur(ukerInput);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(
                screen.getAllByText(messages['fordeling.antallUker.ugyldigFormat']),
            ).toHaveLength(2);
        }),
    );

    it(
        'skal ikke kunne skrive inn desimaltall for antall uker hun ønsker av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            const ukerInput = utils.getByLabelText(messages['fordeling.antallUker.spørsmål']);
            await userEvent.type(ukerInput, '1,5');
            fireEvent.blur(ukerInput);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(
                screen.getAllByText(messages['fordeling.antallUker.ugyldigFormat']),
            ).toHaveLength(2);
        }),
    );

    it(
        'skal ikke kunne skrive inn for mange uker for antall uker hun ønsker av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            const ukerInput = utils.getByLabelText(messages['fordeling.antallUker.spørsmål']);
            await userEvent.type(ukerInput, '21');
            fireEvent.blur(ukerInput);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getAllByText('Fellesperioden kan være maksimalt 20 uker lang.')).toHaveLength(2);
        }),
    );

    it(
        'skal ikke kunne skrive inn et negativt tall for antall uker hun ønsker av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            const ukerInput = utils.getByLabelText(messages['fordeling.antallUker.spørsmål']);
            await userEvent.type(ukerInput, '-1');
            fireEvent.blur(ukerInput);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(
                screen.getAllByText(messages['fordeling.antallUker.ugyldigFormat']),
            ).toHaveLength(2);
        }),
    );

    it(
        'skal få figur over fordeling når hun velger gyldig antall uker hun ønsker av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnPrematurFødsel.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            const ukerInput = utils.getByLabelText(messages['fordeling.antallUker.spørsmål']);
            await userEvent.type(ukerInput, '3');
            fireEvent.blur(ukerInput);
            expect(screen.getByText('3 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('17 uker igjen')).toBeInTheDocument();
        }),
    );

    it(
        'skal få informasjon når hun ønsker å hoppe over fordeling av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnPrematurFødsel.parameters.msw);
            render(
                <MorDeltUttakEttBarnPrematurFødsel
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.senere']));
            expect(
                screen.getByText(
                    'I planen din på neste steg vil ikke fellesperioden vises fordi du har valgt å fordele denne senere.',
                    { exact: false },
                ),
            ).toBeInTheDocument();
        }),
    );
});

describe('Fordeling - MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise input for dager med fellesperiode når bruker svarer at de vil velge fordeling av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.antallUker.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.antallDager.spørsmål'])).toBeInTheDocument();
        }),
    );
    it(
        'skal ikke kunne gå videre uten å oppgi antall uker eller dager av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText(messages['fordeling.antallUkerDager.måOppgis'])).toHaveLength(3);
            const dagerInput = utils.getByLabelText(messages['fordeling.antallDager.spørsmål']);
            await userEvent.type(dagerInput, '1');
        }),
    );
    it(
        'skal kunne gå videre uten å oppgi antall uker hvis man oppgir dager i fordelingen av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            const dagerInput = utils.getByLabelText(messages['fordeling.antallDager.spørsmål']);
            await userEvent.type(dagerInput, '1');
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.queryByText(messages['fordeling.antallUkerDager.måOppgis'])).not.toBeInTheDocument();
        }),
    );
    it(
        'skal kunne gå videre uten å oppgi antall dager hvis man oppgir uker i fordelingen av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            const ukerInput = utils.getByLabelText(messages['fordeling.antallUker.spørsmål']);
            await userEvent.type(ukerInput, '2');
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.queryByText(messages['fordeling.antallUkerDager.måOppgis'])).not.toBeInTheDocument();
        }),
    );
    it(
        'skal ikke kunne oppgi desimaltall som antall dager',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            const dagerInput = utils.getByLabelText(messages['fordeling.antallDager.spørsmål']);
            await userEvent.type(dagerInput, '1,4');
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(
                screen.getAllByText(messages['fordeling.antallDager.ugyldigFormat']),
            ).toHaveLength(2);
        }),
    );
    it(
        'skal ikke kunne oppgi tekst som antall dager',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            const dagerInput = utils.getByLabelText(messages['fordeling.antallDager.spørsmål']);
            await userEvent.type(dagerInput, 'to');
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(
                screen.getAllByText(messages['fordeling.antallDager.ugyldigFormat']),
            ).toHaveLength(2);
        }),
    );
    it(
        'skal ikke kunne oppgi negativt tall som antall dager',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            const dagerInput = utils.getByLabelText(messages['fordeling.antallDager.spørsmål']);
            await userEvent.type(dagerInput, '-2');
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(
                screen.getAllByText(messages['fordeling.antallDager.ugyldigFormat']),
            ).toHaveLength(2);
        }),
    );
    it(
        'skal ikke kunne overskride antall dager  tilgjengelig',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            const dagerInput = utils.getByLabelText(messages['fordeling.antallDager.spørsmål']);
            await userEvent.type(dagerInput, '102');
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Fellesperioden kan være maksimalt 20 uker og 1 dag lang.')).toHaveLength(2);
        }),
    );
    it(
        'skal ikke kunne overskride antall uker og dager tilgjengelig',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnetter1Juli2024Med80ProsentDekning
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.valgfritt']));
            expect(screen.getByText(messages['fordeling.antallUkerDager.spørsmål'])).toBeInTheDocument();
            const dagerInput = utils.getByLabelText(messages['fordeling.antallDager.spørsmål']);
            await userEvent.type(dagerInput, '92');
            const ukerInput = utils.getByLabelText(messages['fordeling.antallUker.spørsmål']);
            await userEvent.type(ukerInput, '2');
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Fellesperioden kan være maksimalt 20 uker og 1 dag lang.')).toHaveLength(3);
        }),
    );
});

describe('Fordeling - MorDeltUttakEttBarnTermin', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor med delt uttak som søker på termin',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnTermin.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnTermin
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.queryByText(messages['søkersituasjon.radioButton.fødsel'])).not.toBeInTheDocument();
            expect(screen.getByText('Termin')).toBeInTheDocument();
            expect(screen.getByText('Din del')).toBeInTheDocument();
            expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
            expect(screen.getByText("Hans' del")).toBeInTheDocument();
            expect(screen.getByText('15 + 3 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('kan kun brukes før fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('6 uker')).toBeInTheDocument();
            expect(screen.getByText('er satt av til rett etter fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('9 uker')).toBeInTheDocument();
            expect(screen.getByText('16 uker kan deles, fellesperiode')).toBeInTheDocument();
            expect(screen.getByText('15 uker til Hans', { exact: false })).toBeInTheDocument();
            expect(screen.getAllByText('kan brukes når som helst før barnet fyller 3 år.')).toHaveLength(2);
            expect(screen.getByText('2 av disse ukene')).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(
                screen.getByText('Hvis barnet blir innlagt på sykehus de første 6 ukene etter fødsel.'),
            ).toBeInTheDocument();
            expect(screen.getByText('Hvis du blir syk de første seks ukene med foreldrepenger')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.morSykISinPeriode.tittel'])).toBeInTheDocument();
            expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.samtidigUttak.tittel'])).toBeInTheDocument();
            expect(screen.getByText('Hvis barnet blir født før svangerskapsuke 33')).toBeInTheDocument();

            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.alt'])).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText(/Tre uker før fødsel fra/)).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            await userEvent.click(screen.getByText(messages['fordeling.fordelingsvalg.option.alt']));
            expect(screen.getByText('16 uker til deg')).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '21.06.2024');
            fireEvent.blur(oppstart);
            expect(screen.getByText('På termindato')).toBeInTheDocument();
            expect(screen.getByText('Du mister 3 uker.')).toBeInTheDocument();
            expect(
                screen.getByText(messages['fordeling.oppstartValg.morFødsel.info']),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));
            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenCalled();
        }),
    );
    it(
        'skal vise riktig informasjon til mor ønsker å starte dagen før termin',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnTermin.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnTermin
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            expect(screen.getAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.type(oppstart, '20.06.2024');
            fireEvent.blur(oppstart);
            expect(screen.getByText('1 dag før termin.')).toBeInTheDocument();
            expect(screen.getByText('Du mister 2 uker og 4 dager.')).toBeInTheDocument();
        }),
    );

    it(
        'skal vise riktig informasjon til mor skal bruke 1 dag av fellesperioden',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnTermin.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnTermin
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '30.05.2024');
            fireEvent.blur(oppstart);
            expect(screen.getByText('3 uker og 1 dag før termin.')).toBeInTheDocument();
            expect(screen.getByText('1 dag tas fra fellesperioden.')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Neste steg'));
            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);
            expect(gåTilNesteSide).toHaveBeenCalled();
        }),
    );
    it(
        'kan ikke angi for sen oppstartsdato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnTermin.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnTermin
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '22.06.2024');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være senest 21.06.2024.')).toHaveLength(2);
        }),
    );
    it(
        'kan ikke angi for tidlig oppstartsdato',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakEttBarnTermin.parameters.msw);
            const utils = render(
                <MorDeltUttakEttBarnTermin
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '28.03.2024');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 29.03.2024.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - MorDeltUttakTvillingerFødt', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor med delt uttak som søker på fødsel av tvillinger',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakTvillingerFødt.parameters.msw);
            render(
                <MorDeltUttakTvillingerFødt
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.queryByText('Termin')).not.toBeInTheDocument();
            expect(screen.getByText(messages['søkersituasjon.radioButton.fødsel'])).toBeInTheDocument();
            expect(screen.getByText('33 uker kan deles, fellesperiode')).toBeInTheDocument();
            expect(screen.getAllByText('brukes når som helst før barna fyller 3 år.', { exact: false })).toHaveLength(
                3,
            );

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(
                screen.getByText('Hvis barna blir innlagt på sykehus de første 6 ukene etter fødsel.'),
            ).toBeInTheDocument();

            expect(
                screen.getByText(
                    'Dere kan velge om dere vil ha foreldrepenger samtidig i opp til 17 uker fordi dere har fått tvillinger.',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.queryByText('Hvis barnet blir født før svangerskapsuke 33')).not.toBeInTheDocument();

            expect(screen.getByText(/Hvordan vil dere fordele fellesperioden på/)).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.fordelingsvalg.option.alt'])).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText(/Tre uker før fødsel fra/)).toBeInTheDocument();
        }),
    );
});

describe('Fordeling - MorDeltUttakFarSøkteMorsKvoteOgFellesperiode', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor med delt uttak som søker på termin etter far',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorDeltUttakFarSøkteMorsKvoteOgFellesperiode.parameters.msw);
            render(
                <MorDeltUttakFarSøkteMorsKvoteOgFellesperiode
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.queryByText(messages['søkersituasjon.radioButton.fødsel'])).not.toBeInTheDocument();
            expect(screen.getByText('Termin')).toBeInTheDocument();
            expect(screen.getByText('1 uke og 4 dager')).toBeInTheDocument();
            expect(
                screen.getByText('er allerede brukt av Hans fordi du er enten syk eller innlagt i helseinstitusjon.'),
            ).toBeInTheDocument();
            expect(screen.getByText('7 uker og 1 dag')).toBeInTheDocument();
            expect(screen.getAllByText('brukes når som helst før barnet fyller 3 år.', { exact: false })).toHaveLength(
                3,
            );

            expect(screen.getByText('2 uker og 4 dager')).toBeInTheDocument();
            expect(
                screen.getByText(
                    'allerede brukt av Hans. Dette kan endres. Det gjenstår 13 uker og 1 dag som kan brukes av deg eller Hans.',
                    { exact: false },
                ),
            ).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis barnet blir født før svangerskapsuke 33')).toBeInTheDocument();
        }),
    );
});

describe('Fordeling - FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med delt uttak som søker på et barn født før 1 okt 2021',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021.parameters.msw);
            render(
                <FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['søkersituasjon.radioButton.fødsel'])).toBeInTheDocument();
            expect(screen.getByText('Hannes del')).toBeInTheDocument();
            expect(screen.getByText('Din del')).toBeInTheDocument();

            expect(screen.getByText('9 uker', { exact: false })).toBeInTheDocument();
            expect(screen.getAllByText('15 uker', { exact: false })).toHaveLength(2);
            expect(screen.getAllByText('med foreldrepenger.', { exact: false })).toHaveLength(2);

            expect(
                screen.getByText('Siden dere har fått barn før 1. oktober 2021', {
                    exact: false,
                }),
            ).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.queryByText('På fødselsdato')).not.toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(
                screen.queryByText('Hvis barnet blir innlagt på sykehus de første 6 ukene etter fødsel.'),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText('Hvis du blir syk de første seks ukene med foreldrepenger'),
            ).not.toBeInTheDocument();
            expect(screen.queryByText(messages['fordeling.påvirkninger.morSykISinPeriode.tittel'])).not.toBeInTheDocument();
            expect(screen.getByText('Hvis dere får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.samtidigUttak.tittel'])).toBeInTheDocument();
            expect(
                screen.getByText('Hvis du blir syk, eller hvis du eller barnet blir innlagt på helseinstitusjon'),
            ).toBeInTheDocument();
        }),
    );

    it(
        'skal ikke kunne begynne uttaket før fødsel',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021.parameters.msw);
            const utils = render(
                <FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartValg.spørsmål']);
            await userEvent.type(oppstart, '20.07.2021');
            fireEvent.blur(oppstart);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 21.07.2021.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - FarMedmorSøkerDeltUttakTrillingerFødtFørWLB', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med delt uttak som søker på trillinger født før 2 aug. 2022',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorSøkerDeltUttakTrillingerFødtFørWLB.parameters.msw);
            render(
                <FarMedmorSøkerDeltUttakTrillingerFødtFørWLB
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['søkersituasjon.radioButton.fødsel'])).toBeInTheDocument();
            expect(screen.getByText('Hannes del')).toBeInTheDocument();
            expect(screen.getByText('Din del')).toBeInTheDocument();

            expect(screen.getByText('15 + 3 uker til Hanne')).toBeInTheDocument();
            expect(screen.getByText('74 uker kan deles, fellesperiode')).toBeInTheDocument();
            expect(screen.getByText('15 uker til deg')).toBeInTheDocument();

            expect(
                screen.getByText(
                    'Dere kan velge om dere vil ha foreldrepenger samtidig i opp til 46 uker fordi dere har fått trillinger. ',
                    {
                        exact: false,
                    },
                ),
            ).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.queryByText('På fødselsdato')).not.toBeInTheDocument();
        }),
    );

    it(
        'skal ikke kunne begynne uttaket før fødsel',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorSøkerDeltUttakTrillingerFødtFørWLB.parameters.msw);
            const utils = render(
                <FarMedmorSøkerDeltUttakTrillingerFødtFørWLB
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartValg.spørsmål']);
            await userEvent.type(oppstart, '20.07.2022');
            fireEvent.blur(oppstart);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 21.07.2022.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far med delt uttak som søker på trillinger født før 2 aug. 2022',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB.parameters.msw);
            render(
                <FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('15 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('2 av disse ukene')).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes i perioden rundt fødsel, samtidig med Hanne.', { exact: false }),
            ).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(
                screen.getByText('Mange får dekket permisjon de første to ukene rundt fødsel fra arbeidsgiveren sin.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.påFødsel.barnErIkkeFødt'])).toBeInTheDocument();
            expect(
                screen.getByText('Jeg vil ha to uker med foreldrepenger som starter på termindato.', { exact: false }),
            ).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
        }),
    );

    it(
        'skal ikke kunne begynne uttaket før 2 uker før termin',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB.parameters.msw);
            const utils = render(
                <FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '05.07.2024');
            fireEvent.blur(oppstart);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getAllByText(/Oppstartsdato for foreldrepenger kan være tidligst/)).toHaveLength(2);
        }),
    );
});

describe('Fordeling - FarMedmorSøkerDeltUttakEttBarnFødtPrematurt', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    afterEach(() => {
        MockDate.reset();
    });

    it(
        'skal vise riktig informasjon til far med delt uttak der barnet er født prematurt',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-02-25'));
            setHandlers(FarMedmorSøkerDeltUttakEttBarnFødtPrematurt.parameters.msw);
            render(
                <FarMedmorSøkerDeltUttakEttBarnFødtPrematurt
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('20 uker kan deles, fellesperiode')).toBeInTheDocument();
            expect(screen.getByText('12 uker og 4 dager av disse', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText('er lagt til i fellesperioden fordi barnet ble født før svangerskapsuke 33.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(screen.getByText('2 av disse ukene')).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes i perioden rundt fødsel, samtidig med Hanne.', { exact: false }),
            ).toBeInTheDocument();
            expect(screen.queryByText('flerbarnsdager')).not.toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(
                screen.getByText('Mange får dekket permisjon de første to ukene rundt fødsel fra arbeidsgiveren sin.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(screen.getByText('Da barnet ble født')).toBeInTheDocument();
            expect(
                screen.getByText('Jeg vil ha to uker med foreldrepenger som starter fra datoen barnet ble født.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
        }),
    );

    it(
        'skal ikke kunne begynne uttaket før fødselsdato',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-02-25'));
            setHandlers(FarMedmorSøkerDeltUttakEttBarnFødtPrematurt.parameters.msw);
            const utils = render(
                <FarMedmorSøkerDeltUttakEttBarnFødtPrematurt
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '20.02.2024');
            fireEvent.blur(oppstart);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 21.02.2024.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    afterEach(() => {
        MockDate.reset();
    });

    it(
        'skal vise riktig informasjon til far søker etter mor og mor har tatt ut deler av fellesperiode og hans kvote',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-02-25'));
            setHandlers(FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode.parameters.msw);
            render(
                <FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('15 + 3 uker til Hanne')).toBeInTheDocument();
            expect(screen.getByText('16 uker kan deles, fellesperiode')).toBeInTheDocument();

            expect(screen.getByText('1 dag', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText(
                    'er allerede brukt av Hanne. Dette kan endres. Det gjenstår 15 uker og 4 dager som kan brukes av deg eller Hanne.',
                    { exact: false },
                ),
            ).toBeInTheDocument();
            expect(screen.getByText('15 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('2 uker og 3 dager', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText('er allerede brukt av Hanne fordi du er enten syk eller innlagt i helseinstitusjon.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByText('Hannes siste dag med foreldrepenger er mandag 12. august 2024.'),
            ).toBeInTheDocument();
            expect(screen.getByText('Fra Hanne sin søknad.')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText('Da barnet ble født')).toBeInTheDocument();
            expect(screen.getByText('Første dag etter Hanne, 13. august 2024')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
        }),
    );
});
describe('Fordeling - MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktige oppstartsvalg til mor som søker adopsjon for tre barn adoptert fra utlandet før 1 okt 2021',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80.parameters.msw);
            render(
                <MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText('På omsorgsovertakelsen, 21. februar 2021')).toBeInTheDocument();
            expect(screen.getByText('På ankomstdagen til Norge, 21. mai 2021')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
        }),
    );
});

describe('Fordeling - MorSøkerFarHarRettIEØSTerminDekningsgrad80', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig EØS informasjon til mor som søker med far som har rett i EØS, dekningsgrad 80',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(MorSøkerFarHarRettIEØSTerminDekningsgrad80.parameters.msw);
            render(
                <MorSøkerFarHarRettIEØSTerminDekningsgrad80
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('19 + 3 uker til deg')).toBeInTheDocument();
            expect(screen.getByText("18 uker som påvirkes av Hans' foreldrepenger")).toBeInTheDocument();
            expect(
                screen.getByText('Når Hans skal ha dager fra denne perioden, må du være i aktivitet.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByText('Hvis Hans bruker mer enn 19 uker med foreldrepenger i et annet EØS land', {
                    exact: false,
                }),
            ).toBeInTheDocument();
        }),
    );
});

describe('Fordeling - FarMedmorSøkerMorHarRettIEØSAdopsjon', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig EØS informasjon til far som søker på adopsjon og med mor som har rett i EØS',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarMedmorSøkerMorHarRettIEØSAdopsjon.parameters.msw);
            render(
                <FarMedmorSøkerMorHarRettIEØSAdopsjon
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('19 uker til deg')).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes når som helst innen tre år etter omsorgsovertakelsen.', { exact: false }),
            ).toBeInTheDocument();
            expect(screen.getByText('18 uker som påvirkes av Hannes foreldrepenger')).toBeInTheDocument();
            expect(
                screen.getByText('Når du skal ha dager fra denne perioden, må Hanne være i aktivitet.', {
                    exact: false,
                }),
            ).toBeInTheDocument();
            expect(
                screen.getByText('Hvis Hanne bruker mer enn 19 uker med foreldrepenger i et annet EØS land', {
                    exact: false,
                }),
            ).toBeInTheDocument();
        }),
    );
});
describe('Fordeling - BareMorHarRettTermin', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor søker på termin, kun mor har rett',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(BareMorHarRettTermin.parameters.msw);
            render(
                <BareMorHarRettTermin
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('43 + 3 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('6 uker')).toBeInTheDocument();
            expect(screen.getByText('er satt av til rett etter fødsel.', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('40 uker')).toBeInTheDocument();
            expect(screen.getByText('kan brukes når som helst før barnet fyller 3 år.')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText(/Tre uker før fødsel fra/)).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
        }),
    );
});
describe('Fordeling - BareMorHarRettAdopsjon', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til mor søker på adopsjon, kun mor har rett',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(BareMorHarRettAdopsjon.parameters.msw);
            render(
                <BareMorHarRettAdopsjon
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('46 uker til deg')).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes når som helst innen tre år etter omsorgsovertakelsen.', { exact: false }),
            ).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText('På omsorgsovertakelsen, 21. august 2022')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();
            expect(
                screen.queryByText('Hvis barnet blir innlagt på sykehus de første 6 ukene etter fødsel.'),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText('Hvis du blir syk de første seks ukene med foreldrepenger'),
            ).not.toBeInTheDocument();
            expect(screen.queryByText(messages['fordeling.påvirkninger.morSykISinPeriode.tittel'])).not.toBeInTheDocument();
            expect(screen.queryByText(messages['fordeling.påvirkninger.samtidigUttak.tittel'])).not.toBeInTheDocument();
            expect(
                screen.queryByText('Hvis du blir syk, eller hvis du eller barnet blir innlagt på helseinstitusjon'),
            ).not.toBeInTheDocument();
        }),
    );
});
describe('Fordeling - BareFarHarRettOgMorErUførTermin4Barn', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far søker på termin, kun far har rett, mor er ufør, fire barn',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(BareFarHarRettOgMorErUførTermin4Barn.parameters.msw);
            render(
                <BareFarHarRettOgMorErUførTermin4Barn
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('106 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('75 uker', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes av deg uten krav til Hannes aktivitet.', { exact: false }),
            ).toBeInTheDocument();
            expect(screen.getByText('31 uker', { exact: false })).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes av deg hvis Hanne er i aktivitet.', { exact: false }),
            ).toBeInTheDocument();
            expect(
                screen.getByText('Hvis Hanne ikke er i aktivitet, vil du tape dager.', {
                    exact: false,
                }),
            ).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.påFødsel.barnErIkkeFødt'])).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['fordeling.påvirkninger.tittel']));
            expect(screen.getByText('Hvis du får et nytt barn før det har gått tre år')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.påvirkninger.jobb.tittel'])).toBeInTheDocument();
            expect(screen.getByText('Hvis barna blir født før svangerskapsuke 33')).toBeInTheDocument();
            expect(
                screen.queryByText('Hvis barnet blir innlagt på sykehus de første 6 ukene etter fødsel.'),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText('Hvis du blir syk de første seks ukene med foreldrepenger'),
            ).not.toBeInTheDocument();
            expect(screen.queryByText(messages['fordeling.påvirkninger.morSykISinPeriode.tittel'])).not.toBeInTheDocument();
            expect(screen.queryByText(messages['fordeling.påvirkninger.samtidigUttak.tittel'])).not.toBeInTheDocument();
            expect(
                screen.queryByText('Hvis du blir syk, eller hvis du eller barnet blir innlagt på helseinstitusjon'),
            ).not.toBeInTheDocument();
        }),
    );
});

describe('Fordeling - BareFarHarRettOgMorErIkkeUførFødtBarn', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    afterEach(() => {
        MockDate.reset();
    });

    it(
        'skal vise riktig informasjon til far søker på fødsel, kun far har rett, mor er ikke ufør, ett barn',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-02-21'));
            setHandlers(BareFarHarRettOgMorErIkkeUførFødtBarn.parameters.msw);
            render(
                <BareFarHarRettOgMorErIkkeUførFødtBarn
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('50 uker til deg')).toBeInTheDocument();
            expect(screen.getByText('8 uker')).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes av deg uten krav til Hannes aktivitet.', { exact: false }),
            ).toBeInTheDocument();
            expect(screen.getByText('42 uker')).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes av deg hvis Hanne er i aktivitet.', { exact: false }),
            ).toBeInTheDocument();
            expect(
                screen.getByText('Hvis Hanne ikke er i aktivitet, vil du tape dager.', {
                    exact: false,
                }),
            ).toBeInTheDocument();

            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText('Da barnet ble født')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
        }),
    );
    it(
        'kan ikke starte tidligere enn 2 uker før fødsel',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-02-21'));
            setHandlers(BareFarHarRettOgMorErIkkeUførFødtBarn.parameters.msw);
            const utils = render(
                <BareFarHarRettOgMorErIkkeUførFødtBarn
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '05.01.2024');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 08.01.2024.')).toHaveLength(
                2,
            );
        }),
    );
});

describe('Fordeling - BareFarHarRettTvillingerFødtFør1Okt2021', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    afterEach(() => {
        MockDate.reset();
    });

    it(
        'skal vise riktig informasjon til far, kun far har rett, tvillinger født før 1 okt 2021',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(BareFarHarRettTvillingerFødtFør1Okt2021.parameters.msw);
            render(
                <BareFarHarRettTvillingerFødtFør1Okt2021
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('57 uker til deg')).toBeInTheDocument();
            expect(
                screen.getByText('kan brukes av deg hvis Hanne er i aktivitet.', { exact: false }),
            ).toBeInTheDocument();
            expect(
                screen.queryByText('kan brukes av deg uten krav til Hannes aktivitet.', { exact: false }),
            ).not.toBeInTheDocument();
            expect(
                screen.getByText(messages['fordeling.sammenhengendeUttak.info.enHarRett'],
                ),
            ).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
        }),
    );
    it(
        'kan ikke starte tidligere enn to uker før fødsel',
        mswWrapper(async ({ setHandlers }) => {
            MockDate.set(new Date('2024-02-20'));
            setHandlers(BareFarHarRettOgMorErIkkeUførFødtBarn.parameters.msw);
            const utils = render(
                <BareFarHarRettOgMorErIkkeUførFødtBarn
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '05.01.2024');
            fireEvent.blur(oppstart);
            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 08.01.2024.')).toHaveLength(
                2,
            );
        }),
    );
});
describe('Fordeling - BareFarHarRettAdopsjonMorErUfør', () => {
    const gåTilNesteSide = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn();

    it(
        'skal vise riktig informasjon til far, kun far har rett, tvillinger født før 1 okt 2021',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(BareFarHarRettAdopsjonMorErUfør.parameters.msw);
            render(
                <BareFarHarRettAdopsjonMorErUfør
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            expect(screen.getByText('40 uker til deg')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.spørsmål'])).toBeInTheDocument();
            expect(screen.getByText('På omsorgsovertakelsen, 21. februar 2024')).toBeInTheDocument();
            expect(screen.getByText(messages['fordeling.oppstartValg.annenDato'])).toBeInTheDocument();
        }),
    );

    it(
        'kan ikke starte tidligere enn adopsjonsdatoen',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(BareFarHarRettAdopsjonMorErUfør.parameters.msw);
            const utils = render(
                <BareFarHarRettAdopsjonMorErUfør
                    gåTilNesteSide={gåTilNesteSide}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                />,
            );
            expect(await screen.findAllByText(messages['steps.label.fordeling'])).toHaveLength(2);
            await userEvent.click(screen.getByText(messages['fordeling.oppstartValg.annenDato']));
            const oppstart = utils.getByLabelText(messages['fordeling.oppstartDato.input']);
            await userEvent.type(oppstart, '20.02.2024');
            fireEvent.blur(oppstart);

            await userEvent.click(screen.getByText('Neste steg'));
            expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
            expect(screen.getAllByText('Oppstartsdato for foreldrepenger kan være tidligst 21.02.2024.')).toHaveLength(
                2,
            );
        }),
    );
});
