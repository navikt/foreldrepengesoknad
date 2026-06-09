import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './SituasjonSide.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<SituasjonSide>', () => {
    it('skal ha rett til foreldrepenger når mor er i arbeid, har inntekt over grensen og bor i Norge', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[2]!);

        expect(screen.getByText(messages['SituasjonSide.JobberDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[2]!);

        expect(screen.getByText(messages['SituasjonSide.JobberDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[3]!);

        expect(
            screen.getByText(messages['SituasjonSide.MåVæreMedlem'],
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
        await userEvent.type(hvorMye, '5000');

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
        await userEvent.type(hvorMye, '5000');

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[2]!);

        expect(screen.getByText(messages['SituasjonSide.JobberDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
        await userEvent.type(hvorMye, '5000');

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[2]!);

        expect(screen.getByText(messages['SituasjonSide.JobberDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[3]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[1]!);

        expect(
            screen.getByText(messages['SituasjonSide.JobbetMinst6av10']),
        ).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[1]!);

        expect(
            screen.getByText(messages['SituasjonSide.JobbetMinst6av10']),
        ).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[2]!);

        expect(screen.getByText(messages['SituasjonSide.JobberDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[3]!);

        expect(screen.getByText(/For å kunne ha rett til foreldrepenger eller engangsstønad/)).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

            expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

            expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
            await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

            expect(
                screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
                ),
            ).toBeInTheDocument();
            await userEvent.click(screen.getByText('Ja'));

            expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
            await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[1]!);

            expect(
                screen.getByText(messages['SituasjonSide.JobbetMinst6av10']),
            ).toBeInTheDocument();

            expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
            await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[2]!);

            expect(screen.getByText(messages['SituasjonSide.JobberDuINorge'])).toBeInTheDocument();
            await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[3]!);

            expect(screen.getByText(/For å kunne ha rett til foreldrepenger eller engangsstønad/)).toBeInTheDocument();

            await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Nei']));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattAndeInntektskilder'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(screen.getByText(messages['SituasjonSide.HarDuHattInntekt'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
        await userEvent.type(hvorMye, '50000');

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[3]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

        expect(await screen.findByText(messages['FpEllerEs.Tittel'])).toBeInTheDocument();

        expect(screen.getByText(messages['SituasjonSide.HvemErDu'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));

        expect(
            screen.getByText(messages['SituasjonSide.ArbeidEllerNav'],
            ),
        ).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['SituasjonSide.Nei']));

        expect(screen.getByText(messages['SituasjonSide.HarDuHattAndeInntektskilder'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['SituasjonSide.Nei'])[1]!);

        expect(screen.getByText(messages['SituasjonSide.BorDuINorge'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        await userEvent.click(screen.getByText(messages['SituasjonSide.SeResultatet']));

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

    it('Melding om 1/2G skal først vises onBlur, men så skjules hvis man deretter skriver høyere beløp', async () => {
        const setFpEllerEsSituasjon = vi.fn();
        const utils = render(<Default setFpEllerEsSituasjon={setFpEllerEsSituasjon} />);
        await userEvent.click(screen.getByText(messages['SituasjonSide.Mor']));
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getAllByText('Ja')[1]!);
        await userEvent.click(screen.getAllByText('Ja')[2]!);

        const alertErSynlig = () =>
            expect(
                screen.queryByText('For å kunne ha rett til foreldrepenger må man tjene minst', { exact: false }),
            ).toBeInTheDocument();

        const alertErIkkeSynlig = () =>
            expect(
                screen.queryByText('For å kunne ha rett til foreldrepenger må man tjene minst', { exact: false }),
            ).not.toBeInTheDocument();

        // Skal først vise under 1/2G melding når det tabbes og beløpet er under
        const hvorMye = utils.getByLabelText(messages['SituasjonSide.LønnFørSkatt']);
        await userEvent.type(hvorMye, '5');
        alertErIkkeSynlig();
        await userEvent.tab();
        alertErSynlig();

        // Når man fortsetter å skrive skal den forsvinne idet beløpet går over 1/2G
        await userEvent.type(hvorMye, '0000');
        alertErIkkeSynlig();

        // Skal se dukke opp igjen dersom man blur'er feltet
        await userEvent.type(hvorMye, '{backspace}'.repeat(3));
        await userEvent.tab();
        alertErSynlig();
    });
});
