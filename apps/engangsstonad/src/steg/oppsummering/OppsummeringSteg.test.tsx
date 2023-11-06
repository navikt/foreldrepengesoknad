import dayjs from 'dayjs';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import { DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';

import * as stories from './OppsummeringSteg.stories';

const { BarnetErFodt, AdopsjonAvEktefellesBarn, BarnetErIkkeFodt, HarTidligereOgFremtidigeUtenlandsopphold } =
    composeStories(stories);

describe('<OppsummeringSteg>', () => {
    it('skal vise opplysninger og så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<BarnetErFodt sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Oppsummering')).toBeInTheDocument();
        expect(screen.getByText('Steg 5 av 5')).toBeInTheDocument();

        expect(screen.getByText('Deg')).toBeInTheDocument();
        expect(screen.getByText('Henrikke Ibsen')).toBeInTheDocument();
        expect(screen.getByText('11111111111')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Søknaden gjelder:')).toBeInTheDocument();
        expect(screen.getByText('ett barn')).toBeInTheDocument();
        expect(screen.getByText('Med fødselsdato:')).toBeInTheDocument();
        expect(screen.getByText(dayjs().subtract(10, 'day').format(DDMMYYYY_DATE_FORMAT))).toBeInTheDocument();

        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Du har bodd i Norge de siste 12 månedene')).toBeInTheDocument();
        expect(screen.getByText('Du skal bo i Norge de neste 12 månadene')).toBeInTheDocument();
        expect(screen.getByText('På fødselstidspunktet bodde du i Norge')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknad'));

        expect(await screen.findByText('Du må bekrefte at du har oppgitt rigtige opplysninger')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Send søknad'));

        const abortController = new AbortController();

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            abortController.signal,
            {
                antallBarn: 1,
                erBarnetFødt: true,
                fødselsdato: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
            },
            { vedlegg: [] },
            undefined,
            undefined,
        );
    });

    it('skal vise opplysninger om adopsjon og så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<AdopsjonAvEktefellesBarn sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Søknaden gjelder:')).toBeInTheDocument();
        expect(screen.getByText('ett barn')).toBeInTheDocument();
        expect(screen.getByText('Med adopsjonsdato:')).toBeInTheDocument();
        expect(screen.getAllByText('01.01.2023')).toHaveLength(2);
        expect(screen.getByText('Med fødselsdato:')).toBeInTheDocument();
        expect(screen.getByText('Vedlagt bekreftelse på omsorgsovertakelse')).toBeInTheDocument();
        expect(screen.getByText('filnavn.pdf')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Send søknad'));

        const abortController = new AbortController();

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            abortController.signal,
            {
                adopsjonAvEktefellesBarn: true,
                adopsjonsdato: '2023-01-01',
                antallBarn: 1,
                fødselsdatoer: [{ dato: '2023-01-01' }],
            },
            {
                vedlegg: [
                    {
                        file: {},
                        filename: 'filnavn.pdf',
                        filesize: 2323,
                        id: '1',
                        pending: false,
                        skjemanummer: 'I000042',
                        type: 'omsorgsovertakelse',
                        uploaded: true,
                    },
                ],
            },
            undefined,
            undefined,
        );
    });

    it('skal vise opplysninger om når barnet ikke er født og så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<BarnetErIkkeFodt sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Søknaden gjelder:')).toBeInTheDocument();
        expect(screen.getByText('ett barn')).toBeInTheDocument();
        expect(screen.getByText('Termindato:')).toBeInTheDocument();
        expect(screen.getByText('02.01.2023')).toBeInTheDocument();
        expect(screen.getByText('Terminbekreftelsen:')).toBeInTheDocument();
        expect(screen.getByText('01.01.2023')).toBeInTheDocument();
        expect(screen.getByText('Vedlagt dokumentasjon')).toBeInTheDocument();
        expect(screen.getByText('filnavn.pdf')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Send søknad'));

        const abortController = new AbortController();

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            abortController.signal,
            {
                antallBarn: 1,
                erBarnetFødt: false,
                termindato: '2023-01-02',
            },
            {
                terminbekreftelsedato: '2023-01-01',
                vedlegg: [
                    {
                        file: {},
                        filename: 'filnavn.pdf',
                        filesize: 2323,
                        id: '1',
                        pending: false,
                        skjemanummer: 'I000062',
                        type: 'terminbekreftelse',
                        uploaded: true,
                    },
                ],
            },
            undefined,
            undefined,
        );
    });

    it('skal vise opplysninger om historiske og fremtidige utenlandsforhold så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<HarTidligereOgFremtidigeUtenlandsopphold sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();

        expect(screen.getByText('Du har bodd i Island i løpet av de forrige 12 månedene')).toBeInTheDocument();
        expect(
            screen.getByText(dayjs().subtract(100, 'day').format(DDMMYYYY_DATE_FORMAT) + ' - i dag'),
        ).toBeInTheDocument();

        expect(screen.getByText('Du skal bo i Sverige i løpet av de neste 12 månedene')).toBeInTheDocument();
        expect(screen.getByText('i dag - ' + dayjs().add(100, 'day').format(DDMMYYYY_DATE_FORMAT))).toBeInTheDocument();

        expect(screen.getByText('Du skal bo i Danmark i løpet av de neste 12 månedene')).toBeInTheDocument();
        expect(
            screen.getByText(
                dayjs().add(101, 'day').format(DDMMYYYY_DATE_FORMAT) +
                    ' - ' +
                    dayjs().add(200, 'day').format(DDMMYYYY_DATE_FORMAT),
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('På fødselstidspunktet bodde du i utlandet')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Send søknad'));

        const abortController = new AbortController();

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            abortController.signal,
            {
                antallBarn: 1,
                erBarnetFødt: true,
                fødselsdato: dayjs().subtract(10, 'day').format(ISO_DATE_FORMAT),
            },
            {
                vedlegg: [],
            },
            {
                utenlandsoppholdSiste12Mnd: [
                    {
                        fom: dayjs().subtract(100, 'day').format(ISO_DATE_FORMAT),
                        landkode: 'IS',
                        tom: dayjs().format(ISO_DATE_FORMAT),
                    },
                ],
            },
            {
                utenlandsoppholdNeste12Mnd: [
                    {
                        fom: dayjs().format(ISO_DATE_FORMAT),
                        landkode: 'SE',
                        tom: dayjs().add(100, 'day').format(ISO_DATE_FORMAT),
                    },
                    {
                        fom: dayjs().add(101, 'day').format(ISO_DATE_FORMAT),
                        landkode: 'DK',
                        tom: dayjs().add(200, 'day').format(ISO_DATE_FORMAT),
                    },
                ],
            },
        );
    });
});
