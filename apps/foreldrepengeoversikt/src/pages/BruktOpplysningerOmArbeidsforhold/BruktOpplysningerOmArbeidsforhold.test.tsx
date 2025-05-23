import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './BruktOpplysningerOmArbeidsforhold.stories';

const { Default } = composeStories(stories);

describe('<BruktOpplysningerOmArbeidsforhold>', () => {
    it('Skal vise side som informerer om at Nav har brukt opplysninger om arbeidsforholdet', async () => {
        render(<Default />);

        expect(await screen.findByText('Nav har brukt opplysninger om arbeidsforholdet ditt')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Den andre forelderen har søkt om foreldrepenger og har oppgitt at du skal være i arbeid.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Derfor har Nav slått opp arbeidsforholdet ditt i Arbeidsgiver- og arbeidstakerregisteret (Aa-registeret),' +
                    ' og bruker opplysningene i behandlingen av saken til den andre forelderen.' +
                    ' Opplysningene vil brukes også om det er flere perioder eller søknader.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /Dette har vi gjort etter bestemmelsene i folketrygdloven § 21-4\. Du kan lese mer om behandlingsgrunnlaget/,
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('her (åpner i en ny fane)')).toBeInTheDocument();
        expect(screen.getByText('her (åpner i en ny fane)')).toHaveAttribute(
            'href',
            'https://www.nav.no/personvernerklaering#om',
        );
    });
});
