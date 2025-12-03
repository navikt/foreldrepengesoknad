import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './TidslinjePage.stories';

const { FPAdopsjon } = composeStories(stories);

const defaultDate = new Date('2025-11-29');

describe('<TidslinjePage>', () => {
    it(
        'skal vise hvor mye engangsstønad en har rett på',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(FPAdopsjon.parameters.msw);
            const { container } = render(<FPAdopsjon />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();
            verifiserHendelseStatus({ container, antall: 4, completed: 2, uncompleted: 2 });
            verifiserTeksterIKronologiskRekkefølge([
                /barnet ble adoptert/i,
                /du søkte om foreldrepenger/i,
                /du vil få et svar på søknaden din/i,
                /3 år siden adopsjonsdato/i,
            ]);
        }),
    );

    it(
        'skal vise hvor mye engangsstønad en har rett på1',
        mswWrapper(async ({ setHandlers }) => {
            const nåDato = dayjs(defaultDate).add(4, 'year').valueOf();

            setHandlers(FPAdopsjon.parameters.msw);
            const { container } = render(<FPAdopsjon mockDate={nåDato} />);

            expect(await screen.findByText('Dette skjer i saken')).toBeInTheDocument();

            verifiserHendelseStatus({ container: container, antall: 4, completed: 3, uncompleted: 1 });
        }),
    );
});

/**
 * Util funksjon for å sjekke rekkefølge til DOM elementer utifra tekst.
 * Laget av ChatGPT
 */
const verifiserTeksterIKronologiskRekkefølge = (tekster: Array<string | RegExp>) => {
    const elements = tekster.map((tekst) => screen.getByText(tekst));

    // Verify all texts are in the document
    elements.forEach((element) => {
        expect(element).toBeInTheDocument();
    });

    // Verify chronological order by comparing DOM positions
    for (let i = 0; i < elements.length - 1; i++) {
        const currentElement = elements[i];
        const nextElement = elements[i + 1];

        if (!currentElement || !nextElement) {
            continue;
        }

        // compareDocumentPosition returns a bitmask
        // DOCUMENT_POSITION_FOLLOWING (4) means the next element comes after the current one
        const position = currentElement.compareDocumentPosition(nextElement);

        expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
};

const verifiserHendelseStatus = ({
    container,
    antall,
    completed,
    uncompleted,
}: {
    container: HTMLElement;
    antall: number;
    completed: number;
    uncompleted: number;
}) => {
    expect(container.querySelectorAll('.aksel-process__event')).toHaveLength(antall);
    expect(container.querySelectorAll('[data-status="completed"]')).toHaveLength(completed);
    expect(container.querySelectorAll('[data-status="uncompleted"]')).toHaveLength(uncompleted);
};
