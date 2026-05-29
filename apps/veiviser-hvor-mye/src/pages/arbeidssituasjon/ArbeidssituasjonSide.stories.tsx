import { HvorMyeRoutes } from 'appData/routes';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DEFAULT_SATSER } from '@navikt/fp-constants';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import preview from '../../../.storybook/preview';
import { type Arbeidssituasjon, ArbeidssituasjonSide } from './ArbeidssituasjonSide';

const meta = preview.meta({
    title: 'hvorMye/ArbeidssituasjonSide',
    component: ArbeidssituasjonSide,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[HvorMyeRoutes.ARBEIDSSITUASJON]}>
                <ArbeidssituasjonSide {...props} />
            </MemoryRouter>
        );
    },
});
export default meta;

const createArgs = () => ({
    setArbeidssituasjon: fn<(arbeidssituasjon: Arbeidssituasjon) => void>(),
    arbeidssituasjon: undefined,
    satser: DEFAULT_SATSER,
});

const forrigeMåned = dayjs().subtract(1, 'month');
const måned1Label = capitalizeFirstLetter(forrigeMåned.subtract(2, 'month').format('MMMM YYYY'));
const måned2Label = capitalizeFirstLetter(forrigeMåned.subtract(1, 'month').format('MMMM YYYY'));
const måned3Label = capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY'));

const velgerArbeidstakerEllerFrilanserMock = fn<(arbeidssituasjon: Arbeidssituasjon) => void>();
const velgerUtbetalingFraNavMock = fn<(arbeidssituasjon: Arbeidssituasjon) => void>();
const velgerBådeArbeidstakerOgUtbetalingMock = fn<(arbeidssituasjon: Arbeidssituasjon) => void>();
const velgerLavMånedsInntektMock = fn<(arbeidssituasjon: Arbeidssituasjon) => void>();
const velgerHøyMånedsInntektMock = fn<(arbeidssituasjon: Arbeidssituasjon) => void>();

export const Default = meta.story({
    args: createArgs(),
});

export const VelgerArbeidstakerEllerFrilanser = meta.story({
    args: {
        setArbeidssituasjon: velgerArbeidstakerEllerFrilanserMock,
        arbeidssituasjon: undefined,
        satser: DEFAULT_SATSER,
    },
    test: async () => {
        velgerArbeidstakerEllerFrilanserMock.mockClear();
        const canvas = within(document.body);

        await expect(canvas.findByText('Hvor mye kan jeg få i foreldrepenger?')).resolves.toBeInTheDocument();
        await expect(canvas.getByText('Hva er din nåværende arbeidssituasjon?')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Arbeidstaker eller frilanser'));

        await expect(canvas.getByText('Hvor mye tjente du de 3 siste månedene?')).toBeInTheDocument();
        await expect(canvas.getByText('Oppgi lønnen din før skatt')).toBeInTheDocument();

        await userEvent.type(canvas.getByLabelText(måned1Label), '10000');
        await userEvent.type(canvas.getByLabelText(måned2Label), '10000');
        await userEvent.type(canvas.getByLabelText(måned3Label), '10000');

        await expect(canvas.getByText('Gjennomsnittlig månedslønn')).toBeInTheDocument();
        await expect(canvas.getByText('10 000 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Gjennomsnittlig årslønn')).toBeInTheDocument();
        await expect(canvas.getByText('120 000 kr')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Se resultatet'));

        await expect(velgerArbeidstakerEllerFrilanserMock).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: true,
            harUtbetalingFraNav: undefined,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '10000',
            lønnMåned2: '10000',
            lønnMåned3: '10000',
        });
    },
});

export const VelgerUtbetalingFraNav = meta.story({
    args: {
        setArbeidssituasjon: velgerUtbetalingFraNavMock,
        arbeidssituasjon: undefined,
        satser: DEFAULT_SATSER,
    },
    test: async () => {
        velgerUtbetalingFraNavMock.mockClear();
        const canvas = within(document.body);

        await expect(canvas.findByText('Hvor mye kan jeg få i foreldrepenger?')).resolves.toBeInTheDocument();
        await expect(canvas.getByText('Hva er din nåværende arbeidssituasjon?')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Jeg får utbetalinger fra Nav'));

        await expect(canvas.getByText('Hvor mye fikk du utbetalt de 3 siste månedene, før skatt?')).toBeInTheDocument();
        await expect(canvas.queryByText('Oppgi lønnen din før skatt')).not.toBeInTheDocument();

        await userEvent.type(canvas.getByLabelText(måned1Label), '10000');
        await userEvent.type(canvas.getByLabelText(måned2Label), '10000');
        await userEvent.type(canvas.getByLabelText(måned3Label), '10000');

        await expect(canvas.getByText('Gjennomsnittlig månedslønn')).toBeInTheDocument();
        await expect(canvas.getByText('10 000 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Gjennomsnittlig årslønn')).toBeInTheDocument();
        await expect(canvas.getByText('120 000 kr')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Se resultatet'));

        await expect(velgerUtbetalingFraNavMock).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: undefined,
            harUtbetalingFraNav: true,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '10000',
            lønnMåned2: '10000',
            lønnMåned3: '10000',
        });
    },
});

