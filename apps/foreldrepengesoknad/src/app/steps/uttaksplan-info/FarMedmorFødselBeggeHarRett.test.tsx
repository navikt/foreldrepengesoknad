import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './FarMedmorFodselBeggeHarRett.stories';
import dayjs from 'dayjs';
import MockDate from 'mockdate';

const {
    FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB,
    FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB,
    FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin,
    FarMedmorFødselBeggeHarRettFødselFør1Okt2021,
    FarMedmorFødselBeggeHarRettTvillinger,
} = composeStories(stories);

describe('<UttaksplanInfo_FarMedmorFødselBeggeHarRett>', () => {
    it.skip('Siden WLB ikke gjelder, skal spørre om mors siste dag med foreldrepenger, og vise riktig fordeling for dekningsgrad 100%.', async () => {
        render(<FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB />);
        expect(await screen.findByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Hannes del')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Din del')).toBeInTheDocument();
        expect(await screen.findByText('22 uker til Hanne')).toBeInTheDocument();
        expect(screen.getByText('3 uker kan kun brukes før fødsel', { exact: false })).toBeInTheDocument();
        expect(
            screen.getByText('6 uker er satt av til rett etter fødsel. Disse kan ikke brukes senere.', {
                exact: false,
            }),
        ).toBeInTheDocument();
        expect(screen.getByText('13 uker kan brukes når som helst før barnet er 3 år.')).toBeInTheDocument();

        expect(screen.getByText('18 uker kan deles, fellesperiode')).toBeInTheDocument();
        expect(
            screen.getByText(
                '18 uker kan deles slik man ønsker mellom foreldrene, og brukes når som helst innen barnet fyller 3 år.',
                {
                    exact: false,
                },
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('19 uker til deg')).toBeInTheDocument();
        expect(
            screen.getByText('19 uker kan brukes når som helst før barnet fyller 3 år.', { exact: false }),
        ).toBeInTheDocument();
        expect(screen.queryByText('2 av disse ukene.', { exact: false })).not.toBeInTheDocument();

        expect(await screen.findByText('Når er Hanne siste dag med foreldrepenger?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        const sisteDagInput = screen.getByLabelText('Når er Hanne siste dag med foreldrepenger?');
        await userEvent.type(sisteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();
        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInput = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();
        expect(screen.getByText('Hvor mye fellesperiode skal du ha?')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it.skip('Siden WLB gjelder, skal spørre om din første dag med foreldrepenger og vise riktig fordeling for dekningsgrad 100% ', async () => {
        MockDate.set(new Date('2022-08-01'));
        render(<FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB />);
        expect(await screen.findByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Hannes del')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Din del')).toBeInTheDocument();
        expect(screen.getByText('22 uker til Hanne')).toBeInTheDocument();
        expect(screen.getByText('13 uker kan brukes når som helst før barnet fyller 3 år.')).toBeInTheDocument();
        expect(screen.getByText('18 uker kan deles, fellesperiode')).toBeInTheDocument();
        expect(
            screen.getByText(
                '18 uker kan deles slik man ønsker mellom foreldrene, og brukes når som helst innen barnet fyller 3 år. ',
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('19 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('2 av disse ukene', { exact: false })).toBeInTheDocument();

        expect(screen.queryByText('Når er Hanne siste dag med foreldrepenger?')).not.toBeInTheDocument();
        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInput = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hvor mye fellesperiode skal du ha?')).toBeInTheDocument();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        MockDate.reset();
    });

    it.skip('Skal vise riktig fordeling for dekningsgrad 80% og termin', async () => {
        MockDate.set(new Date('2022-08-02'));
        render(<FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin />);
        expect(await screen.findByText('Termin')).toBeInTheDocument();
        expect(screen.getByText('Hannes del')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Din del')).toBeInTheDocument();
        expect(screen.getByText('18 uker til Hanne')).toBeInTheDocument();
        expect(screen.getByText('16 uker kan deles, fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('15 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('2 av disse ukene', { exact: false })).toBeInTheDocument();
        expect(screen.queryByText('Når er Hanne siste dag med foreldrepenger?')).not.toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInputFarMedmor = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInputFarMedmor, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        MockDate.reset();
    });
    it.skip('Skal vise riktig fordelingstekst for barnet født før 1 okt 2021', async () => {
        render(<FarMedmorFødselBeggeHarRettFødselFør1Okt2021 />);
        expect(await screen.findByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Hannes del')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Din del')).toBeInTheDocument();
        expect(screen.getByText('22 uker til Hanne')).toBeInTheDocument();
        expect(
            screen.getByText('6 uker er satt av til rett etter fødsel. Disse kan ikke brukes senere.', {
                exact: false,
            }),
        ).toBeInTheDocument();
        expect(screen.getByText('13 uker må brukes sammenhengende.')).toBeInTheDocument();
        expect(screen.getByText('18 uker kan deles, fellesperiode')).toBeInTheDocument();
        expect(
            screen.getByText('18  kan deles slik man ønsker mellom foreldrene og må brukes sammenhengende.'),
        ).toBeInTheDocument();
        expect(screen.getByText('19 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('19 uker med foreldrepenger')).toBeInTheDocument();
        expect(screen.queryByText('2 av disse ukene')).not.toBeInTheDocument();
        expect(screen.queryByText('Når er Hanne siste dag med foreldrepenger?')).not.toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInputFarMedmor = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInputFarMedmor, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        MockDate.reset();
    });
    it.skip('Hvis flere barn, skal infoboks om flerbarnsuker vises', async () => {
        render(<FarMedmorFødselBeggeHarRettTvillinger />);
        expect(await screen.findByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Hannes del')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();
        expect(screen.getByText('Din del')).toBeInTheDocument();
        expect(screen.getByText('22 uker til Hanne')).toBeInTheDocument();
        expect(screen.getByText('6 uker er satt av til rett etter fødsel.', { exact: false })).toBeInTheDocument();
        expect(screen.getByText('13 uker må brukes sammenhengende.')).toBeInTheDocument();
        expect(screen.getByText('18 uker kan deles, fellesperiode')).toBeInTheDocument();
        expect(
            screen.getByText('18 kan deles slik man ønsker mellom foreldrene og må brukes sammenhengende.'),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Av ukene deres har dere 17 uker hvor dere kan ta foreldrepenger samtidig fordi dere har fått tvillinger. Disse ukene kalles flerbarnsuker.',
                { exact: false },
            ),
        ).toBeInTheDocument();
        expect(screen.getByText('19 uker til deg')).toBeInTheDocument();
        expect(screen.getByText('19 uker kan brukes når som helst før barna fyller 3 år.')).toBeInTheDocument();
        expect(screen.queryByText('Når er Hanne siste dag med foreldrepenger?')).not.toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();
        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();

        const førsteDagInputFarMedmor = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInputFarMedmor, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        MockDate.reset();
    });
});
