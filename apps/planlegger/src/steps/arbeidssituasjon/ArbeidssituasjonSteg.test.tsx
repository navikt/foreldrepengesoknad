import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';

import * as stories from './ArbeidssituasjonSteg.stories';

const { ArbeidssituasjonMorOgFar, ArbeidssituasjonFarOgFar, ArbeidssituasjonAleneforsørger } = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        // @ts-ignore
        ...actual,
        useNavigate: vi.fn(),
    };
});

const useNavigateMock = vi.mocked(useNavigate);

describe('<ArbeidssituasjonSteg>', () => {
    it('skal vise arbeidssituasjon for far og mor og velge at begge har rett', async () => {
        const navigateMock = vi.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText('Har jobbet 6 av de siste 10 månedene og har tjent mer enn 62 014 kr det siste året'),
        );

        expect(screen.getByText('Klara vil ha rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Espen vil ha rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: true,
                status: Arbeidsstatus.JOBBER,
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(PlanleggerRoutes.HVOR_LANG_PERIODE));
    });

    it('skal vise arbeidssituasjon for far og mor og velge at kun mor har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText('Har jobbet 6 av de siste 10 månedene og har tjent mer enn 62 014 kr det siste året'),
        );

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Espen har ikke rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: false,
                status: Arbeidsstatus.JOBBER,
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for far og mor og velge at mor er ufør og far ikke har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Er ufør'));

        await userEvent.click(screen.getByText('Nei'));

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: false,
                status: Arbeidsstatus.UFØR,
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for far og mor og velge at ingen av disse for mor og at far ikke har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ingen av disse'));

        await userEvent.click(screen.getByText('Nei'));

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: false,
                status: Arbeidsstatus.INGEN,
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for far og far og velge at kun en jobber', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonFarOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        await userEvent.click(screen.getAllByText('Ja')[1]);

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                jobberAnnenPart: true,
                status: Arbeidsstatus.INGEN,
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for aleneforsørger og at en har jobbet', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonAleneforsørger gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Du vil ha rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                status: Arbeidsstatus.JOBBER,
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal vise arbeidssituasjon for aleneforsørger og velge at en ikke har jobbet', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonAleneforsørger gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findByText('Arbeidssituasjon')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Du har ikke rett til foreldrepenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                status: Arbeidsstatus.INGEN,
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });
});
