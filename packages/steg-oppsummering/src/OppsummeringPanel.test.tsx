import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './OppsummeringPanel.stories';

import messages from './intl/messages/nb_NO.json';

const { HarBoddIUtlandetOgFødt, HarIkkeBoddIUtlandetOgIkkeFødt, ArbeidsforholdOgInntektOppsummering } =
    composeStories(stories);

describe('<OppsummeringSteg>', () => {
    it('skal ha hatt utenlandsopphold for ES og så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<HarBoddIUtlandetOgFødt sendSøknad={sendSøknad} />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 2')).toBeInTheDocument();

        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.tittel'])).toBeInTheDocument();
        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel'])).toBeInTheDocument();
        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.utlandet'])).toBeInTheDocument();
        expect(screen.getByText('Hvilket land har du bodd i de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Tyskland')).toBeInTheDocument();
        expect(screen.getByText('Fra 06.06.2023 til 10.10.2023')).toBeInTheDocument();

        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.tittel'])).toBeInTheDocument();
        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.utlandet'])).toBeInTheDocument();
        expect(screen.getByText('Hvilket land skal du bo i de neste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Sverige')).toBeInTheDocument();
        expect(screen.getByText('Fra 10.10.2022 til 05.05.2023')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknaden'));

        expect(screen.getByText(messages['OppsummeringPanel.Validering.BekrefteOpplysninger'])).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(messages['OppsummeringPanel.SamtykkeEs'],
            ),
        );

        await userEvent.click(screen.getByText('Send søknaden'));

        expect(sendSøknad).toHaveBeenCalledTimes(1);
        expect(sendSøknad).toHaveBeenNthCalledWith(1);
    });

    it('skal ikke ha hatt utenlandsopphold for ES', async () => {
        render(<HarIkkeBoddIUtlandetOgIkkeFødt />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Steg 2 av 2')).toBeInTheDocument();

        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.tittel'])).toBeInTheDocument();
        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.tittel'])).toBeInTheDocument();
        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.HarBoddSisteTolv.iNorge'])).toBeInTheDocument();
        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.tittel'])).toBeInTheDocument();
        expect(screen.getByText(messages['BoIUtlandetOppsummeringspunkt.SkalBoNesteTolv.iNorge'])).toBeInTheDocument();
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<HarBoddIUtlandetOgFødt onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Skal bo i utlandet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'SKAL_BO_I_UTLANDET_PATH');
    });

    it('skal vise informasjon for selvstendig næringsdrivende og frilans', async () => {
        render(<ArbeidsforholdOgInntektOppsummering />);

        expect(await screen.findByText(messages['ArbeidsforholdOppsummering.Arbeid'])).toBeInTheDocument();
        expect(screen.getByText(messages['ArbeidsforholdOppsummering.IngenRegistrerteArbeidsforhold'])).toBeInTheDocument();
        expect(screen.getByText(messages['ArbeidsforholdOppsummering.Næring'])).toBeInTheDocument();
        expect(screen.getByText(messages['ArbeidsforholdOppsummering.Frilans'])).toBeInTheDocument();
    });
});
