import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs from 'dayjs';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './TilretteleggingSteg.stories';

import messages from '../../intl/nb_NO.json';

const { ForArbeidsforhold } = composeStories(stories);

describe('<TilretteleggingSteg>', () => {
    const user = userEvent.setup();
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText(messages['Svangerskapspengesøknad.pagetitle'])).toBeInTheDocument();
        expect(
            screen.getByText(messages['tilrettelegging.tilrettelagtArbeidFom.label.en']),
        ).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.tilrettelagtArbeidFom.mangler'])[0]).toBeInTheDocument();
        expect(screen.getAllByText(messages['valideringsfeil.tilrettelagtArbeidType.mangler'])[0]).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreSøknadOgNaviger = vi.fn();

        render(
            <ForArbeidsforhold
                gåTilNesteSide={gåTilNesteSide}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            />,
        );
        expect(
            await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidFom.label.en']),
        ).toBeInTheDocument();

        const tilretteleggingsdatoInput = screen.getByLabelText(messages['tilrettelegging.tilrettelagtArbeidFom.label.en'],
        );
        await user.type(tilretteleggingsdatoInput, dayjs().format('DD.MM.YYYY'));
        await user.tab();

        expect(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.label.en'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));

        await user.click(screen.getByText(messages['tilrettelegging.tilretteleggingPeriodetype.variert']));

        await user.click(screen.getByText('Neste steg'));

        expect(screen.queryByText(messages['valideringsfeil.tilrettelagtArbeidFom.mangler'])).not.toBeInTheDocument();
        expect(screen.queryByText(messages['valideringsfeil.tilrettelagtArbeidType.mangler'])).not.toBeInTheDocument();

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                '990322244': {
                    behovForTilretteleggingFom: dayjs().format(ISO_DATE_FORMAT),
                    delvisTilretteleggingPeriodeType: 'VARIERTE_PERIODER',
                    type: 'delvis',
                },
            },
            key: ContextDataType.TILRETTELEGGINGER,
            type: 'update',
        });
        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: addTilretteleggingIdToRoute(SøknadRoute.PERIODER, '990322244'),
            key: ContextDataType.APP_ROUTE,
            type: 'update',
        });

        expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
    });

    it('validering av for sen tilrettelegging', async () => {
        render(<ForArbeidsforhold />);

        expect(
            await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidFom.label.en']),
        ).toBeInTheDocument();

        const tilretteleggingsdatoInput = screen.getByLabelText(messages['tilrettelegging.tilrettelagtArbeidFom.label.en'],
        );
        await user.type(tilretteleggingsdatoInput, dayjs().add(40, 'days').format('DD.MM.YYYY'));
        await user.tab();
        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.tilrettelagtArbeidFom.måVæreMerEnnTreUkerFørTermin'])[0],
        ).toBeInTheDocument();
    });

    it('redusert valgt', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();
        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getByText(messages['tilrettelegging.tilretteleggingPeriodetype.label']),
        ).toBeInTheDocument();
    });

    it('spørsmål om fra-dato vises når man har valgt at man ikke kan jobbe', async () => {
        render(<ForArbeidsforhold />);
        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.ingen'])).toBeInTheDocument();
        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.ingen']));

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getByText(messages['tilrettelegging.sammePeriodeFremTilTerminFom.label.ingen'])).toBeInTheDocument();
    });

    it('redusert valgt, ikke oppgitt stillingsprosent', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();
        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.tilretteleggingPeriodeType.mangler'],
            )[0],
        ).toBeInTheDocument();
    });

    it('spørsmål om stillingsprosent skal vises når redusert arbeidstid og samme stillingsprosent er valgt', async () => {
        render(<ForArbeidsforhold />);
        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));
        await user.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['tilrettelegging.stillingsprosent.label'])).toBeInTheDocument();
    });

    it('feilmelding ved ikke oppgitt stillingsprosent', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText(messages['tilrettelegging.stillingsprosent.label'])).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.stillingsprosent.required'])[0]).toBeInTheDocument();
    });
    it('feilmelding ved stillingsprosent i feil format', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText(messages['tilrettelegging.stillingsprosent.label'])).toBeInTheDocument();

        const stillingsprosentInput = screen.getByLabelText(messages['tilrettelegging.stillingsprosent.label']);
        await user.type(stillingsprosentInput, 'bla bla');
        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.stillingsprosent.måVæreEtTall'])[0]).toBeInTheDocument();
    });
    it('feilmelding ved ikke oppgitt redusert fra-dato', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText(messages['tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText(messages['valideringsfeil.sammePeriodeFremTilTerminFom.påkrevd.delvis'])[0]).toBeInTheDocument();
    });
    it('feilmelding ved ikke oppgitt redusert til-dato', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText(messages['tilrettelegging.enPeriodeMedTilretteleggingTomType.label.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.tomType.påkrevd.delvis.tilTermin'],
            )[0],
        ).toBeInTheDocument();
    });

    it('redusert frem til en dato valgt', async () => {
        render(<ForArbeidsforhold />);

        expect(await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));
        await user.click(screen.getByText('Ja'));
        expect(screen.getByText(messages['tilrettelegging.enPeriodeMedTilretteleggingTomType.label.delvis'])).toBeInTheDocument();
        await user.click(screen.getByText(messages['perioder.varierende.tomType.valgfriDato']));
        await user.click(screen.getByText('Neste steg'));

        expect(screen.getByText(messages['tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.delvis'])).toBeInTheDocument();
    });

    it('validering av dato på feil format', async () => {
        render(<ForArbeidsforhold />);

        expect(
            await screen.findByText(messages['tilrettelegging.tilrettelagtArbeidFom.label.en']),
        ).toBeInTheDocument();

        expect(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['tilrettelegging.tilrettelagtArbeidType.delvis']));
        await user.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis'])).toBeInTheDocument();

        await user.click(screen.getByText(messages['perioder.varierende.tomType.valgfriDato']));

        const tilretteleggingsdatoInput = screen.getByLabelText(messages['tilrettelegging.tilrettelagtArbeidFom.label.en'],
        );
        const fraDatoRedusertInput = screen.getByLabelText(messages['tilrettelegging.sammePeriodeFremTilTerminFom.label.delvis']);
        const tilbakeDatoInput = screen.getByLabelText(messages['tilrettelegging.enPeriodeMedTilretteleggingTilbakeIJobbDato.label.delvis']);

        await user.type(tilretteleggingsdatoInput, 'fdkmv');
        await user.type(fraDatoRedusertInput, 'fdkmv');
        await user.type(tilbakeDatoInput, 'fdkmv');

        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText(messages['valideringsfeil.tilrettelagtArbeidFom.gyldigDato'],
            )[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText(messages['valideringsfeil.sammePeriodeFremTilTerminFom.gyldigDato.delvis'],
            )[0],
        ).toBeInTheDocument();
        expect(
            screen.getAllByText(messages['valideringsfeil.sammePeriodeFremTilTerminTom.gyldigDato.delvis'],
            )[0],
        ).toBeInTheDocument();
    });
});
