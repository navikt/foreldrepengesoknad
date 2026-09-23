import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Action, ContextDataType } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import dayjs from 'dayjs';

import { AttachmentType, DDMMYYYY_DATE_FORMAT, ISO_DATE_FORMAT, Skjemanummer } from '@navikt/fp-constants';
import { Skjemautkast } from '@navikt/fp-form-hooks';
import { Attachment } from '@navikt/fp-types';

import * as stories from './DokumentasjonSteg.stories';

const { Terminbekreftelse, Adopsjonsbekreftelse } = composeStories(stories);

describe('<DokumentasjonSteg>', () => {
    it('beholder utkastet ved manglende vedlegg og når brukeren går tilbake', async () => {
        const skjemautkast: Skjemautkast = {
            route: Path.TERMINBEKREFTELSE,
            skjema: 'DokumentasjonSteg',
            verdier: { terminbekreftelsedato: dayjs().format(ISO_DATE_FORMAT), vedlegg: [] },
        };
        let lagretUtkast = skjemautkast;
        const gåTilNesteSide = vi.fn((action: Action) => {
            if (action.type === 'update' && action.data && typeof action.data === 'object' && 'skjema' in action.data) {
                lagretUtkast = action.data;
            }
        });
        const visning = render(<Terminbekreftelse skjemautkast={skjemautkast} gåTilNesteSide={gåTilNesteSide} />);
        await userEvent.click(screen.getByRole('button', { name: 'Neste steg' }));
        expect(await screen.findByText('Du må laste opp bekreftelse på termindato')).toBeInTheDocument();
        expect(gåTilNesteSide).not.toHaveBeenCalled();

        await userEvent.click(screen.getByRole('button', { name: 'Forrige steg' }));
        expect(gåTilNesteSide).toHaveBeenCalledWith({
            type: 'update',
            key: ContextDataType.SKJEMAUTKAST,
            data: skjemautkast,
        });
        visning.unmount();
        render(<Terminbekreftelse skjemautkast={lagretUtkast} />);
        expect(screen.getByLabelText('Når fikk du terminbekreftelsen?')).toHaveValue(
            dayjs().format(DDMMYYYY_DATE_FORMAT),
        );
    });

    it('beholder et nytt vedlegg selv om terminbekreftelsesdatoen mangler', async () => {
        let skjemautkast: Skjemautkast | undefined;
        const gåTilNesteSide = vi.fn((action: Action) => {
            if (action.type === 'update' && action.data && typeof action.data === 'object' && 'skjema' in action.data) {
                skjemautkast = action.data;
            }
        });
        const mellomlagreOgNaviger = vi.fn(() => new Promise<void>(() => {}));
        await Terminbekreftelse.run({ args: { ...Terminbekreftelse.args, gåTilNesteSide, mellomlagreOgNaviger } });
        await userEvent.upload(
            screen.getByLabelText('Last opp bekreftelse på termindato'),
            new File(['filinnhold-som-ikke-skal-mellomlagres'], 'bekreftelse.png', { type: 'image/png' }),
        );
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());
        await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));
        await userEvent.click(screen.getByRole('button', { name: 'Ok' }));

        expect(skjemautkast?.verdier).toMatchObject({
            vedlegg: [expect.objectContaining({ uuid: 'uuid-test', uploaded: true, filename: 'bekreftelse.png' })],
        });
        const serialisert = JSON.stringify(skjemautkast);
        expect(serialisert).not.toContain('filinnhold-som-ikke-skal-mellomlagres');
        expect(gåTilNesteSide).toHaveBeenCalledTimes(1);
        const gjenåpnet = render(<Terminbekreftelse skjemautkast={JSON.parse(serialisert) as Skjemautkast} />);
        expect(within(gjenåpnet.container).getByText('bekreftelse.png')).toBeInTheDocument();
        expect(within(gjenåpnet.container).getByLabelText('Når fikk du terminbekreftelsen?')).toHaveValue('');
    });

    it('skal laste opp terminbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();
        await Terminbekreftelse.run({
            args: { ...Terminbekreftelse.args, gåTilNesteSide, mellomlagreOgNaviger },
        });
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getAllByText('Bekreft termin')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getByText('Du må rette opp i følgende feil:')).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi terminbekreftelse dato')).toHaveLength(2);

        const terminbekreftelse = screen.getByLabelText('Når fikk du terminbekreftelsen?');
        await userEvent.type(terminbekreftelse, dayjs().format(DDMMYYYY_DATE_FORMAT));
        fireEvent.blur(terminbekreftelse);

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må laste opp bekreftelse på termindato')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Last opp bekreftelse på termindato');

        await userEvent.upload(fileInput, file);

        // Vent til opplastinga er ferdig (pending = false) før vi går vidare, elles
        // sender vi steget med eit uferdig vedlegg. Opplastinga er ekte async i browser-modus.
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                terminbekreftelsedato: dayjs().format(ISO_DATE_FORMAT),
                vedlegg: [
                    expect.objectContaining({
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                        type: AttachmentType.TERMINBEKREFTELSE,
                        uploaded: true,
                        uuid: 'uuid-test',
                        innsendingsType: 'LASTET_OPP',
                        id: expect.any(String),
                        file: expect.any(Object),
                    } satisfies Attachment),
                ],
            },
            key: ContextDataType.DOKUMENTASJON,
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.UTENLANDSOPPHOLD,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });

    it('skal laste opp adopsjonsbekreftelse', async () => {
        const gåTilNesteSide = vi.fn();
        const mellomlagreOgNaviger = vi.fn();
        await Adopsjonsbekreftelse.run({
            args: { ...Adopsjonsbekreftelse.args, gåTilNesteSide, mellomlagreOgNaviger },
        });
        expect(await screen.findByText('Søknad om engangsstønad')).toBeInTheDocument();

        expect(screen.getAllByText('Bekreft adopsjon')).toHaveLength(2);
        expect(screen.getByText('Steg 3 av 5')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        await userEvent.click(screen.getByText('Neste steg'));

        expect(await screen.findByText('Du må laste opp bekreftelse på adopsjon')).toBeInTheDocument();

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const fileInput = screen.getByLabelText('Bekreftelse på adopsjon');
        await userEvent.upload(fileInput, file);

        // Vent til opplastinga er ferdig (pending = false) før vi går vidare.
        await waitFor(() => expect(screen.queryByText('Laster opp...')).not.toBeInTheDocument());

        await userEvent.click(screen.getByText('Neste steg'));

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
            data: {
                vedlegg: [
                    expect.objectContaining({
                        filename: 'hello.png',
                        filesize: 5,
                        pending: false,
                        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
                        type: AttachmentType.OMSORGSOVERTAKELSE,
                        uploaded: true,
                        innsendingsType: 'LASTET_OPP',
                        uuid: 'uuid-test',
                        id: expect.any(String),
                        file: expect.any(Object),
                    } satisfies Attachment),
                ],
            },
            key: 'DOKUMENTASJON',
            type: 'update',
        });

        expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
            data: Path.UTENLANDSOPPHOLD,
            key: ContextDataType.CURRENT_PATH,
            type: 'update',
        });

        expect(mellomlagreOgNaviger).toHaveBeenCalledOnce();
    });
});
