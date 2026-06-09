import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { capitalizeFirstLetter } from '@navikt/fp-utils';

import * as stories from './ArbeidssituasjonSide.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<ArbeidssituasjonSide>', () => {
    it('skal velge arbeidstaker eller frilanser', async () => {
        const setArbeidssituasjon = vi.fn();
        const utils = render(<Default setArbeidssituasjon={setArbeidssituasjon} />);

        expect(await screen.findByText(messages['HvorMyeForside.Title'])).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.Arbeidssituasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.ArbeidEllerFrilans']));

        expect(screen.getByText(messages['ArbeidssituasjonSide.TreSisteMåneder'])).toBeInTheDocument();
        expect(screen.getByText(messages['ArbeidssituasjonSide.LønnFørSkatt'])).toBeInTheDocument();
        const forrigeMåned = dayjs().subtract(1, 'month');
        const måned1 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(2, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned1, '10000');
        const måned2 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(1, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned2, '10000');
        const måned3 = utils.getByLabelText(capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY')));
        await userEvent.type(måned3, '10000');

        expect(screen.getByText(messages['ArbeidssituasjonSide.Gjennomsnitt'])).toBeInTheDocument();
        expect(screen.getByText('10 000 kr')).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.GjennomsnittÅrslønn'])).toBeInTheDocument();
        expect(screen.getByText('120 000 kr')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.SeResultatet']));

        expect(setArbeidssituasjon).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: true,
            harUtbetalingFraNav: undefined,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '10000',
            lønnMåned2: '10000',
            lønnMåned3: '10000',
        });
    });

    it('skal velge at en får utbetaling fra Nav', async () => {
        const setArbeidssituasjon = vi.fn();
        const utils = render(<Default setArbeidssituasjon={setArbeidssituasjon} />);

        expect(await screen.findByText(messages['HvorMyeForside.Title'])).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.Arbeidssituasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.UtbetalingNav']));

        expect(screen.getByText(messages['ArbeidssituasjonSide.UtbetaltTreSiste'])).toBeInTheDocument();
        expect(screen.queryByText(messages['ArbeidssituasjonSide.LønnFørSkatt'])).not.toBeInTheDocument();
        const forrigeMåned = dayjs().subtract(1, 'month');
        const måned1 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(2, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned1, '10000');
        const måned2 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(1, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned2, '10000');
        const måned3 = utils.getByLabelText(capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY')));
        await userEvent.type(måned3, '10000');

        expect(screen.getByText(messages['ArbeidssituasjonSide.Gjennomsnitt'])).toBeInTheDocument();
        expect(screen.getByText('10 000 kr')).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.GjennomsnittÅrslønn'])).toBeInTheDocument();
        expect(screen.getByText('120 000 kr')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.SeResultatet']));

        expect(setArbeidssituasjon).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: undefined,
            harUtbetalingFraNav: true,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '10000',
            lønnMåned2: '10000',
            lønnMåned3: '10000',
        });
    });

    it('skal velge både arbeidstaker eller frilanser og at en får utbetaling fra Nav', async () => {
        const setArbeidssituasjon = vi.fn();
        const utils = render(<Default setArbeidssituasjon={setArbeidssituasjon} />);

        expect(await screen.findByText(messages['HvorMyeForside.Title'])).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.Arbeidssituasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.ArbeidEllerFrilans']));
        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.UtbetalingNav']));

        expect(screen.getByText(messages['ArbeidssituasjonSide.UtbetaltTreSiste'])).toBeInTheDocument();
        const forrigeMåned = dayjs().subtract(1, 'month');
        const måned1 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(2, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned1, '10000');
        const måned2 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(1, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned2, '10000');
        const måned3 = utils.getByLabelText(capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY')));
        await userEvent.type(måned3, '10000');

        expect(screen.getByText(messages['ArbeidssituasjonSide.Gjennomsnitt'])).toBeInTheDocument();
        expect(screen.getByText('10 000 kr')).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.GjennomsnittÅrslønn'])).toBeInTheDocument();
        expect(screen.getByText('120 000 kr')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.SeResultatet']));

        expect(setArbeidssituasjon).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: true,
            harUtbetalingFraNav: true,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '10000',
            lønnMåned2: '10000',
            lønnMåned3: '10000',
        });
    });

    it('skal velge at en er selvstendig næringsdrivende og få beskjed om at en ikke kan bruke veiviseren', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['HvorMyeForside.Title'])).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.Arbeidssituasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.SelvstendigNæringsdrivende']));

        expect(
            screen.getByText(messages['ArbeidssituasjonSide.SNKanIkkeBruke']),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.ArbeidEllerFrilans']));

        expect(
            screen.getByText(messages['ArbeidssituasjonSide.SNKanIkkeBruke']),
        ).toBeInTheDocument();
    });

    it('skal velge en så lav månedsinntekt at en ikke har rett til foreldrepenger', async () => {
        const setArbeidssituasjon = vi.fn();
        const utils = render(<Default setArbeidssituasjon={setArbeidssituasjon} />);

        expect(await screen.findByText(messages['HvorMyeForside.Title'])).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.Arbeidssituasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.ArbeidEllerFrilans']));

        expect(screen.getByText(messages['ArbeidssituasjonSide.TreSisteMåneder'])).toBeInTheDocument();
        const forrigeMåned = dayjs().subtract(1, 'month');
        const måned1 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(2, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned1, '1000');
        const måned2 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(1, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned2, '1000');
        const måned3 = utils.getByLabelText(capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY')));
        await userEvent.type(måned3, '1000');

        expect(screen.getByText(messages['ArbeidssituasjonSide.Gjennomsnitt'])).toBeInTheDocument();
        expect(screen.getByText('1 000 kr')).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.GjennomsnittÅrslønn'])).toBeInTheDocument();
        expect(screen.getByText('12 000 kr')).toBeInTheDocument();

        expect(
            screen.getByText('Med årslønn under 68 274,50 kr har du ikke rett til foreldrepenger'),
        ).toBeInTheDocument();
        expect(screen.getByText(/12 000 kr i året/)).toBeInTheDocument();
        expect(screen.getByText(/68 274,50 kr i året/)).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.SeResultatet']));

        expect(setArbeidssituasjon).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: true,
            harUtbetalingFraNav: undefined,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '1000',
            lønnMåned2: '1000',
            lønnMåned3: '1000',
        });
    });

    it('skal velge en så høy månedsinntekt at en ikke får dekket alt', async () => {
        const setArbeidssituasjon = vi.fn();
        const utils = render(<Default setArbeidssituasjon={setArbeidssituasjon} />);

        expect(await screen.findByText(messages['HvorMyeForside.Title'])).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.Arbeidssituasjon'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.ArbeidEllerFrilans']));

        expect(screen.getByText(messages['ArbeidssituasjonSide.TreSisteMåneder'])).toBeInTheDocument();
        const forrigeMåned = dayjs().subtract(1, 'month');
        const måned1 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(2, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned1, '100000');
        const måned2 = utils.getByLabelText(
            capitalizeFirstLetter(forrigeMåned.subtract(1, 'month').format('MMMM YYYY')),
        );
        await userEvent.type(måned2, '100000');
        const måned3 = utils.getByLabelText(capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY')));
        await userEvent.type(måned3, '100000');

        expect(screen.getByText(messages['ArbeidssituasjonSide.Gjennomsnitt'])).toBeInTheDocument();
        expect(screen.getByText('100 000 kr')).toBeInTheDocument();

        expect(screen.getByText(messages['ArbeidssituasjonSide.GjennomsnittÅrslønn'])).toBeInTheDocument();
        expect(screen.getByText('1 200 000 kr')).toBeInTheDocument();

        expect(screen.getByText('Du får dekket opptil 819 294 kr av din inntekt')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.SeResultatet']));

        expect(setArbeidssituasjon).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: true,
            harUtbetalingFraNav: undefined,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '100000',
            lønnMåned2: '100000',
            lønnMåned3: '100000',
        });
    });
});
