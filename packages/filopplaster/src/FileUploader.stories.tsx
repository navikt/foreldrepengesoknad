import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, delay, http } from 'msw';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { AttachmentError } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

import { FileUploader } from './FileUploader';

const file1 = new File(['abc'.repeat(100000)], 'Filnavn1.jpg');
const file2 = new File(['abc'.repeat(500000)], 'Filnavn2.jpg');

const MOCK_API_PATH = `${import.meta.env.BASE_URL}/mock`;

const meta = {
    title: 'FileUploader',
    component: FileUploader,
    parameters: {
        msw: {
            handlers: [
                http.post(
                    MOCK_API_PATH,
                    () =>
                        new HttpResponse(JSON.stringify('uuid-test'), {
                            status: 200,
                        }),
                ),
            ],
        },
    },
    render: (props) => {
        return (
            <SkjemaRotLayout pageTitle="FileUploader">
                <FileUploader {...props} />
            </SkjemaRotLayout>
        );
    },
} satisfies Meta<typeof FileUploader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Last opp fil',
        attachmentType: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE,
        uploadPath: MOCK_API_PATH,
        updateAttachments: () => undefined,
        existingAttachments: [],
    },
};

export const VisEksisterendeVedleggGruppert: Story = {
    args: {
        ...Default.args,
        existingAttachments: [
            {
                id: '1',
                filename: file1.name,
                filesize: file1.size,
                file: file1,
                pending: false,
                uploaded: true,
                type: AttachmentType.TERMINBEKREFTELSE,
                skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                innsendingsType: 'LASTET_OPP',
            },
            {
                id: '2',
                filename: file2.name,
                filesize: file2.size,
                file: file2,
                pending: false,
                uploaded: true,
                type: AttachmentType.ALENEOMSORG,
                skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
                innsendingsType: 'LASTET_OPP',
            },
        ],
        skjemanummerTextMap: {
            [Skjemanummer.TERMINBEKREFTELSE]: 'Terminbekreftelse',
            [Skjemanummer.DOK_AV_ALENEOMSORG]: 'Aleneomsorg',
        } as Record<Skjemanummer, string>,
    },
};

export const OpplastningServerFeil: Story = {
    args: {
        ...Default.args,
        existingAttachments: [],
    },
    parameters: {
        msw: {
            handlers: [
                http.post(
                    MOCK_API_PATH,
                    () =>
                        new HttpResponse(null, {
                            status: 500,
                        }),
                ),
            ],
        },
    },
};

export const OpplastningTimeout: Story = {
    args: {
        ...Default.args,
        existingAttachments: [],
        timeout: 10,
    },
    parameters: {
        msw: {
            handlers: [
                http.post(MOCK_API_PATH, async () => {
                    await delay(20); // 20ms delay - longer than the 10ms timeout
                    return new HttpResponse(JSON.stringify('uuid-test'), {
                        status: 200,
                    });
                }),
            ],
        },
    },
};

export const AlleMuligeOpplastningsFeil: Story = {
    args: {
        ...Default.args,
        existingAttachments: (
            [
                'NO_DATA',
                'TIMEOUT',
                'DUPLIKAT_FORSENDELSE',
                'MELLOMLAGRING_VEDLEGG_VIRUSSCAN_TIMEOUT',
                'MELLOMLAGRING_VEDLEGG_PASSORD_BESKYTTET',
                'SERVER_ERROR',
                'IKKE_TILGANG',
                'MELLOMLAGRING',
                'MELLOMLAGRING_VEDLEGG',
                'KRYPTERING_MELLOMLAGRING',
            ] satisfies AttachmentError[]
        ).map((error) => {
            const file = new File(['abc'.repeat(100000)], `${error}.pdf`);

            return {
                id: error,
                error,
                filename: file.name,
                filesize: file.size,
                file: file,
                pending: false,
                uploaded: false,
                type: AttachmentType.TERMINBEKREFTELSE,
                skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                innsendingsType: 'LASTET_OPP',
            };
        }),
    },
};
