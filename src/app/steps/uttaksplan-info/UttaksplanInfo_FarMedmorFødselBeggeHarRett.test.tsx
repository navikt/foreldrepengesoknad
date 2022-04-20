import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/steps/uttaksplan-info/far-medmor-fødsel-begge-har-rett/FarMedmorFødselBeggeHarRett.stories';
import dayjs from 'dayjs';

const { UttaksplanInfoFarMedmorFødselBeggeHarRett } = composeStories(stories);

const GÅ_VIDERE_KNAPP = 'Gå videre';

describe('<UttaksplanInfo_MorFarAdopsjon>', () => {
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

    it('skal ved delt uttak der far søker velge at mor har foreldrepenger med dekningsgrad 100', async () => {
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
    });
});
