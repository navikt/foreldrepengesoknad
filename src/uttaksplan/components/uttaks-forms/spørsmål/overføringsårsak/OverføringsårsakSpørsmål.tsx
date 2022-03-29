import { intlUtils, Block, hasValue } from '@navikt/fp-common';
import VeilederNormal from 'app/assets/VeilederNormal';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { getNavnGenitivEierform } from 'uttaksplan/utils/stønadskontoerUtils';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

interface Props {
    vedlegg: Attachment[];
    navnAnnenForelder: string;
}

const OverføringsårsakSpørsmål: FunctionComponent<Props> = ({ vedlegg, navnAnnenForelder }) => {
    const intl = useIntl();

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.RadioPanelGroup
                    name={PeriodeUttakFormField.overføringsårsak}
                    legend={intlUtils(intl, 'uttaksplan.overføringsårsak', {
                        navnAnnenForelder: getNavnGenitivEierform(navnAnnenForelder, intl.locale),
                    })}
                    radios={[
                        {
                            label: intlUtils(
                                intl,
                                'uttaksplan.overføringsårsaktype.INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
                                { navnAnnenForelder }
                            ),
                            value: OverføringÅrsakType.institusjonsoppholdAnnenForelder,
                        },
                        {
                            label: intlUtils(intl, 'uttaksplan.overføringsårsaktype.SYKDOM_ANNEN_FORELDER', {
                                navnAnnenForelder,
                            }),
                            value: OverføringÅrsakType.sykdomAnnenForelder,
                        },
                    ]}
                    useTwoColumns={true}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intlUtils(intl, 'uttaksplan.validering.overføringsårsak');
                        }
                    }}
                />
            </Block>
            <Block padBottom="l">
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <FormattedMessage
                        id="uttaksplan.overføringsårsak.informasjonVedSykdomAnnenForelder"
                        values={{ navnAnnenForelder }}
                    />
                </Veilederpanel>
            </Block>
            <Block padBottom="l">
                <FormikFileUploader
                    label={intlUtils(intl, 'uttaksplan.overføringsårsak.dokumentasjon')}
                    name={PeriodeUttakFormField.overføringsdokumentasjon}
                    attachments={vedlegg || []}
                    attachmentType={AttachmentType.OVERFØRING_KVOTE}
                    skjemanummer={Skjemanummer.DOK_OVERFØRING_FOR_SYK}
                />
            </Block>
        </>
    );
};

export default OverføringsårsakSpørsmål;
