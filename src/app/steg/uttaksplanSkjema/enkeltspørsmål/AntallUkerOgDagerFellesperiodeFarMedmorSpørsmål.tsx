import * as React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import ValiderbarUkerDagerTeller from 'common/lib/validation/elements/ValiderbarUkerDagerTeller';
import { LabelWithInfo } from '@navikt/sif-common-formik/lib';

interface AntallUkerOgDagerFellesperiodeFarMedmorProps {
    antallUkerFellesperiode: number;
}

type Props = AntallUkerOgDagerFellesperiodeFarMedmorProps & UttaksplanSkjemaspørsmålProps;

const getUkerOgDagerRegler = (uker = 0, maksUker: number, dager = 0, intl: IntlShape): Validator[] => {
    const maksDager = maksUker * 5;
    const valgtAntallDager = uker * 5 + dager;

    return [
        {
            test: () => valgtAntallDager <= maksDager && valgtAntallDager >= 0,
            failText: getMessage(intl, 'valideringsfeil.uttaksplanskjema.forMangeUkerPeriodeFarMedmor', {
                uker: maksUker,
            }),
        },
    ];
};

const AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål: React.StatelessComponent<Props> = ({
    visible,
    antallUkerFellesperiode,
}) => {
    const intl = useIntl();

    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => {
                const { antallUkerFellesperiodeFarMedmor, antallDagerFellesperiodeFarMedmor } = data;

                return (
                    <>
                        <Block margin="xxs">
                            <LabelWithInfo
                                info={getMessage(intl, getMessage(intl, 'spørsmål.farFellesperiode.infoboksTekst'))}
                            >
                                {getMessage(intl, 'spørsmål.farFellesperiode.label')}
                            </LabelWithInfo>
                        </Block>
                        <Block margin="xxs">
                            <ValiderbarUkerDagerTeller
                                validators={getUkerOgDagerRegler(
                                    antallUkerFellesperiodeFarMedmor,
                                    antallUkerFellesperiode,
                                    antallDagerFellesperiodeFarMedmor,
                                    intl
                                )}
                                name="farMedmorFellesperiode"
                                ukeLegend={getMessage(intl, 'spørsmål.farFellesperiode.uker.label')}
                                dagLegend={getMessage(intl, 'spørsmål.farFellesperiode.dager.label')}
                                stepperProps={[
                                    {
                                        value:
                                            antallUkerFellesperiodeFarMedmor !== undefined
                                                ? antallUkerFellesperiodeFarMedmor
                                                : 0,
                                        min: 0,
                                        max: antallUkerFellesperiode,
                                        onChange: (uker: number) =>
                                            onChange({ antallUkerFellesperiodeFarMedmor: uker }),
                                        ariaLabel: 'Antall uker',
                                    },
                                    {
                                        value:
                                            antallDagerFellesperiodeFarMedmor !== undefined
                                                ? antallDagerFellesperiodeFarMedmor
                                                : 0,
                                        min: 0,
                                        max: 4,
                                        onChange: (dager: number) =>
                                            onChange({ antallDagerFellesperiodeFarMedmor: dager }),
                                        ariaLabel: 'Antall dager',
                                    },
                                ]}
                            />
                        </Block>
                    </>
                );
            }}
        />
    );
};

export default AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål;
