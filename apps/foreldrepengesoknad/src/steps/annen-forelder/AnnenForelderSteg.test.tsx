import { composeStories } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { uttaksplanOptions } from 'api/queries';
import { ContextDataMap, ContextDataType, FpDataContext, useContextGetData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { saker } from 'storybookData/saker';
import { AnnenForelder } from 'types/AnnenForelder';
import { getUttaksplanParam } from 'utils/annenForelderUtils';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { UttakPeriodeDto_fpoversikt } from '@navikt/fp-types';
import { IntlProvider, uiMessages } from '@navikt/fp-ui';

import messages from '../../intl/nb_NO.json';
import { AnnenForelderSteg } from './AnnenForelderSteg';
import * as stories from './AnnenForelderSteg.stories';

const {
    AnnenForelderFraOppgittBarn,
    SkalOppgiPersonalia,
    ForFar,
    MorUfødtBarn,
    FarFødtBarnMorHarVedtak,
    FarFødtBarnMorHarAvslåttVedtak,
} = composeStories(stories);

const renderForFar = (initialState: ContextDataMap, children?: ReactNode) => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
    client.setQueryData(['SAKER'], saker);
    client.setQueryData(
        uttaksplanOptions(getUttaksplanParam(initialState.ANNEN_FORELDER!, ForFar.args.barn!)).queryKey,
        null,
    );
    const onDispatch = vi.fn();
    const mellomlagreSøknadOgNaviger = vi.fn().mockResolvedValue(undefined);
    const resultat = render(
        <QueryClientProvider client={client}>
            <IntlProvider
                locale="nb"
                messagesGroupedByLocale={{ nb: { ...messages, ...formHookMessages.nb, ...uiMessages.nb } }}
            >
                <FpDataContext
                    onDispatch={onDispatch}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: ForFar.args.søkersituasjon,
                        [ContextDataType.OM_BARNET]: ForFar.args.barn,
                        ...initialState,
                    }}
                >
                    {children}
                    <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
                        <AnnenForelderSteg
                            søkerInfo={ForFar.args.søkerInfo!}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={vi.fn()}
                        />
                    </MemoryRouter>
                </FpDataContext>
            </IntlProvider>
        </QueryClientProvider>,
    );
    return { ...resultat, skjema: within(resultat.container), onDispatch, mellomlagreSøknadOgNaviger };
};

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

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei, jeg har aleneomsorg'));

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

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]!);

        expect(
            screen.getByText(
                'Har den andre forelderen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]!);

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

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]!);

        expect(
            screen.getByText(
                'Har den andre forelderen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        expect(
            screen.getByText(
                'Har den andre forelderen rett til pengestøtte i et annet EØS-land som tilsvarer foreldrepenger i Norge?',
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]!);

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

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        await userEvent.click(screen.getAllByText('Nei')[1]!);

        expect(
            screen.getByText('Du må si ifra til den andre forelderen om søknaden før du kan gå videre.'),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Du må si ifra til den andre forelderen om søknaden før du kan gå videre.'),
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

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(screen.getByText('Har du orientert den andre forelderen om søknaden din?')).toBeInTheDocument();
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

        expect(await screen.findAllByText('Den andre forelderen')).toHaveLength(2);

        await userEvent.click(screen.getByText('Jeg kan ikke oppgi den andre forelderen'));

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

        expect(await screen.findAllByText('Den andre forelderen')).toHaveLength(2);

        const fornavnInput = screen.getByLabelText('Fornavnet til den andre forelderen');
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavnet til den andre forelderen');
        await userEvent.type(etternavnInput, 'Utvikler');

        const fødselsnrInput = screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen');
        await userEvent.type(fødselsnrInput, '05057923424');

        await userEvent.click(screen.getByText('Fødselsnummeret er ikke fra Norge'));

        const hvorBorSelect = screen.getByLabelText('Hvor bor den andre forelderen?');
        await userEvent.selectOptions(hvorBorSelect, 'Oman');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei, jeg har aleneomsorg'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1);

        expect(gåTilNesteSide).toHaveBeenCalledTimes(2);
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                bostedsland: 'OMN',
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

        await userEvent.click(screen.getByText('Nei, jeg har aleneomsorg'));

        const datoAleneInput = screen.getByLabelText('Dato du ble alene om omsorgen');
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

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]!);

        expect(
            screen.getByText(
                'Har den andre forelderen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        expect(
            screen.getByText(
                'Har den andre forelderen rett til pengestøtte i et annet EØS-land som tilsvarer foreldrepenger i Norge?',
                {
                    exact: false,
                },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]!);

        await userEvent.click(screen.getAllByText('Nei')[2]!);

        expect(screen.getByText('Mottar den andre forelderen uføretrygd?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[3]!);

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

        expect(await screen.findAllByText('Den andre forelderen')).toHaveLength(2);

        const fornavnInput = screen.getByLabelText('Fornavnet til den andre forelderen');
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = screen.getByLabelText('Etternavnet til den andre forelderen');
        await userEvent.type(etternavnInput, 'Utvikler');

        const fødselsnrInput = screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen');
        //Endrer fnr på annen forelder til en kvinnelig fnr:
        await userEvent.type(fødselsnrInput, '05057923824');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(screen.queryByText('Her kan far erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();
    });

    it('skal ikke spørre om annenpart har rett hvis annenpart har vedtak', async () => {
        await FarFødtBarnMorHarVedtak.run();

        expect(await screen.findAllByText('Den andre forelderen')).toHaveLength(2);
        await waitFor(() => {
            expect(
                screen.queryByText('Har den andre forelderen rett til foreldrepenger i Norge?', { exact: false }),
            ).not.toBeInTheDocument();
        });
    });
    it('skal spørre om annenpart har rett hvis annenpart har avslått vedtak', async () => {
        await FarFødtBarnMorHarAvslåttVedtak.run();

        expect(await screen.findAllByText('Den andre forelderen')).toHaveLength(2);
        expect(
            await screen.findByText('Har den andre forelderen rett til foreldrepenger i Norge?', { exact: false }),
        ).toBeInTheDocument();
    });

    it.each([
        { erMorUfør: true, gjenbruk: true },
        { erMorUfør: false, gjenbruk: true },
        { erMorUfør: true, gjenbruk: false },
        { erMorUfør: false, gjenbruk: false },
    ])('avgrenser endret uføretrygd til gjenbruksflyten: %j', async ({ erMorUfør, gjenbruk }) => {
        const { skjema, onDispatch, mellomlagreSøknadOgNaviger } = renderForFar({
            [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: gjenbruk ? saker.foreldrepenger[0]!.saksnummer : undefined,
            [ContextDataType.ANNEN_FORELDER]: {
                kanIkkeOppgis: false,
                fnr: '12038517080',
                fornavn: 'TALENTFULL',
                etternavn: 'MYGG',
                erAleneOmOmsorg: false,
                harRettPåForeldrepengerINorge: false,
                harRettPåForeldrepengerIEØS: false,
                harOppholdtSegIEØS: false,
            },
        });
        const uføretrygd = skjema.getByRole('radiogroup', { name: 'Mottar den andre forelderen uføretrygd?' });
        await userEvent.click(within(uføretrygd).getByRole('radio', { name: erMorUfør ? 'Ja' : 'Nei' }));
        await userEvent.click(skjema.getByText('Neste steg'));
        await waitFor(() => expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1));
        const reset = { type: 'update', key: ContextDataType.UTTAKSPLAN, data: undefined };
        const resetActions = onDispatch.mock.calls.filter(([action]) => action.key === ContextDataType.UTTAKSPLAN);
        expect(resetActions).toEqual(erMorUfør && gjenbruk ? [[reset]] : []);
        expect(onDispatch).toHaveBeenCalledWith({
            type: 'update',
            key: ContextDataType.APP_ROUTE,
            data: SøknadRoutes.PERIODE_MED_FORELDREPENGER,
        });
    });

    it.each([true, false])('avgrenser endret dato for aleneomsorg til gjenbruksflyten: %s', async (gjenbruk) => {
        const { skjema, onDispatch, mellomlagreSøknadOgNaviger } = renderForFar({
            [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: gjenbruk ? saker.foreldrepenger[0]!.saksnummer : undefined,
            [ContextDataType.ANNEN_FORELDER]: {
                kanIkkeOppgis: false,
                fnr: '12038517080',
                fornavn: 'TALENTFULL',
                etternavn: 'MYGG',
                erAleneOmOmsorg: true,
                harRettPåForeldrepengerIEØS: false,
                datoForAleneomsorg: '2021-03-15',
            },
        });
        const dato = skjema.getByRole('textbox');
        await userEvent.clear(dato);
        await userEvent.type(dato, '22.03.2021');
        await userEvent.tab();
        await userEvent.click(skjema.getByText('Neste steg'));
        await waitFor(() => expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1));
        const resetActions = onDispatch.mock.calls.filter(([action]) => action.key === ContextDataType.UTTAKSPLAN);
        expect(resetActions).toEqual(
            gjenbruk ? [[{ type: 'update', key: ContextDataType.UTTAKSPLAN, data: undefined }]] : [],
        );
    });

    it.each([true, false])(
        'beholder gjenbrukt plan ved første datoinnfylling bare når aleneomsorg er uendret: %s',
        async (erAleneOmOmsorg) => {
            const saksnummer = saker.foreldrepenger[0]!.saksnummer;
            const plan: UttakPeriodeDto_fpoversikt[] = [
                {
                    fom: '2021-03-15',
                    tom: '2021-03-26',
                    søker: { forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER', flerbarnsdager: false },
                },
            ];
            const snapshot = { saksnummer, perioder: plan };
            const annenForelder: AnnenForelder = {
                kanIkkeOppgis: false,
                fnr: '12038517080',
                fornavn: 'TALENTFULL',
                etternavn: 'MYGG',
                erAleneOmOmsorg,
                harRettPåForeldrepengerIEØS: false,
            };
            let uttaksplan;
            let opprinneligUttaksplan;
            let lagretAnnenForelder;
            const LesTilstand = () => {
                uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);
                opprinneligUttaksplan = useContextGetData(ContextDataType.OPPRINNELIG_UTTAKSPLAN);
                lagretAnnenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);
                return null;
            };
            const { container, mellomlagreSøknadOgNaviger } = renderForFar(
                {
                    [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: saksnummer,
                    [ContextDataType.UTTAKSPLAN]: plan,
                    [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: snapshot,
                    [ContextDataType.ANNEN_FORELDER]: annenForelder,
                },
                <LesTilstand />,
            );

            const skjema = within(container);
            await userEvent.click(skjema.getByText('Nei, jeg har aleneomsorg'));
            const dato = skjema.getByRole('textbox');
            await userEvent.type(dato, '22.03.2021');
            await userEvent.tab();
            await userEvent.click(skjema.getByText('Neste steg'));

            await waitFor(() => expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(1));
            expect(lagretAnnenForelder).toMatchObject({ erAleneOmOmsorg: true, datoForAleneomsorg: '2021-03-22' });
            expect(uttaksplan).toEqual(erAleneOmOmsorg ? plan : undefined);
            expect(opprinneligUttaksplan).toEqual(erAleneOmOmsorg ? snapshot : undefined);

            await userEvent.clear(dato);
            await userEvent.type(dato, '23.03.2021');
            await userEvent.tab();
            await userEvent.click(skjema.getByText('Neste steg'));

            await waitFor(() => expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledTimes(2));
            expect(lagretAnnenForelder).toMatchObject({ datoForAleneomsorg: '2021-03-23' });
            expect(uttaksplan).toBeUndefined();
            expect(opprinneligUttaksplan).toBeUndefined();
        },
    );
});
