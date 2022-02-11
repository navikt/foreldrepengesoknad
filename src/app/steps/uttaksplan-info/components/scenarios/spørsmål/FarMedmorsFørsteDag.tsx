import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import { dateToISOString, TypedFormComponents } from '@navikt/sif-common-formik/lib';
import LenkeKnapp from 'app/components/lenke-knapp/LenkeKnapp';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { ISOStringToDate } from 'app/utils/dateUtils';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
    FormComponents: TypedFormComponents<any, any, string>;
    fieldName: string;
    familiehendelsesdato: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    morsSisteDag: Date | undefined;
    navnMor: string;
}

const FarMedmorsFørsteDag: FunctionComponent<Props> = ({
    FormComponents,
    fieldName,
    familiehendelsesdato,
    morsSisteDag,
    setFieldValue,
    navnMor,
}) => {
    const intl = useIntl();

    const maxDate = ISOStringToDate(
        uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato).maxDate
    );
    const minDate = ISOStringToDate(
        uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato).minDate
    );

    return (
        <>
            <Block padBottom="l">
                <FormComponents.DatePicker
                    name={fieldName}
                    label={intlUtils(intl, 'uttaksplaninfo.farSinFørsteUttaksdagSpørsmål.label')}
                    maxDate={maxDate}
                    minDate={minDate}
                    showYearSelector={true}
                    disableWeekend={true}
                />
            </Block>
            <LenkeKnapp
                text={
                    <FormattedMessage
                        id="uttaksplaninfo.farSinFørsteUttaksdagSpørsmål.førsteUttaksdagEtterAnnenPart"
                        values={{
                            navn: navnMor,
                            dato: formatDate(Uttaksdagen(morsSisteDag!).neste()),
                        }}
                    />
                }
                onClick={() => {
                    const farSinFørsteUttaksdag: string | undefined = morsSisteDag
                        ? dateToISOString(Uttaksdagen(morsSisteDag).neste())
                        : undefined;

                    setFieldValue(fieldName, farSinFørsteUttaksdag);
                }}
            />
        </>
    );
};

export default FarMedmorsFørsteDag;
