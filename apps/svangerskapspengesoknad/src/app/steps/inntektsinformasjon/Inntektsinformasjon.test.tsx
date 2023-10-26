import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Inntektsinformasjon.stories';
import * as context from 'app/context/hooks/useSvangerskapspengerContext';
import { render, screen } from '@testing-library/react';
import { Søkerinfo } from 'app/types/Søkerinfo';
import {
    SvangerskapspengerContextState,
    svangerskapspengerInitialState,
} from 'app/context/SvangerskapspengerContextConfig';
import { Søknad } from 'app/types/Søknad';
import { Arbeidsforhold } from '@navikt/fp-common';

const { Default } = composeStories(stories);

const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const JA = 'Ja';
const NEI = 'Nei';
const FRILANSER = 'Har du jobbet og hatt inntekt som frilanser de siste 4 ukene?';
const SELVSTENDIG_NÆRINGSDRIVENDE = 'Har du jobbet og hatt inntekt som selvstendig næringsdrivende de siste 4 ukene?';
const UTLANDET = 'Har du jobbet i utlandet de siste 4 ukene?';
const NESTE_STEG = 'Neste steg';

describe('<Inntektsinformasjon>', () => {
    const user = userEvent.setup();

    it('skal vise feilmelding hvis spørsmål ikke er besvart', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(FRILANSER)).toBeInTheDocument();
        expect(await screen.findByText(SELVSTENDIG_NÆRINGSDRIVENDE)).toBeInTheDocument();
        expect(await screen.findByText(UTLANDET)).toBeInTheDocument();

        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            screen.getAllByText('Du må oppgi om du har arbeidet som frilanser de siste 4 ukene.')[0],
        ).toBeInTheDocument();
        expect(
            await screen.getAllByText(
                'Du må oppgi om du har hatt inntekt som selvstendig næringsdrivende de siste 4 ukene.',
            )[0],
        ).toBeInTheDocument();
        expect(
            await screen.getAllByText('Du må oppgi om du har arbeidet i utlandet de siste 4 ukene.')[0],
        ).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(NEI)[0]);

        await userEvent.click(screen.getAllByText(NEI)[1]);

        await userEvent.click(screen.getAllByText(JA)[2]);
        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            screen.queryByText('Du må oppgi om du har arbeidet som frilanser de siste 4 ukene.'),
        ).not.toBeInTheDocument();
        expect(
            await screen.queryByText(
                'Du må oppgi om du har hatt inntekt som selvstendig næringsdrivende de siste 4 ukene.',
            ),
        ).not.toBeInTheDocument();
        expect(
            await screen.queryByText('Du må oppgi om du har arbeidet i utlandet de siste 4 ukene.'),
        ).not.toBeInTheDocument();
    });
});
