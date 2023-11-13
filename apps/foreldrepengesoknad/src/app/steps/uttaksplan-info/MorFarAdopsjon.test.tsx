import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './MorFarAdopsjon.stories';
import dayjs from 'dayjs';

const { UttaksplanMedAleneomsorg, UttaksplanMedDeltUttakDerFarSøker, UttaksplanMedDeltUttakDerMorSøker } =
    composeStories(stories);

describe('<UttaksplanInfo_MorFarAdopsjon>', () => {
    // FIXME Noko tull med locale og datoar
    it.skip('skal fylle ut dekningsgrad med 80 prosent og velge omsorgovertakelsedato før en kan gå videre når en har aleneomsorg', async () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(screen.getByText('3 + 56 uker')).toBeInTheDocument();
        //FIXME (TOR) Denne teksten er feil. Gjeld fødsel
        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Omsorgsovertakelsen 15. mars 2021'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        expect(screen.queryByText('Velg dato')).not.toBeInTheDocument();
    });

    // FIXME Noko tull med locale og datoar
    it.skip('skal fylle ut dekningsgrad med 100 prosent og velge omsorgovertakelsedato før en kan gå videre når en har aleneomsorg', async () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));

        expect(screen.getByText('3 + 46 uker')).toBeInTheDocument();
        //FIXME (TOR) Denne teksten er feil. Gjeld fødsel
        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Omsorgsovertakelsen 15. mars 2021'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        expect(screen.queryByText('Velg dato')).not.toBeInTheDocument();
    });

    it('skal fylle ut dekningsgrad og velge annen dato før en kan gå videre når en har aleneomsorg', async () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(screen.getByText('3 + 56 uker')).toBeInTheDocument();
        //FIXME (TOR) Denne teksten er feil. Gjeld fødsel
        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Annen dato'));

        expect(screen.getByText('Velg dato')).toBeInTheDocument();
        const datoInput = screen.getByLabelText('Velg dato');
        await userEvent.type(datoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText('Starter du foreldrepengene senere enn omsorgsovertakelsen vil du miste dager.'),
        ).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal fylle ut dekningsgrad og velge annen dato før en kan gå videre når en har aleneomsorg', async () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(await screen.findByText('Hvor lang periode med foreldrepenger ønsker du?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(screen.getByText('3 + 56 uker')).toBeInTheDocument();
        //FIXME (TOR) Denne teksten er feil. Gjeld fødsel
        expect(
            screen.getByText(
                'Tar du ut mer enn 3 uker før termindato trekkes disse dagene av foreldrepenger du kan få etter fødsel',
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Annen dato'));

        expect(screen.getByText('Velg dato')).toBeInTheDocument();
        const datoInput = screen.getByLabelText('Velg dato');
        await userEvent.type(datoInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(
            screen.getByText('Starter du foreldrepengene senere enn omsorgsovertakelsen vil du miste dager.'),
        ).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal ved delt uttak der far søker velge at mor har foreldrepenger med dekningsgrad 80', async () => {
        render(<UttaksplanMedDeltUttakDerFarSøker />);

        expect(await screen.findByText('Har TALENTFULL foreldrepenger?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(
            screen.getByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i TALENTFULLs søknad.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(screen.getByText('3 + 19 uker')).toBeInTheDocument();
        expect(screen.getByText('18 uker')).toBeInTheDocument();
        expect(screen.getByText('19 uker')).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        expect(screen.getByText('Når er TALENTFULL MYGG siste dag med foreldrepenger?')).toBeInTheDocument();
        const sisteDagInput = screen.getByLabelText('Når er TALENTFULL MYGG siste dag med foreldrepenger?');
        await userEvent.type(sisteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();
        const førsteDagInput = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal ved delt uttak der far søker velge at mor har foreldrepenger med dekningsgrad 100', async () => {
        render(<UttaksplanMedDeltUttakDerFarSøker />);

        expect(await screen.findByText('Har TALENTFULL foreldrepenger?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(
            screen.getByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i TALENTFULLs søknad.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('49 uker med 100 prosent foreldrepenger'));

        expect(screen.getByText('3 + 15 uker')).toBeInTheDocument();
        expect(screen.getByText('16 uker')).toBeInTheDocument();
        expect(screen.getByText('15 uker')).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        expect(screen.getByText('Når er TALENTFULL MYGG siste dag med foreldrepenger?')).toBeInTheDocument();
        const sisteDagInput = screen.getByLabelText('Når er TALENTFULL MYGG siste dag med foreldrepenger?');
        await userEvent.type(sisteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();
        const førsteDagInput = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });

    it('skal ved delt uttak der far søker velge at mor ikke har foreldrepenger', async () => {
        render(<UttaksplanMedDeltUttakDerFarSøker />);

        expect(await screen.findByText('Har TALENTFULL foreldrepenger?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Hvor lang periode med foreldrepenger har dere valgt?')).toBeInTheDocument();
        expect(
            screen.queryByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i TALENTFULLs søknad.',
            ),
        ).not.toBeInTheDocument();
    });

    it('skal ved delt uttak der mor søker velge at far har foreldrepenger med dekningsgrad 80', async () => {
        render(<UttaksplanMedDeltUttakDerMorSøker />);

        expect(await screen.findByText('Har Espen foreldrepenger?')).toBeInTheDocument();
        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(
            screen.getByText(
                'Du må velge den samme lengden på perioden med foreldrepenger som dere valgte i Espens søknad.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('59 uker med 80 prosent foreldrepenger'));

        expect(screen.getByText('3 + 19 uker')).toBeInTheDocument();
        expect(screen.getByText('18 uker')).toBeInTheDocument();
        expect(screen.getByText('19 uker')).toBeInTheDocument();

        expect(screen.queryByText('Neste steg')).not.toBeInTheDocument();

        expect(screen.getByText('siste dag med foreldrepenger?', { exact: false })).toBeInTheDocument();
        const sisteDagInput = screen.getByLabelText('siste dag med foreldrepenger?', { exact: false });
        await userEvent.type(sisteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Når er din første dag med foreldrepenger?')).toBeInTheDocument();
        const førsteDagInput = screen.getByLabelText('Når er din første dag med foreldrepenger?');
        await userEvent.type(førsteDagInput, dayjs().format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
    });
});
