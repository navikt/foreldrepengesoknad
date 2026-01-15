import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, GuidePanel } from '@navikt/ds-react';

import { UtsettelsesÅrsak } from '@navikt/fp-types';

import Block from '../../../../common/block/Block';
import { FormikRadioProp } from '../../../../formik-wrappers/components/formik-radio-group/FormikRadioGroup';
import {
    PeriodeUtsettelseFormComponents,
    PeriodeUtsettelseFormField,
} from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';

interface Props {
    periodenErKunHelligdager: boolean;
    skalViseGamleUtsettelseÅrsaker: boolean;
    erFarEllerMedmor: boolean;
    tidsperiodenErInnenforFørsteSeksUker: boolean;
    erMorUfør: boolean;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
}

const getUtsettelseÅrsakOptions = (
    intl: IntlShape,
    periodenErKunHelligdager: boolean,
    skalViseGamleUtsettelseÅrsaker: boolean,
    erFarEllerMedmor: boolean,
    tidsperiodenErInnenforFørsteSeksUker: boolean,
    erMorUfør: boolean,
    søkerErFarEllerMedmorOgKunDeHarRett: boolean,
) => {
    const allRadios: Array<Omit<FormikRadioProp, 'value'> & { value: UtsettelsesÅrsak }> = [
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.jegskalhaferie' }),
            value: 'LOVBESTEMT_FERIE',
            disabled: periodenErKunHelligdager === true,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.jegskaljobbeheltid' }),
            value: 'ARBEID',
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.pgasykdom' }),
            value: 'SYKDOM',
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.institusjonBarn' }),
            value: 'INSTITUSJONSOPPHOLD_BARNET',
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.institusjonSøker' }),
            value: 'INSTITUSJONSOPPHOLD_SØKER',
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.hv_øvelse' }),
            value: 'HV_OVELSE',
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.navtiltak' }),
            value: 'NAV_TILTAK',
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.fri' }),
            value: 'FRI',
        },
    ];

    const defaultRadios = allRadios.filter((option) => {
        if (skalViseGamleUtsettelseÅrsaker) {
            if (option.value === 'FRI') {
                return false;
            }

            return true;
        }

        if (!skalViseGamleUtsettelseÅrsaker && !erFarEllerMedmor) {
            if (tidsperiodenErInnenforFørsteSeksUker) {
                return (
                    option.value === 'SYKDOM' ||
                    option.value === 'INSTITUSJONSOPPHOLD_BARNET' ||
                    option.value === 'INSTITUSJONSOPPHOLD_SØKER'
                );
            }

            return false;
        }

        if (!skalViseGamleUtsettelseÅrsaker && erFarEllerMedmor) {
            if (!erMorUfør) {
                if (option.value === 'FRI' && søkerErFarEllerMedmorOgKunDeHarRett) {
                    return true;
                }

                return false;
            }

            if (tidsperiodenErInnenforFørsteSeksUker) {
                return (
                    option.value === 'SYKDOM' ||
                    option.value === 'INSTITUSJONSOPPHOLD_BARNET' ||
                    option.value === 'INSTITUSJONSOPPHOLD_SØKER'
                );
            }

            return option.value === 'FRI';
        }

        return option.value === 'SYKDOM' || option.value === 'FRI';
    });

    return defaultRadios;
};

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const UtsettelseÅrsakSpørsmål: FunctionComponent<Props> = ({
    periodenErKunHelligdager,
    skalViseGamleUtsettelseÅrsaker,
    erFarEllerMedmor,
    tidsperiodenErInnenforFørsteSeksUker,
    erMorUfør,
    søkerErFarEllerMedmorOgKunDeHarRett,
}) => {
    const intl = useIntl();
    const årsakOptions = getUtsettelseÅrsakOptions(
        intl,
        periodenErKunHelligdager,
        skalViseGamleUtsettelseÅrsaker,
        erFarEllerMedmor,
        tidsperiodenErInnenforFørsteSeksUker,
        erMorUfør,
        søkerErFarEllerMedmorOgKunDeHarRett,
    );

    if (årsakOptions.length === 0) {
        return (
            <GuidePanel>
                <Block padBottom="l">
                    <BodyShort>
                        <b>
                            <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del1" />
                        </b>
                    </BodyShort>
                </Block>
                <Block padBottom="l">
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del2" />
                    </BodyShort>
                </Block>
                <Block padBottom="l">
                    <BodyShort>
                        <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del3" />
                    </BodyShort>
                </Block>
            </GuidePanel>
        );
    }

    return (
        <Block padBottom="l">
            <PeriodeUtsettelseFormComponents.RadioGroup
                legend="Velg årsak for utsettelse"
                name={PeriodeUtsettelseFormField.årsak}
                radios={årsakOptions}
                validate={(value) => {
                    if (value === '') {
                        return 'Årsak må fylles ut';
                    }
                    return undefined;
                }}
            />
        </Block>
    );
};
// eslint-disable-next-line import/no-default-export
export default UtsettelseÅrsakSpørsmål;
