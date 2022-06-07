import { Block, hasValue, intlUtils } from '@navikt/fp-common';
import { UttakRundtFødselÅrsak } from 'app/types/UttakRundtFødselÅrsak';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

import { Attachment } from 'app/types/Attachment';
import MorErForSykDokumentasjonOpplastning from '../er-mor-for-syk-dokumentasjon/MorErForSykDokumentasjonOpplastning';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';

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
                <PeriodeUttakFormComponents.RadioPanelGroup
                    legend={intlUtils(intl, 'uttaksplan.uttakrundtFødselÅrsak.spørsmål')}
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
            <Block padBottom="l" visible={uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.samtidigUttak}>
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <FormattedMessage id="uttaksplan.samtidigUttakVeileder" />
                </Veilederpanel>
            </Block>
        </>
    );
};

export default UttakRundtFødselÅrsakSpørsmål;
