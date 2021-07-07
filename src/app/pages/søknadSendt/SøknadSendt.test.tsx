import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/pages/SøknadSendt.stories';

const { Default, MedBankkonto, MedArbeidsforhold } = composeStories(stories);

describe('<SøknadSendt>', () => {
    it('skal vise side for søknad sendt', async () => {
        render(<Default />);
        expect(await screen.findByText('Takk for søknaden Espen Utvikler!')).toBeInTheDocument();
        expect(screen.getByText('Når kan jeg tidligst forvente få svar på min søknad?')).toBeInTheDocument();
        expect(screen.getByText('14. June 2021')).toBeInTheDocument();
        expect(screen.queryByText('Registrert kontonummer')).not.toBeInTheDocument();
    });

    it('skal vise informasjon om bankkonto', async () => {
        render(<MedBankkonto />);
        expect(await screen.findByText('Takk for søknaden Espen Utvikler!')).toBeInTheDocument();
        expect(screen.getByText('Registrert kontonummer')).toBeInTheDocument();
        expect(screen.getByText('5646464535')).toBeInTheDocument();
    });

    it('skal vise informasjon om arbeidsforhold', async () => {
        render(<MedArbeidsforhold />);
        expect(await screen.findByText('Takk for søknaden Espen Utvikler!')).toBeInTheDocument();
        expect(screen.getByText('Hvilken informasjon trenger arbeidsgiveren min?')).toBeInTheDocument();
    });
});
