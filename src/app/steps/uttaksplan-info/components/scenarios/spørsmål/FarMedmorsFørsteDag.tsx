import { Block, formatDate, intlUtils } from '@navikt/fp-common';
import { dateToISOString, TypedFormComponents } from '@navikt/sif-common-formik/lib';
import LenkeKnapp from 'app/components/lenke-knapp/LenkeKnapp';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { uttaksplanDatoavgrensninger } from 'app/steps/uttaksplan-info/utils/uttaksplanDatoavgrensninger';
import { Situasjon } from 'app/types/Situasjon';
import { andreAugust2022ReglerGjelder, ISOStringToDate } from 'app/utils/dateUtils';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
    FormComponents: TypedFormComponents<any, any, string>;
    fieldName: string;
    familiehendelsesdato: Date;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    morsSisteDag: Date | undefined;
    navnMor: string;
    termindato: Date | undefined;
    situasjon: Situasjon;
}

const FarMedmorsFørsteDag: FunctionComponent<Props> = ({
    FormComponents,
    fieldName,
    familiehendelsesdato,
    morsSisteDag,
    setFieldValue,
    navnMor,
    termindato,
    situasjon,
}) => {
    const intl = useIntl();
    const maxDate = ISOStringToDate(
        uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato, termindato, situasjon).maxDate
    );
    const minDate = ISOStringToDate(
        uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato, termindato, situasjon).minDate
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
                    placeholder={'dd.mm.åååå'}
                />
            </Block>
            {!andreAugust2022ReglerGjelder(familiehendelsesdato) && (
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
            )}
        </>
    );
};

export default FarMedmorsFørsteDag;
