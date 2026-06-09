import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { capitalizeFirstLetter } from '@navikt/fp-utils';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './AppContainer.stories';

import messages from './intl/messages/nb_NO.json';

const { HvorMyeVeiviserMockaStønadskvoterOgSatser } = composeStories(stories);

describe('<AppContainer>', () => {
    beforeEach(() => {
        vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
            setAvailableLanguages: vi.fn(),
            onLanguageSelect: vi.fn(),
        }));
    });

    it(
        'Hvor Mye veiviser: skal gå gjennom app og så tilbake',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(HvorMyeVeiviserMockaStønadskvoterOgSatser.parameters.msw);
            const utils = render(<HvorMyeVeiviserMockaStønadskvoterOgSatser />);

            expect(await screen.findAllByText(messages['HvorMyeForside.Title'])).toHaveLength(2);
            await userEvent.click(screen.getByText('Start'));

            const forrigeMåned = dayjs().subtract(1, 'month');

            expect(screen.getByText(messages['HvorMyeForside.Title'])).toBeInTheDocument();
            expect(screen.getByText(messages['ArbeidssituasjonSide.Arbeidssituasjon'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.ArbeidEllerFrilans']));

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

            await userEvent.click(screen.getByText(messages['ArbeidssituasjonSide.SeResultatet']));
            await expect(screen.findByText(messages['OppsummeringSide.Oppsummering'])).resolves.toBeInTheDocument();
            // expect(screen.getByText(messages['OppsummeringSide.Oppsummering'])).toBeInTheDocument();
            expect(
                screen.getByText('Gjennomsnittlig utbetaling med 100 % foreldrepenger i 49 uker'),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['OppsummeringSide.Tilbake']));

            expect(screen.getByText(messages['HvorMyeForside.Title'])).toBeInTheDocument();
            expect(screen.getByText(messages['ArbeidssituasjonSide.Arbeidssituasjon'])).toBeInTheDocument();
        }),
    );
});
