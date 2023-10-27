import { render, screen } from '@testing-library/react';
import FormikFileUploader from './FormikFileUploader';
import { Formik } from 'formik';
import { Attachment, AttachmentType, Skjemanummer } from '../../types';

describe('<FormikFileUploader>', () => {
    it.skip('skal vise opplastingskomponent men ingen opplastede vedlegg', () => {
        render(
            <Formik initialValues={{}} onSubmit={() => undefined}>
                <FormikFileUploader
                    legend="test"
                    attachments={[]}
                    name="test"
                    label="label"
                    attachmentType={AttachmentType.ADOPSJONSVEDTAK}
                    skjemanummer={Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}
                    saveAttachment={() => null}
                />
            </Formik>,
        );

        expect(screen.getByText('Opplastingsikon')).toBeInTheDocument();
        expect(screen.getByText('Les mer om hvordan du tar et bra bilde av vedlegget')).toBeInTheDocument();
    });

    it.skip('skal vise allerede opplastede vedlegg', () => {
        const vedlegg = [
            {
                filename: 'Dette er et filnavn',
                filesize: 123,
                pending: false,
                url: 'www.nav.no',
            },
            {
                filename: 'Dette er et annet filnavn',
                filesize: 345,
                pending: true,
            },
        ] as Attachment[];

        render(
            <Formik initialValues={{}} onSubmit={() => undefined}>
                <FormikFileUploader
                    legend="test"
                    attachments={vedlegg}
                    name="test"
                    label="label"
                    attachmentType={AttachmentType.ADOPSJONSVEDTAK}
                    skjemanummer={Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}
                    saveAttachment={() => null}
                />
            </Formik>,
        );

        expect(screen.getByText('Dette er et filnavn')).toBeInTheDocument();
        expect(screen.getByText('123 B')).toBeInTheDocument();
        expect(screen.getByText('Dette er et annet filnavn')).toBeInTheDocument();
        expect(screen.getByText('345 B')).toBeInTheDocument();
    });
});
