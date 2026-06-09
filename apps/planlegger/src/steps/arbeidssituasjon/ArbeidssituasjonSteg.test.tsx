import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import { useNavigate } from 'react-router-dom';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';

import * as stories from './ArbeidssituasjonSteg.stories';

import messages from '../../intl/messages/nb_NO.json';

const {
    ArbeidssituasjonMorOgFar,
    ArbeidssituasjonFarOgFar,
    ArbeidssituasjonAleneforsørger,
    ArbeidssituasjonMorOgMedmorUtenNavn,
} = composeStories(stories);

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
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

        expect(await screen.findAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(
            screen.getByText(
                `Har jobbet minst 6 av de siste 10 månedene og har tjent 68 274,50 kr eller mer det siste året`,
            ),
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
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(PlanleggerRoutes.HVOR_MYE));
    });

    it('skal vise arbeidssituasjon for far og mor og velge at kun mor har rett', async () => {
        const gåTilNesteSide = vi.fn();

        render(<ArbeidssituasjonMorOgFar gåTilNesteSide={gåTilNesteSide} />);

        expect(await screen.findAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(
            screen.getByText(
                'Har jobbet minst 6 av de siste 10 månedene og har tjent 68 274,50 kr eller mer det siste året',
            ),
        );

        await userEvent.click(screen.getByText(messages['DefaultMessage.Nei']));

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

        expect(await screen.findAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSteg.Ufør']));

        await userEvent.click(screen.getByText(messages['DefaultMessage.Nei']));

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

        expect(await screen.findAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSteg.Ingen']));

        await userEvent.click(screen.getByText(messages['DefaultMessage.Nei']));

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

        expect(await screen.findAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['DefaultMessage.Nei']));

        await userEvent.click(screen.getAllByText('Ja')[1]!);

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

        expect(await screen.findAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);

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

        expect(await screen.findAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);

        await userEvent.click(screen.getByText(messages['DefaultMessage.Nei']));

        expect(screen.getByText(messages['OppsummeringSteg.Infoboks.IngenHarRettDeg'])).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                status: Arbeidsstatus.INGEN,
            },
            key: ContextDataType.ARBEIDSSITUASJON,
            type: 'update',
        });
    });

    it('skal omtale medmor som medmor hvis navn ikke er oppgit', async () => {
        render(<ArbeidssituasjonMorOgMedmorUtenNavn />);

        expect(await screen.findAllByText(messages['ArbeidssituasjonSteg.Tittel'])).toHaveLength(2);
        await userEvent.click(screen.getByText(messages['ArbeidssituasjonSteg.Ingen']));

        expect(
            screen.getByText('Har medmor jobbet minst 6 av de siste 10 månedene', { exact: false }),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        expect(screen.getByText('Medmor vil ha rett til foreldrepenger')).toBeInTheDocument();
    });
});
