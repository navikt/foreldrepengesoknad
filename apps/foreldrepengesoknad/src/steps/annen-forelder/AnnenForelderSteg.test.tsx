import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { AnnenForelder } from 'types/AnnenForelder';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './AnnenForelderSteg.stories';

import messages from '../../intl/nb_NO.json';

const {
    AnnenForelderFraOppgittBarn,
    SkalOppgiPersonalia,
    ForFar,
    MorUfødtBarn,
    FarFødtBarnMorHarVedtak,
    FarFødtBarnMorHarAvslåttVedtak,
} = composeStories(stories);

describe('<AnnenForelderSteg>', () => {
    it('skal fylle ut at en har aleneomsorg for barnet', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <AnnenForelderFraOppgittBarn
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();

        expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['annenForelder.aleneOmOmsorg.nei']));

        expect(
            screen.getByText(
                'Selv om du har aleneomsorg kan den andre forelderen ha foreldrepenger hvis dere' +
                    ' avtaler dette mellom dere. Da kan hen søke om å bruke ukene med foreldrepenger som du ikke bruker.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                erAleneOmOmsorg: true,
                etternavn: 'BÆREPOSE',
                fnr: '12038517080',
                fornavn: 'LEALAUS',
                harRettPåForeldrepengerIEØS: false,
                kanIkkeOppgis: false,
            },
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal lagre route når en går til forrige steg', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <AnnenForelderFraOppgittBarn
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Forrige steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: SøknadRoutes.ARBEID_OG_INNTEKT,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og ikke rett til foreldrepenger i Norge og ikke hatt opphold i EØS', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <AnnenForelderFraOppgittBarn
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();

        expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[0]!);

        expect(
            screen.getByText(messages['annenForelder.harOppholdtSegIEØS'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[1]!);

        await userEvent.click(screen.getByText('Neste steg'));
        expect(screen.queryByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).not.toBeInTheDocument();

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                erAleneOmOmsorg: false,
                etternavn: 'BÆREPOSE',
                fnr: '12038517080',
                fornavn: 'LEALAUS',
                harOppholdtSegIEØS: false,
                harRettPåForeldrepengerIEØS: false,
                harRettPåForeldrepengerINorge: false,
                kanIkkeOppgis: false,
            },
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet, ikke rett til foreldrepenger i Norge, opphold men ikke optjening i EØS', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <AnnenForelderFraOppgittBarn
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();

        expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[0]!);

        expect(
            screen.getByText(messages['annenForelder.harOppholdtSegIEØS'],
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        expect(
            screen.getByText(messages['annenForelder.harRettPåForeldrepengerIEØS'],
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[2]!);

        await userEvent.click(screen.getByText('Neste steg'));
        expect(screen.queryByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).not.toBeInTheDocument();

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                erAleneOmOmsorg: false,
                etternavn: 'BÆREPOSE',
                fnr: '12038517080',
                fornavn: 'LEALAUS',
                harOppholdtSegIEØS: true,
                harRettPåForeldrepengerIEØS: false,
                harRettPåForeldrepengerINorge: false,
                kanIkkeOppgis: false,
            },
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har ikke orientert annen part', async () => {
        render(<AnnenForelderFraOppgittBarn />);

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();

        expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        await userEvent.click(screen.getAllByText(messages['nei'])[1]!);

        expect(
            screen.getByText(messages['annenForelder.erAnnenForelderInformert.veileder']),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['annenForelder.erAnnenForelderInformert.veileder']),
        ).toHaveLength(3);
    });

    it('skal fylle ut at en ikke har aleneomsorg for barnet og at en har rett til foreldrepenger og har orientert annen part', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(
            <AnnenForelderFraOppgittBarn
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findByText('LEALAUS BÆREPOSE')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();

        expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(screen.getByText(messages['annenForelder.spørsmål.erAnnenForelderInformert'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        await userEvent.click(screen.getByText('Neste steg'));
        expect(screen.queryByText('Dere kan avtale at LEALAUS tar ut foreldrepenger.')).not.toBeInTheDocument();

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                erAleneOmOmsorg: false,
                etternavn: 'BÆREPOSE',
                fnr: '12038517080',
                fornavn: 'LEALAUS',
                harRettPåForeldrepengerIEØS: false,
                harRettPåForeldrepengerINorge: true,
                erInformertOmSøknaden: true,
                kanIkkeOppgis: false,
            },
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal velge at en ikke kan oppgi personalia til den andre forelderen', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(
            <SkalOppgiPersonalia
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['annenForelder.spørsmål.kanOppgis']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                kanIkkeOppgis: true,
            },
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal oppgi personalia til den andre forelderen og velge at han har utenlandsk fødselsnummer', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(
            <SkalOppgiPersonalia
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );

        expect(await screen.findAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);

        const fornavnInput = screen.getByLabelText(messages['annenForelder.spørsmål.fornavn']);
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText(messages['annenForelder.spørsmål.etternavn']);
        await userEvent.type(etternavnInput, 'Utvikler');

        const fødselsnrInput = screen.getByLabelText(messages['annenForelder.spørsmål.fnr']);
        await userEvent.type(fødselsnrInput, '05057923424');

        await userEvent.click(screen.getByText(messages['annenForelder.spørsmål.utenlandskFnr']));

        const hvorBorSelect = screen.getByLabelText(messages['annenForelder.bostedsland']);
        await userEvent.selectOptions(hvorBorSelect, 'Oman');

        expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['annenForelder.aleneOmOmsorg.nei']));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                bostedsland: 'OM',
                erAleneOmOmsorg: true,
                etternavn: 'Utvikler',
                fnr: '05057923424',
                fornavn: 'Espen',
                harRettPåForeldrepengerIEØS: false,
                kanIkkeOppgis: false,
                utenlandskFnr: true,
            } satisfies AnnenForelder,
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal søke som far og ha aleneomsorg for barnet', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(<ForFar gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();
        expect(screen.getByText('Fødselsnummer: 12038517080')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['annenForelder.aleneOmOmsorg.nei']));

        const datoAleneInput = screen.getByLabelText(messages['annenForelder.datoForAleneomsorg']);
        await userEvent.type(datoAleneInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                datoForAleneomsorg: dayjs().format(ISO_DATE_FORMAT),
                erAleneOmOmsorg: true,
                etternavn: 'MYGG',
                fnr: '12038517080',
                fornavn: 'TALENTFULL',
                harRettPåForeldrepengerIEØS: false,
                kanIkkeOppgis: false,
            },
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('Skal søke som far og velge at mor har foreldrepenger i EØS', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();
        render(<ForFar gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />);

        expect(await screen.findByText('TALENTFULL MYGG')).toBeInTheDocument();

        expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[0]!);

        expect(
            screen.getByText(messages['annenForelder.harOppholdtSegIEØS'],
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        expect(
            screen.getByText(messages['annenForelder.harRettPåForeldrepengerIEØS'],
                {
                    exact: false,
                },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]!);

        await userEvent.click(screen.getAllByText(messages['nei'])[2]!);

        expect(screen.getByText(messages['annenForelder.erMorUfør'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[3]!);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                erAleneOmOmsorg: false,
                erMorUfør: false,
                etternavn: 'MYGG',
                fnr: '12038517080',
                fornavn: 'TALENTFULL',
                harOppholdtSegIEØS: true,
                harRettPåForeldrepengerIEØS: false,
                harRettPåForeldrepengerINorge: false,
                kanIkkeOppgis: false,
            },
            key: ContextDataType.ANNEN_FORELDER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });
    });

    it('skal ikke vise infoboks om farskapsportal når mor søker på termin, annen forelder er en medmor og har rett i Norge', async () => {
        render(<MorUfødtBarn />);

        expect(await screen.findAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);

        const fornavnInput = screen.getByLabelText(messages['annenForelder.spørsmål.fornavn']);
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText(messages['annenForelder.spørsmål.etternavn']);
        await userEvent.type(etternavnInput, 'Utvikler');

        const fødselsnrInput = screen.getByLabelText(messages['annenForelder.spørsmål.fnr']);
        //Endrer fnr på annen forelder til en kvinnelig fnr:
        await userEvent.type(fødselsnrInput, '05057923824');

        expect(screen.getByText(messages['annenForelder.aleneOmOmsorg'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText(messages['annenForelder.harRettPåForeldrepengerINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(screen.queryByText('Her kan far erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();
    });

    it(
        'skal ikke spørre om annenpart har rett hvis annenpart har vedtak',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarFødtBarnMorHarVedtak.parameters.msw);
            render(<FarFødtBarnMorHarVedtak />);

            expect(await screen.findAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);
            await waitFor(() => {
                expect(
                    screen.queryByText(messages['annenForelder.harRettPåForeldrepengerINorge'], { exact: false }),
                ).not.toBeInTheDocument();
            });
        }),
    );
    it(
        'skal spørre om annenpart har rett hvis annenpart har avslått vedtak',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FarFødtBarnMorHarAvslåttVedtak.parameters.msw);
            render(<FarFødtBarnMorHarAvslåttVedtak />);

            expect(await screen.findAllByText(messages['steps.label.annenForelder'])).toHaveLength(2);
            expect(
                await screen.findByText(messages['annenForelder.harRettPåForeldrepengerINorge'], { exact: false }),
            ).toBeInTheDocument();
        }),
    );
});
