import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, GuidePanel } from '@navikt/ds-react';

import { UtsettelseÅrsakType } from '@navikt/fp-common';

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
    const allRadios: FormikRadioProp[] = [
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.jegskalhaferie' }),
            value: UtsettelseÅrsakType.Ferie,
            disabled: periodenErKunHelligdager === true,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.jegskaljobbeheltid' }),
            value: UtsettelseÅrsakType.Arbeid,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.pgasykdom' }),
            value: UtsettelseÅrsakType.Sykdom,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.institusjonBarn' }),
            value: UtsettelseÅrsakType.InstitusjonBarnet,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.institusjonSøker' }),
            value: UtsettelseÅrsakType.InstitusjonSøker,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.hv_øvelse' }),
            value: UtsettelseÅrsakType.HvØvelse,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.navtiltak' }),
            value: UtsettelseÅrsakType.NavTiltak,
        },
        {
            label: intl.formatMessage({ id: 'uttaksplan.utsettelseårsak.fri' }),
            value: UtsettelseÅrsakType.Fri,
        },
    ];

    const defaultRadios = allRadios.filter((option) => {
        if (skalViseGamleUtsettelseÅrsaker) {
            if (option.value === UtsettelseÅrsakType.Fri) {
                return false;
            }

            return true;
        }

        if (!skalViseGamleUtsettelseÅrsaker && !erFarEllerMedmor) {
            if (tidsperiodenErInnenforFørsteSeksUker) {
                return (
                    option.value === UtsettelseÅrsakType.Sykdom ||
                    option.value === UtsettelseÅrsakType.InstitusjonBarnet ||
                    option.value === UtsettelseÅrsakType.InstitusjonSøker
                );
            }

            return false;
        }

        if (!skalViseGamleUtsettelseÅrsaker && erFarEllerMedmor) {
            if (!erMorUfør) {
                if (option.value === UtsettelseÅrsakType.Fri && søkerErFarEllerMedmorOgKunDeHarRett) {
                    return true;
                }

                return false;
            }

            if (tidsperiodenErInnenforFørsteSeksUker) {
                return (
                    option.value === UtsettelseÅrsakType.Sykdom ||
                    option.value === UtsettelseÅrsakType.InstitusjonBarnet ||
                    option.value === UtsettelseÅrsakType.InstitusjonSøker
                );
            }

            return option.value === UtsettelseÅrsakType.Fri;
        }

        return option.value === UtsettelseÅrsakType.Sykdom || option.value === UtsettelseÅrsakType.Fri;
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
