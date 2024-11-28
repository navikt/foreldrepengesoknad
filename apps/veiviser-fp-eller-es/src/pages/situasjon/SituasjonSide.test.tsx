import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './SituasjonSide.stories';

const { Default } = composeStories(stories);

describe('<SituasjonSide>', () => {
    it('skal ha rett til foreldrepenger når mor er i arbeid, har inntekt over grensen og bor i Norge', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const hvorMye = utils.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '50000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
            jobberDuINorge: null,
        });
    });

    it('skal ha rett til foreldrepenger når en ikke bor i Norge men er medlem av folketrygden', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const hvorMye = utils.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Jobber du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: true,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '50000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
        });
    });

    it('skal ikke ha rett til foreldrepenger når en ikke bor i Norge og ikke er medlem av folketrygden', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const hvorMye = utils.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Jobber du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[3]);

        expect(
            screen.getByText(
                'For å kunne ha rett til foreldrepenger eller engangsstønad må man være medlem av folketrygden',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: false,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '50000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
        });
    });

    it('skal har rett til engangsstønad når mor har inntekt under grensen og bor i Norge', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const hvorMye = utils.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '5000');

        expect(
            screen.getByText('For å kunne ha rett til foreldrepenger må man tjene minst 62 014 kr i året'),
        ).toBeInTheDocument();

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '5000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
            jobberDuINorge: null,
        });
    });

    it('skal har rett til engangsstønad når mor har inntekt under grensen, ikke bor i Norge men har medlemskap i folketrygden', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const hvorMye = utils.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '5000');

        expect(
            screen.getByText('For å kunne ha rett til foreldrepenger må man tjene minst 62 014 kr i året'),
        ).toBeInTheDocument();

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Jobber du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: true,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '5000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
        });
    });

    it('skal ikke ha rett til engangsstønad når mor har inntekt under grensen, ikke bor i Norge og ikke har medlemskap i folketrygden', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        const hvorMye = utils.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '5000');

        expect(
            screen.getByText('For å kunne ha rett til foreldrepenger må man tjene minst 62 014 kr i året'),
        ).toBeInTheDocument();

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Jobber du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[3]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: false,
            erIArbeid: true,
            harHattInntekt: true,
            lønnPerMåned: '5000',
            situasjon: 'mor',
            harHattAndreInntekter: null,
        });
    });

    it('skal ha rett til engangsstønad når en ikke har inntekt de siste 6 av 10 månendene, men bor i Norge', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]);

        expect(
            screen.getByText('For å kunne ha rett til foreldrepenger må man ha jobbet 6 av de 10 siste månedene'),
        ).toBeInTheDocument();

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: true,
            harHattInntekt: false,
            situasjon: 'mor',
            harHattAndreInntekter: null,
            jobberDuINorge: null,
            lønnPerMåned: null,
        });
    });

    it('skal ha rett til engangsstønad når en ikke har inntekt de siste 6 av 10 månendene, ikke bor i Norge, men har medlemskap i Folketrygden', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]);

        expect(
            screen.getByText('For å kunne ha rett til foreldrepenger må man ha jobbet 6 av de 10 siste månedene'),
        ).toBeInTheDocument();

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[2]);

        expect(screen.getByText('Jobber du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[3]);

        expect(screen.getByText(/For å kunne ha rett til foreldrepenger eller engangsstønad/)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: false,
            jobberDuINorge: true,
            erIArbeid: true,
            harHattInntekt: false,
            situasjon: 'mor',
            harHattAndreInntekter: null,
            lønnPerMåned: null,
        });
    });

    it(
        'skal ikke ha rett til engangsstønad når en ikke har inntekt de siste 6 av 10 månendene, ' +
            'ikke bor i Norge og ikke har medlemskap i Folketrygden',
        async () => {
            const setFpEllerEsSituasjon = vi.fn();
            render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

            expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

            expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
            await userEvent.click(screen.getByText('Mor'));

            expect(
                screen.getByText(
                    'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja'));

            expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
            await userEvent.click(screen.getAllByText('Nei')[1]);

            expect(
                screen.getByText('For å kunne ha rett til foreldrepenger må man ha jobbet 6 av de 10 siste månedene'),
            ).toBeInTheDocument();

            expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
            await userEvent.click(screen.getAllByText('Nei')[2]);

            expect(screen.getByText('Jobber du i Norge?')).toBeInTheDocument();
            await userEvent.click(screen.getAllByText('Nei')[3]);

            expect(screen.getByText(/For å kunne ha rett til foreldrepenger eller engangsstønad/)).toBeInTheDocument();

            await userEvent.click(screen.getByText('Se resultatet'));

            expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
                borDuINorge: false,
                jobberDuINorge: false,
                harHattInntekt: false,
                erIArbeid: true,
                situasjon: 'mor',
                harHattAndreInntekter: null,
                lønnPerMåned: null,
            });
        },
    );

    it('skal ha rett til foreldrepenger når en ikke er arbeidstaker men har andre inntektskilder', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Har du andre inntektskilder?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]);

        expect(screen.getByText('Har du hatt inntekt 6 av de 10 siste månedene?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        const hvorMye = utils.getByLabelText('Omtrent hvor mye tjener du i måneden før skatt?');
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: false,
            harHattAndreInntekter: true,
            harHattInntekt: true,
            lønnPerMåned: '50000',
            situasjon: 'mor',
            jobberDuINorge: null,
        });
    });

    it('skal ha rett til engangsstønad når en ikke er arbeidstaker og ikke har andre inntektskilder, men bor i Norge', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText('Foreldrepenger eller engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Hvem er du?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(
            screen.getByText(
                'Er du arbeidstaker, frilanser, selvstendig næringsdrivende eller mottar du utbetalinger fra Nav?',
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Nei'));

        expect(screen.getByText('Har du andre inntektskilder?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]);

        expect(screen.getByText('Bor du i Norge?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]);

        await userEvent.click(screen.getByText('Se resultatet'));

        expect(setFpEllerEsSituasjon).toHaveBeenNthCalledWith(1, {
            borDuINorge: true,
            erIArbeid: false,
            harHattAndreInntekter: false,
            situasjon: 'mor',
            harHattInntekt: null,
            jobberDuINorge: null,
            lønnPerMåned: null,
        });
    });
});
