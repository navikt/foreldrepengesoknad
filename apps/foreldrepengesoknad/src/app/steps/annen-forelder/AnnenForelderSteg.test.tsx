import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import { ContextDataType } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import * as stories from './AnnenForelderSteg.stories';

const {
    AnnenForelderFraOppgittBarn,
    SkalOppgiPersonalia,
    ForFar,
    MorUfødtBarn,
    MedmorUfødtBarn,
    FarUfødtBarn,
    FarGiftUfødtBarn,
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

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei, jeg har aleneomsorg'));

        expect(
            screen.getByText(
                'Selv om du har aleneomsorg kan den andre forelderen ha foreldrepenger hvis dere avtaler dette mellom dere. Da kan hen søke om å bruke ukene med foreldrepenger som du ikke bruker.',
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
            data: SøknadRoutes.OM_BARNET,
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
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(
            screen.getByText(
                'Har den andre forelderen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]);

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
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(
            screen.getByText(
                'Har den andre forelderen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        expect(
            screen.getByText(
                'Har den andre forelderen arbeidet eller mottatt pengestøtte i et EØS-land i 6 eller mer måneder før barnet blir født?',
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]);

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
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        await userEvent.click(screen.getAllByText('Nei')[1]);

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
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Har du orientert den andre forelderen om søknaden din?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

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

        expect(await screen.findByText('Fornavn og etternavn på den andre forelderen')).toBeInTheDocument();

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

        expect(await screen.findByText('Fornavn og etternavn på den andre forelderen')).toBeInTheDocument();

        const textInputs = screen.getAllByRole('textbox');
        const fornavnInput = textInputs[0];
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = textInputs[1];
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
                bostedsland: 'OM',
                erAleneOmOmsorg: true,
                etternavn: 'Utvikler',
                fnr: '05057923424',
                fornavn: 'Espen',
                harRettPåForeldrepengerIEØS: false,
                kanIkkeOppgis: false,
                utenlandskFnr: true,
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

        expect(gåTilNesteSide).toHaveBeenCalledTimes(3);
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
            data: true,
            key: ContextDataType.MANGLER_DOKUMENTASJON,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
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
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(
            screen.getByText(
                'Har den andre forelderen oppholdt seg fast i et annet EØS-land enn Norge ett år før barnet ble født?',
                { exact: false },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        expect(
            screen.getByText(
                'Har den andre forelderen arbeidet eller mottatt pengestøtte i et EØS-land i 6 eller mer måneder før barnet blir født?',
                {
                    exact: false,
                },
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]);

        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Mottar den andre forelderen uføretrygd?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[3]);

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

    it('skal vise infoboks om farskapsportal når mor søker på termin, annen forelder er far og har rett i Norge', async () => {
        const screen = render(<MorUfødtBarn />);

        expect(await screen.findByText('Fornavn og etternavn på den andre forelderen')).toBeInTheDocument();

        const textInputs = screen.getAllByRole('textbox');
        const fornavnInput = textInputs[0];
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = textInputs[1];
        await userEvent.type(etternavnInput, 'Utvikler');

        const fødselsnrInput = screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen');
        await userEvent.type(fødselsnrInput, '05057923524');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Her kan far erklære farskap digitalt', { exact: false })).toBeInTheDocument();
    });

    it('skal ikke vise infoboks om farskapsportal når mor søker på termin, annen forelder er en medmor og har rett i Norge', async () => {
        render(<MorUfødtBarn />);

        expect(await screen.findByText('Fornavn og etternavn på den andre forelderen')).toBeInTheDocument();

        const textInputs = screen.getAllByRole('textbox');
        const fornavnInput = textInputs[0];
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = textInputs[1];
        await userEvent.type(etternavnInput, 'Utvikler');

        const fødselsnrInput = screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen');
        //Endrer fnr på annen forelder til en kvinnelig fnr:
        await userEvent.type(fødselsnrInput, '05057923824');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.queryByText('Her kan far erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();
    });

    it('skal vise infoboks om farskapsportal når mor søker på termin, annen forelder har utenlandsk fnr og har rett i Norge', async () => {
        render(<MorUfødtBarn />);

        expect(await screen.findByText('Fornavn og etternavn på den andre forelderen')).toBeInTheDocument();

        const textInputs = screen.getAllByRole('textbox');
        const fornavnInput = textInputs[0];
        await userEvent.type(fornavnInput, 'Espen');
        const etternavnInput = textInputs[1];
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Fødselsnummer eller D-nummer til den andre forelderen')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen');
        await userEvent.type(fødselsnrInput, '0000000000000000');

        await userEvent.click(screen.getByText('Fødselsnummeret er ikke fra Norge'));

        const hvorBorSelect = screen.getByLabelText('Hvor bor den andre forelderen?');
        await userEvent.selectOptions(hvorBorSelect, 'Oman');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Her kan far erklære farskap digitalt', { exact: false })).toBeInTheDocument();
    });

    it('skal vise infoboks om farskapsportal når far søker på termin, ikke er gift og uansett om mor har rett til foreldrepenger', async () => {
        render(<FarUfødtBarn />);

        expect(await screen.findByText('Fornavn og etternavn på den andre forelderen')).toBeInTheDocument();

        const textInputs = screen.getAllByRole('textbox');
        const fornavnInput = textInputs[0];
        await userEvent.type(fornavnInput, 'Mor');
        const etternavnInput = textInputs[1];
        await userEvent.type(etternavnInput, 'Utvikler');

        expect(screen.getByText('Fødselsnummer eller D-nummer til den andre forelderen')).toBeInTheDocument();

        const fødselsnrInput = screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen');
        await userEvent.type(fødselsnrInput, '05057923424');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(screen.getByText('Her kan du erklære farskap digitalt', { exact: false })).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Her kan du erklære farskap digitalt', { exact: false })).toBeInTheDocument();
    });

    it('skal ikke vise infoboks om farskapsportal når medmor søker', async () => {
        render(<MedmorUfødtBarn />);

        expect(await screen.findByText('Fornavn og etternavn på den andre forelderen')).toBeInTheDocument();

        const textInputs = screen.getAllByRole('textbox');
        const fornavnInput = textInputs[0];
        await userEvent.type(fornavnInput, 'Mor');
        const etternavnInput = textInputs[1];
        await userEvent.type(etternavnInput, 'Utvikler');

        const fødselsnrInput = screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen');
        await userEvent.type(fødselsnrInput, '05057923424');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]);

        expect(screen.queryByText('Her kan du erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.queryByText('Her kan du erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();
    });

    it('skal ikke vise infoboks om farskapsportal når far er gift', async () => {
        render(<FarGiftUfødtBarn />);

        expect(await screen.findByText('Fornavn og etternavn på den andre forelderen')).toBeInTheDocument();

        const textInputs = screen.getAllByRole('textbox');
        const fornavnInput = textInputs[0];
        await userEvent.type(fornavnInput, 'Mor');
        const etternavnInput = textInputs[1];
        await userEvent.type(etternavnInput, 'Utvikler');

        const fødselsnrInput = screen.getByLabelText('Fødselsnummer eller D-nummer til den andre forelderen');
        await userEvent.type(fødselsnrInput, '05057923424');

        expect(screen.getByText('Er dere sammen om omsorgen for barnet?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]);

        expect(screen.getByText('Har den andre forelderen rett til foreldrepenger i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.queryByText('Her kan du erklære farskap digitalt', { exact: false })).not.toBeInTheDocument();
    });
});
