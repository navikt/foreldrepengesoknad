/* eslint-disable */
// @ts-nocheck
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DEFAULT_SATSER } from '@navikt/fp-constants';

import preview from '../../../.storybook/preview';
import { SituasjonSide } from './SituasjonSide';

const meta = preview.meta({
    title: 'fpEllerEs/SituasjonSide',
    component: SituasjonSide,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <SituasjonSide {...props} />
            </MemoryRouter>
        );
    },
});
export default meta;

const createArgs = () => ({
    satser: DEFAULT_SATSER,
    setFpEllerEsSituasjon: fn(),
});

type Canvas = ReturnType<typeof within>;

const forventStart = async (canvas: Canvas) => {
    await expect(canvas.findByText('Foreldrepenger eller engangsstønad')).resolves.toBeInTheDocument();
    expect(canvas.getByText('Hvem er du?')).toBeInTheDocument();
};

const velgMor = async (canvas: Canvas) => {
    await forventStart(canvas);
    await userEvent.click(canvas.getByText('Mor'));
};

const svarPåArbeid = async (canvas: Canvas, svar: 'Ja' | 'Nei') => {
    await expect(
        canvas.findByText(
            'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
        ),
    ).resolves.toBeInTheDocument();
    await userEvent.click(canvas.getAllByText(svar)[0]!);
};

const svarPåAndreInntekter = async (canvas: Canvas, svar: 'Ja' | 'Nei') => {
    await expect(canvas.findByText('Har du andre inntektskilder?')).resolves.toBeInTheDocument();
    await userEvent.click(canvas.getAllByText(svar)[1]!);
};

const svarPåInntekt = async (canvas: Canvas, svar: 'Ja' | 'Nei', index = 1) => {
    await expect(canvas.findByText('Har du hatt inntekt 6 av de 10 siste månedene?')).resolves.toBeInTheDocument();
    await userEvent.click(canvas.getAllByText(svar)[index]!);
};

const skrivLønn = async (canvas: Canvas, lønn: string) => {
    const hvorMye = canvas.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
    await userEvent.type(hvorMye, lønn);
    return hvorMye;
};

const svarPåBorINorge = async (canvas: Canvas, svar: 'Ja' | 'Nei', index = 2) => {
    await expect(canvas.findByText('Bor du i Norge?')).resolves.toBeInTheDocument();
    await userEvent.click(canvas.getAllByText(svar)[index]!);
};

const svarPåJobberINorge = async (canvas: Canvas, svar: 'Ja' | 'Nei', index = 3) => {
    await expect(canvas.findByText('Jobber du i Norge?')).resolves.toBeInTheDocument();
    await userEvent.click(canvas.getAllByText(svar)[index]!);
};

const seResultatet = async (canvas: Canvas) => {
    await userEvent.click(canvas.getByText('Se resultatet'));
};

export const Default = meta.story({
    args: {
        satser: DEFAULT_SATSER,
        setFpEllerEsSituasjon: () => undefined,
    },
});

export const MorIArbeidMedInntektOgBorINorge = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Ja');
        await skrivLønn(canvas, '50000');
        await svarPåBorINorge(canvas, 'Ja');
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '50000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
            jobberDuINorge: null,
        });
    },
});

export const IkkeBorINorgeMenMedlemAvFolketrygden = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Ja');
        await skrivLønn(canvas, '50000');
        await svarPåBorINorge(canvas, 'Nei');
        await svarPåJobberINorge(canvas, 'Ja');
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: true,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '50000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
        });
    },
});

export const IkkeBorINorgeOgIkkeMedlem = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Ja');
        await skrivLønn(canvas, '50000');
        await svarPåBorINorge(canvas, 'Nei');
        await svarPåJobberINorge(canvas, 'Nei');

        expect(
            canvas.getByText(
                'For å kunne ha rett til foreldrepenger eller engangsstønad må man være medlem av folketrygden',
            ),
        ).toBeInTheDocument();

        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: false,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '50000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
        });
    },
});

export const MorMedInntektUnderGrensenBorINorge = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Ja');
        await skrivLønn(canvas, '5000');
        await svarPåBorINorge(canvas, 'Ja');
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '5000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
            jobberDuINorge: null,
        });
    },
});

export const MorMedInntektUnderGrensenIkkeBorMenMedlem = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Ja');
        await skrivLønn(canvas, '5000');
        await svarPåBorINorge(canvas, 'Nei');
        await svarPåJobberINorge(canvas, 'Ja');
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: true,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '5000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
        });
    },
});

