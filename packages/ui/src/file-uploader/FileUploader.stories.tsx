import { Meta, StoryObj } from '@storybook/react-vite';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import { SkjemaRotLayout } from '../skjema-rotlayout/SkjemaRotLayout';
import { FileUploader } from './FileUploader';

const file1 = new File(['abc'.repeat(100000)], 'Filnavn1.jpg');
const file2 = new File(['abc'.repeat(500000)], 'Filnavn2.jpg');

const meta = {
    title: 'FileUploader',
    component: FileUploader,
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
        saveAttachment: () =>
            Promise.resolve({
                headers: {
                    location: '',
                },
                data: 'test',
            }),
        updateAttachments: () => undefined,
        existingAttachments: [
            {
                id: '1',
                innsendingsType: 'LASTET_OPP',
                filename: file1.name,
                filesize: file1.size,
                file: file1,
                pending: false,
                uploaded: true,
                type: AttachmentType.TERMINBEKREFTELSE,
                skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                url: null,
            },
            {
                id: '2',
                filename: file2.name,
                filesize: file2.size,
                file: file2,
                innsendingsType: 'LASTET_OPP',
                pending: true,
                uploaded: false,
                type: AttachmentType.TERMINBEKREFTELSE,
                skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                url: null,
            },
        ],
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
                url: null,
            },
            {
                id: '2',
                filename: file2.name,
                filesize: file2.size,
                file: file2,
                pending: true,
                uploaded: false,
                type: AttachmentType.ALENEOMSORG,
                skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG,
                innsendingsType: 'LASTET_OPP',
                url: null,
            },
        ],
        //@ts-expect-error fiks
        skjemanummerTextMap: {
            [Skjemanummer.TERMINBEKREFTELSE]: 'Terminbekreftelse',
            [Skjemanummer.DOK_AV_ALENEOMSORG]: 'Aleneomsorg',
        },
    },
};

export const OpplastingOk: Story = {
    args: {
        ...Default.args,

        existingAttachments: [],
    },
};

export const OpplastingFeiler: Story = {
    args: {
        ...Default.args,
        saveAttachment: () =>
            Promise.reject({
                headers: {
                    location: '',
                },
            }),
        existingAttachments: [],
    },
};
