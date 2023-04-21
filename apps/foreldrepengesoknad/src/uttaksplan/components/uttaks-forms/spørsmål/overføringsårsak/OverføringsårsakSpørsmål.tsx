import { intlUtils, Block, hasValue } from '@navikt/fp-common';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { Attachment } from 'app/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { getNavnGenitivEierform } from 'uttaksplan/utils/stønadskontoerUtils';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { capitalizeFirstLetter } from 'app/utils/stringUtils';
import { GuidePanel } from '@navikt/ds-react';
interface Props {
    vedlegg: Attachment[];
    navnAnnenForelder: string;
    erEndringssøknad: boolean;
    valgtOverføringsårsak: OverføringÅrsakType | '';
}

const OverføringsårsakSpørsmål: FunctionComponent<Props> = ({
    vedlegg,
    navnAnnenForelder,
    erEndringssøknad,
    valgtOverføringsårsak,
}) => {
    const intl = useIntl();
    const navn = capitalizeFirstLetter(navnAnnenForelder);
    const radios = [
        {
            label: intlUtils(intl, 'uttaksplan.overføringsårsaktype.INSTITUSJONSOPPHOLD_ANNEN_FORELDER', {
                navnAnnenForelder: navn,
            }),
            value: OverføringÅrsakType.institusjonsoppholdAnnenForelder,
        },
        {
            label: intlUtils(intl, 'uttaksplan.overføringsårsaktype.SYKDOM_ANNEN_FORELDER', {
                navnAnnenForelder: navn,
            }),
            value: OverføringÅrsakType.sykdomAnnenForelder,
        },
    ];

    if (erEndringssøknad) {
        radios.push({
            label: intlUtils(intl, 'uttaksplan.overføringsårsaktype.ALENEOMSORG'),
            value: OverføringÅrsakType.aleneomsorg,
        });
        radios.push({
            label: intlUtils(intl, 'uttaksplan.overføringsårsaktype.IKKE_RETT_ANNEN_FORELDER', {
                navnAnnenForelder: navn,
            }),
            value: OverføringÅrsakType.ikkeRettAnnenForelder,
        });
    }

    const beOmDokumentasjon =
        valgtOverføringsårsak !== '' &&
        valgtOverføringsårsak !== OverføringÅrsakType.aleneomsorg &&
        valgtOverføringsårsak !== OverføringÅrsakType.ikkeRettAnnenForelder;

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.RadioGroup
                    name={PeriodeUttakFormField.overføringsårsak}
                    legend={intlUtils(intl, 'uttaksplan.overføringsårsak', {
                        navnAnnenForelder: getNavnGenitivEierform(navnAnnenForelder, intl.locale),
                    })}
                    radios={radios}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intlUtils(intl, 'uttaksplan.validering.overføringsårsak');
                        }

                        return undefined;
                    }}
                />
            </Block>
            {beOmDokumentasjon && (
                <Block padBottom="l">
                    <GuidePanel>
                        <FormattedMessage
                            id="uttaksplan.overføringsårsak.informasjonVedSykdomAnnenForelder"
                            values={{ navnAnnenForelder }}
                        />
                    </GuidePanel>
                </Block>
            )}
            {beOmDokumentasjon && (
                <Block padBottom="l">
                    <FormikFileUploader
                        legend="Dokumentasjon for overføringsårsak"
                        label={intlUtils(intl, 'uttaksplan.overføringsårsak.dokumentasjon')}
                        name={PeriodeUttakFormField.overføringsdokumentasjon}
                        attachments={vedlegg || []}
                        attachmentType={AttachmentType.OVERFØRING_KVOTE}
                        skjemanummer={Skjemanummer.DOK_OVERFØRING_FOR_SYK}
                    />
                </Block>
            )}
        </>
    );
};

export default OverføringsårsakSpørsmål;
