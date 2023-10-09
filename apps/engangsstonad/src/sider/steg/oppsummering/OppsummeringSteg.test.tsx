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

        expect(screen.getByText('Utenlandsopphold')).toBeInTheDocument();
        expect(screen.getByText('De siste 12 månedene har jeg bodd i:')).toBeInTheDocument();
        expect(screen.getByText('Norge')).toBeInTheDocument();
        expect(screen.getByText('De neste 12 månedene skal jeg bo i')).toBeInTheDocument();
        expect(screen.getByText('Kun bo i Norge')).toBeInTheDocument();
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
            { harBoddUtenforNorgeSiste12Mnd: false, skalBoUtenforNorgeNeste12Mnd: false },
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

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            {
                adopsjonAvEktefellesBarn: true,
                adopsjonsdato: '2023-01-01',
                antallBarn: 1,
                fødselsdatoer: [{ dato: '2023-01-01' }],
            },
            { harBoddUtenforNorgeSiste12Mnd: false, skalBoUtenforNorgeNeste12Mnd: false },
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

        await waitFor(() => expect(sendSøknad).toHaveBeenCalledTimes(1));
        expect(sendSøknad).toHaveBeenNthCalledWith(
            1,
            {
                antallBarn: 1,
                erBarnetFødt: false,
                termindato: '2023-01-02',
            },
            { harBoddUtenforNorgeSiste12Mnd: false, skalBoUtenforNorgeNeste12Mnd: false },
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

        expect(screen.getByText('Utenlandsopphold')).toBeInTheDocument();

        expect(screen.getByText('De siste 12 månedene har jeg bodd i:')).toBeInTheDocument();
        expect(screen.getByText('Island')).toBeInTheDocument();
        expect(screen.getByText('01.01.2021 - 01.01.2022')).toBeInTheDocument();

        expect(screen.getByText('De neste 12 månedene skal jeg bo i')).toBeInTheDocument();
        expect(screen.getByText('Sverige')).toBeInTheDocument();
        expect(screen.getByText('01.01.2025 - 01.01.2026')).toBeInTheDocument();
        expect(screen.getByText('Danmark')).toBeInTheDocument();
        expect(screen.getByText('01.01.2027 - 01.01.2028')).toBeInTheDocument();

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
            { harBoddUtenforNorgeSiste12Mnd: true, skalBoUtenforNorgeNeste12Mnd: true },
            {
                vedlegg: [],
            },
            {
                utenlandsoppholdSiste12Mnd: [
                    {
                        landkode: 'IS',
                        fom: '2021-01-01',
                        tom: '2022-01-01',
                    },
                ],
            },
            {
                utenlandsoppholdNeste12Mnd: [
                    {
                        landkode: 'SE',
                        fom: '2025-01-01',
                        tom: '2026-01-01',
                    },
                    {
                        landkode: 'DK',
                        fom: '2027-01-01',
                        tom: '2028-01-01',
                    },
                ],
            },
        );
    });
});
