import { Block } from '@navikt/fp-common';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { GuidePanel } from '@navikt/ds-react';

interface Props {
    vedlegg: Attachment[];
    navnMor: string;
    isOpen: boolean;
}

const MorErForSykDokumentasjonOpplastning: FunctionComponent<Props> = ({ navnMor, vedlegg, isOpen }) => {
    return (
        <>
            <Block padBottom="l">
                <GuidePanel>
                    <FormattedMessage id="uttaksplan.erMorForSykVeileder" values={{ navn: navnMor }} />
                </GuidePanel>
            </Block>
            <Block visible={isOpen}>
                <FormikFileUploader
                    legend="Dokumentasjon for mors sykdom"
                    label="Last opp dokumentasjon for mors sykdom"
                    name={PeriodeUttakFormField.erMorForSykDokumentasjon}
                    attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
                    skjemanummer={Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM}
                    attachments={vedlegg}
                />
            </Block>
        </>
    );
};

export default MorErForSykDokumentasjonOpplastning;
