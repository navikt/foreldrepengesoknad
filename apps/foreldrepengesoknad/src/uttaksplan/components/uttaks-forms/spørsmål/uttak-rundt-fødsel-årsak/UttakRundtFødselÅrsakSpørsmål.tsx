import { Block, hasValue, intlUtils } from '@navikt/fp-common';
import { UttakRundtFødselÅrsak } from 'app/types/UttakRundtFødselÅrsak';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

import { Attachment } from 'app/types/Attachment';
import MorErForSykDokumentasjonOpplastning from '../er-mor-for-syk-dokumentasjon/MorErForSykDokumentasjonOpplastning';

interface Props {
    fieldName: PeriodeUttakFormField;
    uttakRundtFødselÅrsak: UttakRundtFødselÅrsak | '';
    vedlegg: Attachment[];
    navnMor: string;
}

const UttakRundtFødselÅrsakSpørsmål: FunctionComponent<Props> = ({
    fieldName,
    uttakRundtFødselÅrsak,
    navnMor,
    vedlegg,
}) => {
    const intl = useIntl();
    const radios = [
        {
            label: intlUtils(intl, 'ja'),
            value: UttakRundtFødselÅrsak.samtidigUttak,
        },
        {
            label: intlUtils(intl, 'uttaksplan.uttakrundtFødselÅrsak.nei.morErForSyk'),
            value: UttakRundtFødselÅrsak.morErForSyk,
        },
    ];

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.RadioGroup
                    legend={intlUtils(intl, 'uttaksplan.uttakrundtFødselÅrsak.spørsmål')}
                    name={fieldName}
                    radios={radios}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intlUtils(intl, 'uttaksplan.validering.uttakRundtFødselFarMedmorWLB');
                        }

                        return undefined;
                    }}
                />
            </Block>
            <Block padBottom="l" visible={uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.morErForSyk}>
                <MorErForSykDokumentasjonOpplastning navnMor={navnMor} vedlegg={vedlegg} />
            </Block>
        </>
    );
};

export default UttakRundtFødselÅrsakSpørsmål;
