import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
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
        expect(screen.getByText('01.01.2023')).toBeInTheDocument();

        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();
        expect(screen.getByText('Utenlandsperioder:')).toBeInTheDocument();
        expect(screen.getByText('Norge')).toBeInTheDocument();
        expect(screen.getByText('og var på fødselstidspunktet')).toBeInTheDocument();
        expect(screen.getByText('i Norge')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknad'));

        expect(await screen.findByText('Du må bekrefte at du har oppgitt rigtige opplysninger')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Send søknad'));

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            {
                antallBarn: 1,
                erBarnetFødt: true,
                fødselsdatoer: [{ dato: '2023-01-01' }],
            },
            { harKunBoddINorge: true },
            { vedlegg: [] },
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

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            {
                adopsjonAvEktefellesBarn: true,
                adopsjonsdato: '2023-01-01',
                antallBarn: 1,
                fødselsdatoer: [{ dato: '2023-01-01' }],
            },
            { harKunBoddINorge: true },
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

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            {
                antallBarn: 1,
                erBarnetFødt: false,
                termindato: '2023-01-02',
            },
            { harKunBoddINorge: true },
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
        );
    });

    it('skal vise opplysninger om historiske og fremtidige utenlandsforhold så sende søknad', async () => {
        const sendSøknad = vi.fn();

        render(<HarTidligereOgFremtidigeUtenlandsopphold sendSøknad={sendSøknad} />);

        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getByText('Bo i utlandet')).toBeInTheDocument();

        expect(screen.getByText('Utenlandsperioder:')).toBeInTheDocument();
        expect(screen.getByText('Island')).toBeInTheDocument();
        expect(screen.getByText('27.03.2023 - 05.04.2023')).toBeInTheDocument();
        expect(screen.getByText('Sverige')).toBeInTheDocument();
        expect(screen.getByText('22.12.2023 - 21.01.2024')).toBeInTheDocument();
        expect(screen.getByText('Danmark')).toBeInTheDocument();
        expect(screen.getByText('27.05.2023 - 05.07.2023')).toBeInTheDocument();

        expect(screen.getByText('og var på fødselstidspunktet')).toBeInTheDocument();
        expect(screen.getByText('i Norge')).toBeInTheDocument();

        await userEvent.click(
            screen.getByText(
                'De opplysninger jeg har oppgitt er riktige og jeg har ikke holdt tilbake opplysninger som har betydning for min rett til engangsstønad.',
            ),
        );

        await userEvent.click(screen.getByText('Send søknad'));

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            {
                antallBarn: 1,
                erBarnetFødt: true,
                fødselsdatoer: [{ dato: '2023-01-01' }],
            },
            { harKunBoddINorge: false },
            {
                vedlegg: [],
            },
            {
                perioder: [
                    {
                        fom: '2023-12-22',
                        harFlyttetUtForMerEnn12MånderSiden: false,
                        landkode: 'SE',
                        skalBoIUtlandetMerEnEttÅrFremover: false,
                        tom: '2024-01-21',
                    },
                    {
                        fom: '2023-05-27',
                        harFlyttetUtForMerEnn12MånderSiden: false,
                        landkode: 'DK',
                        skalBoIUtlandetMerEnEttÅrFremover: false,
                        tom: '2023-07-05',
                    },
                    {
                        fom: '2023-03-27',
                        harFlyttetUtForMerEnn12MånderSiden: false,
                        landkode: 'IS',
                        skalBoIUtlandetMerEnEttÅrFremover: false,
                        tom: '2023-04-05',
                    },
                ],
            },
        );
    });
});
