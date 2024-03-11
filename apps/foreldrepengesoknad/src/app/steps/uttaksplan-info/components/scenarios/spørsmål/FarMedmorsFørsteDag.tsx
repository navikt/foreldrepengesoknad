import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
    Block,
    ISOStringToDate,
    Situasjon,
    Uttaksdagen,
    andreAugust2022ReglerGjelder,
    formatDate,
    intlUtils,
    uttaksplanDatoavgrensninger,
} from '@navikt/fp-common';
import { TypedFormComponents, dateToISOString } from '@navikt/fp-formik';

import LenkeKnapp from 'app/components/lenke-knapp/LenkeKnapp';

import { validateStartdatoFarMedmor } from '../far-medmor-fødsel-og-mor-har-ikke-rett/validation/farMedmorFødselOgMorHarIkkeRettValidering';

interface Props {
    FormComponents: TypedFormComponents<any, any, string>;
    fieldName: string;
    familiehendelsesdato: Date;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    morsSisteDag: Date | undefined;
    navnMor: string;
    termindato: string | undefined;
    situasjon: Situasjon;
    morHarRettTilForeldrepengerIEØS: boolean;
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
    morHarRettTilForeldrepengerIEØS,
}) => {
    const intl = useIntl();
    const termindatoDate = termindato ? dayjs(termindato).toDate() : undefined;
    const maxDate = ISOStringToDate(
        uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato, termindatoDate, situasjon)
            .maxDate,
    );
    const minDate = ISOStringToDate(
        uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato, termindatoDate, situasjon)
            .minDate,
    );

    return (
        <>
            <Block padBottom="l">
                <FormComponents.DatePicker
                    name={fieldName}
                    label={intlUtils(intl, 'uttaksplaninfo.farSinFørsteUttaksdagSpørsmål.label')}
                    maxDate={maxDate}
                    minDate={minDate}
                    disableWeekends={true}
                    dropdownCaption={true}
                    validate={validateStartdatoFarMedmor(intl, minDate!, maxDate!)}
                />
            </Block>
            {!andreAugust2022ReglerGjelder(familiehendelsesdato) && !morHarRettTilForeldrepengerIEØS && (
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