export const MorMedInntektUnderGrensenIkkeBorOgIkkeMedlem = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Ja');
        await skrivLønn(canvas, '5000');
        await svarPåBorINorge(canvas, 'Nei');
        await svarPåJobberINorge(canvas, 'Nei');
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: false,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '5000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
        });
    },
});

export const IkkeInntektSiste6MndMenBorINorge = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Nei');

        expect(
            canvas.getByText('For å kunne ha rett til foreldrepenger må man ha jobbet 6 av de 10 siste månedene'),
        ).toBeInTheDocument();

        await svarPåBorINorge(canvas, 'Ja');
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: true,
            harHattInntekt: false,
            situasjon: 'mor',
            harHattAndreInntekter: null,
            jobberDuINorge: null,
            lønnPerMåned: null,
        });
    },
});

export const IkkeInntektSiste6MndIkkeBorMenMedlem = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Nei');

        expect(
            canvas.getByText('For å kunne ha rett til foreldrepenger må man ha jobbet 6 av de 10 siste månedene'),
        ).toBeInTheDocument();

        await svarPåBorINorge(canvas, 'Nei');
        await svarPåJobberINorge(canvas, 'Nei');
        expect(canvas.getByText(/For å kunne ha rett til foreldrepenger eller engangsstønad/)).toBeInTheDocument();
        await userEvent.click(canvas.getAllByText('Ja')[3]!);
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: true,
            erIArbeid: true,
            harHattInntekt: false,
            situasjon: 'mor',
            harHattAndreInntekter: null,
            lønnPerMåned: null,
        });
    },
});

export const IkkeInntektSiste6MndIkkeBorOgIkkeMedlem = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Nei');

        expect(
            canvas.getByText('For å kunne ha rett til foreldrepenger må man ha jobbet 6 av de 10 siste månedene'),
        ).toBeInTheDocument();

        await svarPåBorINorge(canvas, 'Nei');
        await svarPåJobberINorge(canvas, 'Nei');
        expect(canvas.getByText(/For å kunne ha rett til foreldrepenger eller engangsstønad/)).toBeInTheDocument();
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: false,
            harHattInntekt: false,
            erIArbeid: true,
            situasjon: 'mor',
            harHattAndreInntekter: null,
            lønnPerMåned: null,
        });
    },
});

export const IkkeArbeidstakerMenAndreInntekter = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Nei');
        await svarPåAndreInntekter(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Ja', 2);
        await skrivLønn(canvas, '50000');
        await svarPåBorINorge(canvas, 'Ja', 3);
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: false,
            harHattAndreInntekter: true,
            harHattInntekt: true,
            lønnPerMåned: '50000',
            situasjon: 'mor',
            jobberDuINorge: null,
        });
    },
});

export const IkkeArbeidstakerOgIkkeAndreInntekter = meta.story({
    args: createArgs(),
    test: async ({ canvas, args }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Nei');
        await svarPåAndreInntekter(canvas, 'Nei');
        await svarPåBorINorge(canvas, 'Ja');
        await seResultatet(canvas);

        await expect(args.setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: false,
            harHattAndreInntekter: false,
            situasjon: 'mor',
            harHattInntekt: null,
            jobberDuINorge: null,
            lønnPerMåned: null,
        });
    },
});

export const HalvGAlertOnBlur = meta.story({
    args: createArgs(),
    test: async ({ canvas }) => {
        await velgMor(canvas);
        await svarPåArbeid(canvas, 'Ja');
        await svarPåInntekt(canvas, 'Ja');

        const alertErSynlig = () =>
            expect(
                canvas.queryByText('For å kunne ha rett til foreldrepenger må man tjene minst', { exact: false }),
            ).toBeInTheDocument();

        const alertErIkkeSynlig = () =>
            expect(
                canvas.queryByText('For å kunne ha rett til foreldrepenger må man tjene minst', { exact: false }),
            ).not.toBeInTheDocument();

        const hvorMye = await skrivLønn(canvas, '5');
        alertErIkkeSynlig();
        await userEvent.tab();
        alertErSynlig();

        await userEvent.type(hvorMye, '0000');
        alertErIkkeSynlig();

        await userEvent.type(hvorMye, '{backspace}'.repeat(3));
        await userEvent.tab();
        alertErSynlig();
    },
});
