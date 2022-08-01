import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/uttaksplan-info/far-medmor-fødsel-begge-har-rett/FarMedmorFødselBeggeHarRett.stories';
import dayjs from 'dayjs';
import MockDate from 'mockdate';

const { UttaksplanInfoFarMedmorFødselBeggeHarRett, UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB } =
    composeStories(stories);

const GÅ_VIDERE_KNAPP = 'Gå videre';

describe('<UttaksplanInfo_FarMedmorFødselBeggeHarRett>', () => {
    it('skal ved delt uttak der far søker velge at mor har foreldrepenger med dekningsgrad 80', async () => {
        const utils = render(<UttaksplanInfoFarMedmorFødselBeggeHarRett />);
        expect(
            await screen.findByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i dfgs søknad.'
            )
        ).toBeInTheDocument();

        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));
        expect(await screen.findByText('3 + 19 uker')).toBeInTheDocument();

        expect(screen.getByText('18 uker')).toBeInTheDocument();
        expect(screen.getByText('19 uker')).toBeInTheDocument();

        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Når er dfg siste dag med foreldrepenger?')).toBeInTheDocument();

        const sisteDagInput = utils.getByLabelText('Når er dfg siste dag med foreldrepenger?');
        userEvent.type(sisteDagInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(sisteDagInput);
        expect(await screen.findByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInput = utils.getByLabelText('Når er din første dag med foreldrepenger?');
        userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(førsteDagInput);
        expect(await screen.findByText('Hvor mye fellesperiode skal du ha?')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
    });

    it('skal ved delt uttak der far søker velge at mor har foreldrepenger med dekningsgrad 100, og siden WLB ikke gjeder, spørre om mors siste dag ', async () => {
        MockDate.set(new Date('2022-08-01'));
        const utils = render(<UttaksplanInfoFarMedmorFødselBeggeHarRett />);
        expect(
            await screen.findByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i dfgs søknad.'
            )
        ).toBeInTheDocument();

        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));
        expect(await screen.findByText('3 + 15 uker')).toBeInTheDocument();

        expect(screen.getByText('16 uker')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Når er dfg siste dag med foreldrepenger?')).toBeInTheDocument();

        const sisteDagInput = utils.getByLabelText('Når er dfg siste dag med foreldrepenger?');
        userEvent.type(sisteDagInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(sisteDagInput);
        expect(await screen.findByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInput = utils.getByLabelText('Når er din første dag med foreldrepenger?');
        userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(førsteDagInput);
        expect(await screen.findByText('Hvor mye fellesperiode skal du ha?')).toBeInTheDocument();

        expect(screen.getByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();
        MockDate.reset();
    });

    it('hvis WLB gjelder, skal ikke spørre far om mors siste dag', async () => {
        MockDate.set(new Date('2022-08-02'));
        const utils = render(<UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB />);
        expect(
            await screen.findByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i dfgs søknad.'
            )
        ).toBeInTheDocument();

        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();
        expect(await screen.findByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));
        expect(await screen.findByText('3 + 15 uker')).toBeInTheDocument();

        expect(screen.getByText('16 uker')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(screen.queryByText(GÅ_VIDERE_KNAPP)).not.toBeInTheDocument();

        expect(screen.queryByText('Når er dfg siste dag med foreldrepenger?')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Du skal legge inn siste dagen dfg får utbetalt foreldrepenger fra NAV.', {
                exact: false,
            })
        ).not.toBeInTheDocument();
        expect(await screen.findByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInputFarMedmor = utils.getByLabelText('Når er din første dag med foreldrepenger?');
        userEvent.type(førsteDagInputFarMedmor, dayjs().format('DD.MM.YYYY'));
        fireEvent.blur(førsteDagInputFarMedmor);
        expect(await screen.findByText(GÅ_VIDERE_KNAPP)).toBeInTheDocument();

        MockDate.reset();
    });
});
