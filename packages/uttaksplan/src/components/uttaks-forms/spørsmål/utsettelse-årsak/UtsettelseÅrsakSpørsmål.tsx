import { Block, intlUtils, UtsettelseÅrsakType } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import {
    PeriodeUtsettelseFormComponents,
    PeriodeUtsettelseFormField,
} from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';
import { BodyShort, GuidePanel } from '@navikt/ds-react';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';

interface Props {
    periodenErKunHelligdager: boolean;
    skalViseGamleUtsettelseÅrsaker: boolean;
    erFarEllerMedmor: boolean;
    tidsperiodenErInnenforFørsteSeksUker: boolean;
    utsettelseårsak: UtsettelseÅrsakType | '';
    erMorUfør: boolean;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
    isOpen: boolean;
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
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskalhaferie'),
            value: UtsettelseÅrsakType.Ferie,
            disabled: periodenErKunHelligdager === true,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskaljobbeheltid'),
            value: UtsettelseÅrsakType.Arbeid,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.pgasykdom'),
            value: UtsettelseÅrsakType.Sykdom,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.institusjonBarn'),
            value: UtsettelseÅrsakType.InstitusjonBarnet,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.institusjonSøker'),
            value: UtsettelseÅrsakType.InstitusjonSøker,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.hv_øvelse'),
            value: UtsettelseÅrsakType.HvØvelse,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.navtiltak'),
            value: UtsettelseÅrsakType.NavTiltak,
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.fri'),
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

const getVeilederTekst = (årsak: UtsettelseÅrsakType | ''): React.ReactElement => {
    switch (årsak) {
        case UtsettelseÅrsakType.Sykdom:
        case UtsettelseÅrsakType.InstitusjonSøker:
        case UtsettelseÅrsakType.InstitusjonBarnet:
            return <FormattedMessage id="uttaksplan.veileder.sykdom" />;
        case UtsettelseÅrsakType.HvØvelse:
            return <FormattedMessage id="uttaksplan.veileder.hvØvelse" />;
        case UtsettelseÅrsakType.NavTiltak:
            return <FormattedMessage id="uttaksplan.veileder.navTiltak" />;
        default:
            return <FormattedMessage id="uttaksplan.veileder.sykdom" />; // Should never happen
    }
};

const UtsettelseÅrsakSpørsmål: FunctionComponent<Props> = ({
    periodenErKunHelligdager,
    skalViseGamleUtsettelseÅrsaker,
    erFarEllerMedmor,
    tidsperiodenErInnenforFørsteSeksUker,
    utsettelseårsak,
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
        <>
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
            <Block padBottom="l">
                <GuidePanel>{getVeilederTekst(utsettelseårsak)}</GuidePanel>
            </Block>
        </>
    );
};

export default UtsettelseÅrsakSpørsmål;
