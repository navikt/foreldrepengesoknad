import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { OverføringÅrsakType } from '@navikt/fp-common';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import Block from '../../../../common/block/Block';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

interface Props {
    navnAnnenForelder: string;
    erEndringssøknad: boolean;
}

const OverføringsårsakSpørsmål: FunctionComponent<Props> = ({ navnAnnenForelder, erEndringssøknad }) => {
    const intl = useIntl();
    const navn = capitalizeFirstLetter(navnAnnenForelder);
    const radios = [
        {
            label: intl.formatMessage(
                { id: 'uttaksplan.overføringsårsaktype.INSTITUSJONSOPPHOLD_ANNEN_FORELDER' },
                {
                    navnAnnenForelder: navn,
                },
            ),
            value: OverføringÅrsakType.institusjonsoppholdAnnenForelder,
        },
        {
            label: intl.formatMessage(
                { id: 'uttaksplan.overføringsårsaktype.SYKDOM_ANNEN_FORELDER' },
                {
                    navnAnnenForelder: navn,
                },
            ),
            value: OverføringÅrsakType.sykdomAnnenForelder,
        },
    ];

    if (erEndringssøknad) {
        radios.push({
            label: intl.formatMessage({ id: 'uttaksplan.overføringsårsaktype.ALENEOMSORG' }),
            value: OverføringÅrsakType.aleneomsorg,
        });
        radios.push({
            label: intl.formatMessage(
                { id: 'uttaksplan.overføringsårsaktype.IKKE_RETT_ANNEN_FORELDER' },
                {
                    navnAnnenForelder: navn,
                },
            ),
            value: OverføringÅrsakType.ikkeRettAnnenForelder,
        });
    }

    return (
        <Block padBottom="l">
            <PeriodeUttakFormComponents.RadioGroup
                name={PeriodeUttakFormField.overføringsårsak}
                legend={intl.formatMessage(
                    { id: 'uttaksplan.overføringsårsak' },
                    {
                        navnAnnenForelder: getNavnGenitivEierform(navnAnnenForelder, intl.locale),
                    },
                )}
                radios={radios}
                validate={(value) => {
                    if (!hasValue(value)) {
                        return intl.formatMessage({ id: 'uttaksplan.validering.overføringsårsak' });
                    }

                    return undefined;
                }}
            />
        </Block>
    );
};

export default OverføringsårsakSpørsmål;
