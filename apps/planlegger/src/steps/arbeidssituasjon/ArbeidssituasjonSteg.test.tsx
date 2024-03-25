import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';

import * as stories from './ArbeidssituasjonSteg.stories';

const { ArbeidssituasjonMorOgFar, ArbeidssituasjonAleneforsørger } = composeStories(stories);

describe('<ArbeidssituasjonSteg>', () => {
    it('skal vise arbeidssituasjon for far og mor og velge at begge har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText('Har jobbet 6 av de siste 10 månedene og har tjent mer enn 59 310 kr det siste året'),
        );

        expect(screen.getByText('Klara vil ha rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Espen vil ha rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: true,
                status: 'Jobber',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for far og mor og velge at kun mor har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText('Har jobbet 6 av de siste 10 månedene og har tjent mer enn 59 310 kr det siste året'),
        );

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Espen har ikke rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: false,
                status: 'Jobber',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for far og mor og velge at mor er ufør', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Er ufør'));

        await userEvent.click(screen.getByText('Nei'));

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: false,
                status: 'Ufør',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for far og mor og velge at ingen av disse for mor', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ingen av disse'));

        await userEvent.click(screen.getByText('Nei'));

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: false,
                status: 'Jobber ikke',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for aleneforsørger og velge at har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonAleneforsørger gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText('Har jobbet 6 av de siste 10 månedene og har tjent mer enn 59 310 kr det siste året'),
        );

        expect(screen.getByText('Du vil ha rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                status: 'Jobber',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for aleneforsørger og velge at er ufør', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonAleneforsørger gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Er ufør'));

        expect(screen.getByText('Du har ikke rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                status: 'Ufør',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for aleneforsørger og velge Ingen av disse', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonAleneforsørger gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ingen av disse'));

        expect(screen.getByText('Du har ikke rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                status: 'Jobber ikke',
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });
});
