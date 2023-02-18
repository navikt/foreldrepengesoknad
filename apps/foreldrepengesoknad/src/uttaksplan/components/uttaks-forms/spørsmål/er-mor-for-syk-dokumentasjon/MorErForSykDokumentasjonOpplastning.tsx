import { Block } from '@navikt/fp-common';
import VeilederNormal from 'app/assets/VeilederNormal';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    vedlegg: Attachment[];
    navnMor: string;
}

const MorErForSykDokumentasjonOpplastning: FunctionComponent<Props> = ({ navnMor, vedlegg }) => {
    return (
        <>
            <Block padBottom="l">
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <FormattedMessage id="uttaksplan.erMorForSykVeileder" values={{ navn: navnMor }} />
                </Veilederpanel>
            </Block>
            <Block>
                <FormikFileUploader
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
