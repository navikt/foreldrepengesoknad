import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './AppContainer.stories';

const { SøkerErKvinne } = composeStories(stories);

describe('<AppContainer>', () => {
    it(
        'skal gå raskeste vei gjennom applikasjonen og så tilbake',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(SøkerErKvinne.parameters.msw);
            const utils = render(<SøkerErKvinne />);

            expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));
            await userEvent.click(screen.getByText('Start søknaden'));

            expect(screen.getAllByText('Din situasjon')).toHaveLength(2);
            expect(screen.getByText('Steg 1 av 4')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Fødsel'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 2 av 4')).toBeInTheDocument();
            expect(screen.getAllByText('Barnet')).toHaveLength(2);
            await userEvent.click(screen.getByText('Ja'));
            const fødselsdato = utils.getByLabelText('Fødselsdato');
            await userEvent.type(fødselsdato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(fødselsdato);
            const termindato = utils.getByLabelText('Termindato');
            await userEvent.type(termindato, dayjs().subtract(20, 'day').format(DDMMYYYY_DATE_FORMAT));
            fireEvent.blur(termindato);
            await userEvent.click(screen.getByText('Ett barn'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Steg 3 av 4')).toBeInTheDocument();
            expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2);

            await userEvent.click(screen.getByText('Jeg har bodd i Norge'));
            await userEvent.click(screen.getByText('Jeg skal bo i Norge'));
            await userEvent.click(screen.getByText('Neste steg'));

            expect(await screen.findByText('Søknaden gjelder')).toBeInTheDocument();
            expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
            await userEvent.click(
                screen.getByText(
                    'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
                ),
            );

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Bo i utlandet')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Barnet')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getAllByText('Din situasjon')).toHaveLength(2);

            await userEvent.click(screen.getByText('Forrige steg'));
            expect(screen.getByText('Ja, jeg har forstått mine plikter.')).toBeInTheDocument();
        }),
    );
});
