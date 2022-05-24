import { Block, hasValue, intlUtils } from '@navikt/fp-common';
import { UttakRundtFødselÅrsak } from 'app/types/UttakRundtFødselÅrsak';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

import { Attachment } from 'app/types/Attachment';
import MorErForSykDokumentasjonOpplastning from '../er-mor-for-syk-dokumentasjon/MorErForSykDokumentasjonOpplastning';

interface Props {
    fieldName: PeriodeUttakFormField;
    uttakRundtFødselÅrsak: UttakRundtFødselÅrsak;
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
            label: intlUtils(intl, 'uttaksplan.uttakrundtFødseÅrsak.samtidigUttak'),
            value: UttakRundtFødselÅrsak.samtidigUttak,
        },
        {
            label: intlUtils(intl, 'uttaksplan.uttakrundtFødseÅrsak.morErForSyk'),
            value: UttakRundtFødselÅrsak.morErForSyk,
        },
    ];

    return (
        <>
            <Block padBottom="l">
                <PeriodeUttakFormComponents.RadioPanelGroup
                    legend={intlUtils(intl, 'uttaksplan.hvemSkalHaUttak')}
                    name={fieldName}
                    radios={radios}
                    useTwoColumns={true}
                    validate={(value) => {
                        if (!hasValue(value)) {
                            return intlUtils(intl, 'uttaksplan.validering.uttakRundtFødselFarMedmorWLB');
                        }
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
