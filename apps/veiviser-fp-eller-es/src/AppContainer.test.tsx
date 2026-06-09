import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './AppContainer.stories';

import messages from './intl/messages/nb_NO.json';

const { FpEllerEsVeiviserMockaStønadskvoterOgSatser } = composeStories(stories);

describe('<AppContainer>', () => {
    beforeEach(() => {
        vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
            setAvailableLanguages: vi.fn(),
            onLanguageSelect: vi.fn(),
        }));
    });

    it(
        'FP eller ES veiviser: skal gå gjennom app og så tilbake',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FpEllerEsVeiviserMockaStønadskvoterOgSatser.parameters.msw);
            const utils = render(<FpEllerEsVeiviserMockaStønadskvoterOgSatser />);

            expect(await screen.findAllByText(messages['FpEllerEsForside.Title'])).toHaveLength(2);
            await userEvent.click(screen.getByText('Start'));

            expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

            expect(
                screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja'));

            expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
            await userEvent.click(screen.getAllByText('Ja')[1]!);

            const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
            await userEvent.type(hvorMye, '50000');

            expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
            await userEvent.click(screen.getAllByText('Ja')[2]!);

            await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

            expect(await screen.findByText(messages['OppsummeringFpEllerEsSide.Oppsummering'])).toBeInTheDocument();

            expect(screen.getByText(messages['OppsummeringFpEllerEsSide.DuHarRett'])).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['OppsummeringFpEllerEsSide.Tilbake']));

            expect(screen.getByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();
            expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        }),
    );
});
