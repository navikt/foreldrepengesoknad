import { intlUtils, Block, hasValue, OverføringÅrsakType, getNavnGenitivEierform } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';
import { capitalizeFirstLetter } from '@navikt/fp-common/src/common/utils/stringUtils';
interface Props {
    navnAnnenForelder: string;
    erEndringssøknad: boolean;
    valgtOverføringsårsak: OverføringÅrsakType | '';
    isOpen: boolean;
}

const OverføringsårsakSpørsmål: FunctionComponent<Props> = ({ navnAnnenForelder, erEndringssøknad }) => {
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
        </>
    );
};

export default OverføringsårsakSpørsmål;