export const VelgerBådeArbeidstakerOgUtbetaling = meta.story({
    args: {
        setArbeidssituasjon: velgerBådeArbeidstakerOgUtbetalingMock,
        arbeidssituasjon: undefined,
        satser: DEFAULT_SATSER,
    },
    test: async () => {
        velgerBådeArbeidstakerOgUtbetalingMock.mockClear();
        const canvas = within(document.body);

        await expect(canvas.findByText('Hvor mye kan jeg få i foreldrepenger?')).resolves.toBeInTheDocument();
        await expect(canvas.getByText('Hva er din nåværende arbeidssituasjon?')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Arbeidstaker eller frilanser'));
        await userEvent.click(canvas.getByText('Jeg får utbetalinger fra Nav'));

        await expect(canvas.getByText('Hvor mye fikk du utbetalt de 3 siste månedene, før skatt?')).toBeInTheDocument();

        await userEvent.type(canvas.getByLabelText(måned1Label), '10000');
        await userEvent.type(canvas.getByLabelText(måned2Label), '10000');
        await userEvent.type(canvas.getByLabelText(måned3Label), '10000');

        await expect(canvas.getByText('Gjennomsnittlig månedslønn')).toBeInTheDocument();
        await expect(canvas.getByText('10 000 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Gjennomsnittlig årslønn')).toBeInTheDocument();
        await expect(canvas.getByText('120 000 kr')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Se resultatet'));

        await expect(velgerBådeArbeidstakerOgUtbetalingMock).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: true,
            harUtbetalingFraNav: true,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '10000',
            lønnMåned2: '10000',
            lønnMåned3: '10000',
        });
    },
});

export const VelgerSelvstendigNæringsdrivende = meta.story({
    args: createArgs(),
    test: async () => {
        const canvas = within(document.body);

        await expect(canvas.findByText('Hvor mye kan jeg få i foreldrepenger?')).resolves.toBeInTheDocument();
        await expect(canvas.getByText('Hva er din nåværende arbeidssituasjon?')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Selvstendig næringsdrivende'));

        await expect(
            canvas.getByText('Som selvstendig næringsdrivende kan du inntil videre ikke bruke denne veiviseren.'),
        ).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Arbeidstaker eller frilanser'));

        await expect(
            canvas.getByText('Som selvstendig næringsdrivende kan du inntil videre ikke bruke denne veiviseren.'),
        ).toBeInTheDocument();
    },
});

export const VelgerLavMånedsInntekt = meta.story({
    args: {
        setArbeidssituasjon: velgerLavMånedsInntektMock,
        arbeidssituasjon: undefined,
        satser: DEFAULT_SATSER,
    },
    test: async () => {
        velgerLavMånedsInntektMock.mockClear();
        const canvas = within(document.body);

        await expect(canvas.findByText('Hvor mye kan jeg få i foreldrepenger?')).resolves.toBeInTheDocument();
        await expect(canvas.getByText('Hva er din nåværende arbeidssituasjon?')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Arbeidstaker eller frilanser'));

        await expect(canvas.getByText('Hvor mye tjente du de 3 siste månedene?')).toBeInTheDocument();

        await userEvent.type(canvas.getByLabelText(måned1Label), '1000');
        await userEvent.type(canvas.getByLabelText(måned2Label), '1000');
        await userEvent.type(canvas.getByLabelText(måned3Label), '1000');

        await expect(canvas.getByText('Gjennomsnittlig månedslønn')).toBeInTheDocument();
        await expect(canvas.getByText('1 000 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Gjennomsnittlig årslønn')).toBeInTheDocument();
        await expect(canvas.getByText('12 000 kr')).toBeInTheDocument();
        await expect(
            canvas.getByText('Med årslønn under 68 274,50 kr har du ikke rett til foreldrepenger'),
        ).toBeInTheDocument();
        await expect(canvas.getByText(/12 000 kr i året/)).toBeInTheDocument();
        await expect(canvas.getByText(/68 274,50 kr i året/)).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Se resultatet'));

        await expect(velgerLavMånedsInntektMock).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: true,
            harUtbetalingFraNav: undefined,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '1000',
            lønnMåned2: '1000',
            lønnMåned3: '1000',
        });
    },
});

export const VelgerHøyMånedsInntekt = meta.story({
    args: {
        setArbeidssituasjon: velgerHøyMånedsInntektMock,
        arbeidssituasjon: undefined,
        satser: DEFAULT_SATSER,
    },
    test: async () => {
        velgerHøyMånedsInntektMock.mockClear();
        const canvas = within(document.body);

        await expect(canvas.findByText('Hvor mye kan jeg få i foreldrepenger?')).resolves.toBeInTheDocument();
        await expect(canvas.getByText('Hva er din nåværende arbeidssituasjon?')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Arbeidstaker eller frilanser'));

        await expect(canvas.getByText('Hvor mye tjente du de 3 siste månedene?')).toBeInTheDocument();

        await userEvent.type(canvas.getByLabelText(måned1Label), '100000');
        await userEvent.type(canvas.getByLabelText(måned2Label), '100000');
        await userEvent.type(canvas.getByLabelText(måned3Label), '100000');

        await expect(canvas.getByText('Gjennomsnittlig månedslønn')).toBeInTheDocument();
        await expect(canvas.getByText('100 000 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Gjennomsnittlig årslønn')).toBeInTheDocument();
        await expect(canvas.getByText('1 200 000 kr')).toBeInTheDocument();
        await expect(canvas.getByText('Du får dekket opptil 819 294 kr av din inntekt')).toBeInTheDocument();

        await userEvent.click(canvas.getByText('Se resultatet'));

        await expect(velgerHøyMånedsInntektMock).toHaveBeenNthCalledWith(1, {
            erArbeidstakerEllerFrilanser: true,
            harUtbetalingFraNav: undefined,
            erSelvstendigNæringsdrivende: undefined,
            lønnMåned1: '100000',
            lønnMåned2: '100000',
            lønnMåned3: '100000',
        });
    },
});
