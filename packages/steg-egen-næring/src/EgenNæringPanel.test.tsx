import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './EgenNæringPanel.stories';

import messages from './intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<Arbeid som selvstendig næringsdrivende>', () => {
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['egenNæring.næringstype'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryAllByText(messages['valideringsfeil.egenNæringType.påkrevd'])[0]).toBeInTheDocument();
        expect(screen.queryAllByText(messages['valideringsfeil.egenNæringNavn.påkrevd'])[0]).toBeInTheDocument();
        expect(screen.queryAllByText(messages['valideringsfeil.egenNæringRegistrertINorge.påkrevd'])[0]).toBeInTheDocument();
        expect(screen.queryAllByText(messages['valideringsfeil.fraOgMedDato.påkrevd'])[0]).toBeInTheDocument();
        expect(screen.queryAllByText(messages['valideringsfeil.egenNæringPågående.påkrevd'])[0]).toBeInTheDocument();
        expect(screen.queryAllByText(messages['valideringsfeil.egenNæringInntekt.påkrevd'])[0]).toBeInTheDocument();
        expect(
            screen.queryAllByText(messages['valideringsfeil.egenNæringBlittYrkesaktivDe3SisteÅrene.påkrevd'])[0],
        ).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        const saveOnNext = vi.fn();

        render(<Default saveOnNext={saveOnNext} />);

        expect(await screen.findByText(messages['egenNæring.næringstype'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['egenNæring.næringstype.jordbrukSkogbruk']));

        const virksomhetsnavnInput = screen.getByLabelText(messages['egenNæring.navnPåNæring']);
        await userEvent.type(virksomhetsnavnInput, 'Virksomhetsnavn AS');

        expect(screen.getByText(messages['egenNæring.erNæringenRegistrertINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        const orgnummerInput = screen.getByLabelText(messages['egenNæring.orgnr']);
        await userEvent.type(orgnummerInput, '997519485');

        const startdatoInput = screen.getByLabelText(messages['egenNæring.næring.fom']);
        await userEvent.type(startdatoInput, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText(messages['egenNæring.næring.pågående'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const næringsresultatInput = screen.getByLabelText(messages['egenNæring.næringsinntekt'],
        );
        await userEvent.type(næringsresultatInput, '1000');

        expect(
            screen.getByText(messages['egenNæring.blittYrkesaktivSiste3År']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[2]!);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText(messages['valideringsfeil.egenNæringOrgnr.påkrevd'])).not.toBeInTheDocument();
        expect(screen.queryByText(messages['valideringsfeil.egenNæringInntekt.påkrevd'])).not.toBeInTheDocument();

        expect(saveOnNext).toHaveBeenCalledTimes(1);
        expect(saveOnNext).toHaveBeenNthCalledWith(1, {
            fom: '2023-04-30',
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
            navnPåNæringen: 'Virksomhetsnavn AS',
            næringsinntekt: '1000',
            næringstype: 'JORDBRUK_SKOGBRUK',
            organisasjonsnummer: '997519485',
            registrertINorge: true,
        });
    });

    it('skal ikke vise feilmelding hvis fisker ikke fyller ut navn eller orgnummer', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['egenNæring.næringstype'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['egenNæring.næringstype.fiske']));

        expect(screen.getByText(messages['egenNæring.erNæringenRegistrertINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        const startdatoInput = screen.getByLabelText(messages['egenNæring.næring.fom']);
        await userEvent.type(startdatoInput, dayjs('2023-04-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText(messages['egenNæring.næring.pågående'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(
            screen.getByText(messages['egenNæring.næringsinntekt']),
        ).toBeInTheDocument();
        const næringsresultatInput = screen.getByLabelText(messages['egenNæring.næringsinntekt'],
        );
        await userEvent.type(næringsresultatInput, '1000');
        await userEvent.tab();

        expect(
            screen.getByText(messages['egenNæring.blittYrkesaktivSiste3År']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[0]!);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText(messages['valideringsfeil.egenNæringOrgnr.påkrevd'])).not.toBeInTheDocument();
        expect(screen.queryByText(messages['valideringsfeil.egenNæringInntekt.påkrevd'])).not.toBeInTheDocument();
    });

    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['egenNæring.næring.fom'])).toBeInTheDocument();
        const startdatoInput = screen.getByLabelText(messages['egenNæring.næring.fom']);
        await userEvent.type(startdatoInput, 'ikemfke');
        await userEvent.tab();

        expect(screen.getByText(messages['egenNæring.næring.pågående'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[1]!);

        expect(screen.getByText(messages['egenNæring.næring.tom'])).toBeInTheDocument();
        const sluttdatoInput = screen.getByLabelText(messages['egenNæring.næring.tom']);
        await userEvent.type(sluttdatoInput, 'sjnkf');
        await userEvent.tab();

        expect(
            screen.getByText(messages['egenNæring.blittYrkesaktivSiste3År']),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        expect(screen.getByText(messages['egenNæring.yrkesaktivDato'])).toBeInTheDocument();
        const yrkesaktidDatoInput = screen.getByLabelText(messages['egenNæring.yrkesaktivDato']);
        await userEvent.type(yrkesaktidDatoInput, 'sjnkf');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.fraOgMedDato.gyldigDato'])[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText(messages['valideringsfeil.tilOgMedDato.gyldigDato'])[0],
        ).toBeInTheDocument();
    });

    it('skal vise feilmelding når land ikke er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['egenNæring.erNæringenRegistrertINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['nei'])[0]!);

        expect(screen.getByText(messages['egenNæring.registrertILand'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryAllByText(messages['valideringsfeil.egenNæringLand.påkrevd'])[0]).toBeInTheDocument();
    });

    it('skal vise feilmelding ved desimaltall i næringsinntekt etter varig endring', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['egenNæring.næringstype'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['egenNæring.næringstype.jordbrukSkogbruk']));

        const virksomhetsnavnInput = screen.getByLabelText(messages['egenNæring.navnPåNæring']);
        await userEvent.type(virksomhetsnavnInput, 'Gården AS');

        await userEvent.click(screen.getAllByText('Ja')[0]!);

        const orgnummerInput = screen.getByLabelText(messages['egenNæring.orgnr']);
        await userEvent.type(orgnummerInput, '997519485');

        const startdatoInput = screen.getByLabelText(messages['egenNæring.næring.fom']);
        await userEvent.type(startdatoInput, dayjs().subtract(5, 'year').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(
            screen.getByText(messages['egenNæring.egenNæringHattVarigEndringDeSiste4Årene'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        const inntektInput = screen.getByLabelText(messages['egenNæring.egenNæringVarigEndringInntektEtterEndring']);
        await userEvent.type(inntektInput, '123.45');

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.queryAllByText(messages['valideringsfeil.varigEndringInntekt.ugyldigFormat'])[0],
        ).toBeInTheDocument();
    });

    it('skal avslutte søknad', async () => {
        const onAvsluttOgSlett = vi.fn();

        render(<Default onFortsettSenere={vi.fn()} onAvsluttOgSlett={onAvsluttOgSlett} />);

        expect(await screen.findByText(messages['egenNæring.erNæringenRegistrertINorge'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Slett søknaden')[0]!);
        await userEvent.click(screen.getAllByText('Slett søknaden')[1]!);

        expect(onAvsluttOgSlett).toHaveBeenCalledTimes(1);
    });

    it('skal gå til et tidligere steg', async () => {
        const onStepChange = vi.fn();

        render(<Default onStepChange={onStepChange} />);

        await userEvent.click(screen.getByText('Barnet'));

        expect(onStepChange).toHaveBeenCalledTimes(1);
        expect(onStepChange).toHaveBeenNthCalledWith(1, 'BARNET_PATH');
    });
});
