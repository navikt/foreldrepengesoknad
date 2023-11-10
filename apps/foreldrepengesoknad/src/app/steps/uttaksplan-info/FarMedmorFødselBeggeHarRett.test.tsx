import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './FarMedmorFodselBeggeHarRett.stories';
import dayjs from 'dayjs';
import MockDate from 'mockdate';

const { UttaksplanInfoFarMedmorFødselBeggeHarRett, UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB } =
    composeStories(stories);

describe('<UttaksplanInfo_FarMedmorFødselBeggeHarRett>', () => {
    it('skal ved delt uttak der far søker velge at mor har foreldrepenger med dekningsgrad 80', async () => {
        render(<UttaksplanInfoFarMedmorFødselBeggeHarRett />);

        expect(
            await screen.findByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i dfgs søknad.',
            ),
        ).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));
        expect(screen.getByText('3 + 19 uker')).toBeInTheDocument();

        expect(screen.getByText('18 uker')).toBeInTheDocument();
        expect(screen.getByText('19 uker')).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(await screen.findByText('Når er dfg siste dag med foreldrepenger?')).toBeInTheDocument();

        const sisteDagInput = screen.getByLabelText('Når er dfg siste dag med foreldrepenger?');
        await userEvent.type(sisteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();
        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInput = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();
        expect(screen.getByText('Hvor mye fellesperiode skal du ha?')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal ved delt uttak der far søker velge at mor har foreldrepenger med dekningsgrad 100, og siden WLB ikke gjeder, spørre om mors siste dag ', async () => {
        MockDate.set(new Date('2022-08-01'));

        render(<UttaksplanInfoFarMedmorFødselBeggeHarRett />);

        expect(
            await screen.findByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i dfgs søknad.',
            ),
        ).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));
        expect(screen.getByText('3 + 15 uker')).toBeInTheDocument();

        expect(screen.getByText('16 uker')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Når er dfg siste dag med foreldrepenger?')).toBeInTheDocument();

        const sisteDagInput = screen.getByLabelText('Når er dfg siste dag med foreldrepenger?');
        await userEvent.type(sisteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();
        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInput = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hvor mye fellesperiode skal du ha?')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        MockDate.reset();
    });

    it('hvis WLB gjelder, skal ikke spørre far om mors siste dag', async () => {
        MockDate.set(new Date('2022-08-02'));
        render(<UttaksplanInfoFarMedmorFødselBeggeHarRettFødselEtterWLB />);
        expect(
            await screen.findByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i dfgs søknad.',
            ),
        ).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));
        expect(screen.getByText('3 + 15 uker')).toBeInTheDocument();

        expect(screen.getByText('16 uker')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        expect(screen.queryByText('Når er dfg siste dag med foreldrepenger?')).not.toBeInTheDocument();
        expect(
            screen.queryByText('Du skal legge inn siste dagen dfg får utbetalt foreldrepenger fra NAV.', {
                exact: false,
            }),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInputFarMedmor = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInputFarMedmor, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        MockDate.reset();
    });
});
