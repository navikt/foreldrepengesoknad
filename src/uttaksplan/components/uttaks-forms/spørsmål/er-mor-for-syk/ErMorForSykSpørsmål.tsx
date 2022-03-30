import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import VeilederNormal from 'app/assets/VeilederNormal';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    fieldName: PeriodeUttakFormField;
    erMorForSyk: YesOrNo;
    vedlegg: Attachment[];
    navnMor: string;
}

const ErMorForSykSpørsmål: FunctionComponent<Props> = ({ fieldName, erMorForSyk, navnMor, vedlegg }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.YesOrNoQuestion
                    name={fieldName}
                    legend={intlUtils(intl, 'uttaksplan.erMorForSyk')}
                    validate={(value: YesOrNo) => {
                        if (value === YesOrNo.UNANSWERED) {
                            return intlUtils(intl, 'uttaksplan.validering.erMorForSyk');
                        }
                    }}
                />
            </Block>
            <Block padBottom="l" visible={erMorForSyk === YesOrNo.YES}>
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <FormattedMessage id="uttaksplan.erMorForSykVeileder" values={{ navn: navnMor }} />
                </Veilederpanel>
            </Block>
            <Block padBottom="l" visible={erMorForSyk === YesOrNo.YES}>
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

export default ErMorForSykSpørsmål;
