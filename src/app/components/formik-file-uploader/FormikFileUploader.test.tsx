import React from 'react';
import { render, screen } from '@testing-library/react';
import FormikFileUploader from './FormikFileUploader';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import IntlProvider from 'app/intl/IntlProvider';
import { Formik } from 'formik';
import { Attachment } from 'app/types/Attachment';

describe('<FormikFileUploader>', () => {
    it('skal vise opplastingskomponent men ingen opplastede vedlegg', () => {
        render(
            <Formik initialValues={{}} onSubmit={() => undefined}>
                <IntlProvider locale="nb">
                    <FormikFileUploader
                        attachments={[]}
                        name="test"
                        label="label"
                        attachmentType={AttachmentType.ADOPSJONSVEDTAK}
                        skjemanummer={Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}
                    />
                </IntlProvider>
            </Formik>
        );

        expect(screen.getByText('Opplastingsikon')).toBeInTheDocument();
        expect(screen.getByText('Les mer om hvordan du tar et bra bilde av vedlegget')).toBeInTheDocument();
    });

    it('skal vise allerede opplastede vedlegg', () => {
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
                <IntlProvider locale="nb">
                    <FormikFileUploader
                        attachments={vedlegg}
                        name="test"
                        label="label"
                        attachmentType={AttachmentType.ADOPSJONSVEDTAK}
                        skjemanummer={Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}
                    />
                </IntlProvider>
            </Formik>
        );

        expect(screen.getByText('Dette er et filnavn')).toBeInTheDocument();
        expect(screen.getByText('123 B')).toBeInTheDocument();
        expect(screen.getByText('Dette er et annet filnavn')).toBeInTheDocument();
        expect(screen.getByText('345 B')).toBeInTheDocument();
    });
});
