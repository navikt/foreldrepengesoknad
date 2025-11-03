import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { UttakOverføringÅrsak_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import Block from '../../../../common/block/Block';
import { PeriodeUttakFormComponents, PeriodeUttakFormField } from '../../periode-uttak-form/periodeUttakFormConfig';

const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

interface Props {
    navnAnnenForelder: string;
    erEndringssøknad: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
            value: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
        },
        {
            label: intl.formatMessage(
                { id: 'uttaksplan.overføringsårsaktype.SYKDOM_ANNEN_FORELDER' },
                {
                    navnAnnenForelder: navn,
                },
            ),
            value: 'SYKDOM_ANNEN_FORELDER',
        },
    ];

    if (erEndringssøknad) {
        radios.push({
            label: intl.formatMessage({ id: 'uttaksplan.overføringsårsaktype.ALENEOMSORG' }),
            value: 'ALENEOMSORG',
        } satisfies { label: string; value: UttakOverføringÅrsak_fpoversikt });
        radios.push({
            label: intl.formatMessage(
                { id: 'uttaksplan.overføringsårsaktype.IKKE_RETT_ANNEN_FORELDER' },
                {
                    navnAnnenForelder: navn,
                },
            ),
            value: 'IKKE_RETT_ANNEN_FORELDER',
        } satisfies { label: string; value: UttakOverføringÅrsak_fpoversikt });
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
// eslint-disable-next-line import/no-default-export
export default OverføringsårsakSpørsmål;
