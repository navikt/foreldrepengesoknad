import { Block, formatDateExtended, intlUtils } from '@navikt/fp-common';
import VeilederNormal from 'app/assets/VeilederNormal';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { RadioProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import {
    PeriodeUtsettelseFormComponents,
    PeriodeUtsettelseFormField,
} from '../../periode-utsettelse-form/periodeUtsettelseFormConfig';

interface Props {
    periodenErKunHelligdager: boolean;
    skalViseGamleUtsettelseÅrsaker: boolean;
    erFarEllerMedmor: boolean;
    tidsperiodenErInnenforFørsteSeksUker: boolean;
    familiehendelsesdato: Date;
}

const getUtsettelseÅrsakOptions = (
    intl: IntlShape,
    periodenErKunHelligdager: boolean,
    skalViseGamleUtsettelseÅrsaker: boolean,
    erFarEllerMedmor: boolean,
    tidsperiodenErInnenforFørsteSeksUker: boolean
) => {
    const allRadios: RadioProps[] = [
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskalhaferie'),
            value: UtsettelseÅrsakType.Ferie,
            disabled: periodenErKunHelligdager === true,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.jegskaljobbeheltid'),
            value: UtsettelseÅrsakType.Arbeid,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.pgasykdom'),
            value: UtsettelseÅrsakType.Sykdom,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.hv_øvelse'),
            value: UtsettelseÅrsakType.HvØvelse,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.navtiltak'),
            value: UtsettelseÅrsakType.NavTiltak,
            name: 'utsettelseÅrsak',
        },
        {
            label: intlUtils(intl, 'uttaksplan.utsettelseårsak.fri'),
            value: UtsettelseÅrsakType.Fri,
            name: 'utsettelseÅrsak',
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
                return option.value === UtsettelseÅrsakType.Sykdom;
            }

            return false;
        }

        return option.value === UtsettelseÅrsakType.Sykdom || option.value === UtsettelseÅrsakType.Fri;
    });

    return defaultRadios;
};

const UtsettelseÅrsakSpørsmål: FunctionComponent<Props> = ({
    periodenErKunHelligdager,
    skalViseGamleUtsettelseÅrsaker,
    erFarEllerMedmor,
    tidsperiodenErInnenforFørsteSeksUker,
    familiehendelsesdato,
}) => {
    const intl = useIntl();
    const årsakOptions = getUtsettelseÅrsakOptions(
        intl,
        periodenErKunHelligdager,
        skalViseGamleUtsettelseÅrsaker,
        erFarEllerMedmor,
        tidsperiodenErInnenforFørsteSeksUker
    );

    if (årsakOptions.length === 0) {
        return (
            <Veilederpanel fargetema="normal" type="normal" svg={<VeilederNormal transparentBackground={true} />}>
                <Block padBottom="l">
                    <Normaltekst>
                        <b>
                            <FormattedMessage
                                id="uttaksplan.veileder.trengerIkkeUtsettelse.del1"
                                values={{ dato: formatDateExtended(Uttaksdagen(familiehendelsesdato).leggTil(30)) }}
                            />
                        </b>
                    </Normaltekst>
                </Block>
                <Block padBottom="l">
                    <Normaltekst>
                        <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del2" />
                    </Normaltekst>
                </Block>
                <Block padBottom="l">
                    <Normaltekst>
                        <FormattedMessage id="uttaksplan.veileder.trengerIkkeUtsettelse.del3" />
                    </Normaltekst>
                </Block>
            </Veilederpanel>
        );
    }

    return (
        <PeriodeUtsettelseFormComponents.RadioPanelGroup
            name={PeriodeUtsettelseFormField.årsak}
            radios={årsakOptions}
            useTwoColumns={true}
        />
    );
};

export default UtsettelseÅrsakSpørsmål;
