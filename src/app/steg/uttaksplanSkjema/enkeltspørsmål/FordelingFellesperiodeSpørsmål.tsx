import * as React from 'react';
import RangeInput from 'common/components/skjema/elements/range-input/RangeInput';
import { useIntl, FormattedMessage } from 'react-intl';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { NavnPåForeldre } from 'common/types';
import getMessage from 'common/util/i18nUtils';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../../util/routing/lenker';
import Block from 'common/components/block/Block';

export interface OwnProps {
    navnPåForeldre: NavnPåForeldre;
    ukerFellesperiode: number;
    annenForelderErFarEllerMedmor: boolean;
    antallUkerFedreKvote: number;
    antallUkerMødreKvote: number;
}

const FordelingFellesperiodeSpørsmål: React.FunctionComponent<OwnProps & UttaksplanSkjemaspørsmålProps> = ({
    visible,
    annenForelderErFarEllerMedmor,
    navnPåForeldre,
    ukerFellesperiode,
    antallUkerFedreKvote,
    antallUkerMødreKvote,
}) => {
    const intl = useIntl();
    const infotekst = getMessage(intl, 'uttaksplan.skjema.fordeling.veiledning', {
        pakrevdForelder1: antallUkerMødreKvote,
        pakrevdForelder2: antallUkerFedreKvote,
        navnForelder1: navnPåForeldre.mor,
        navnForelder2: navnPåForeldre.farMedmor,
    });
    const annenForeldersNavn = annenForelderErFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <RangeInput
                    label={getMessage(intl, 'uttaksplan.skjema.fordeling.spørsmål')}
                    hjelpetekst={
                        <Normaltekst tag="div">
                            <Block margin="xxs">{infotekst}</Block>
                            <Lenke href={lenker.nav_aktivitetskrav} target="_blank">
                                <FormattedMessage id="uttaksplan.skjema.fordeling.veiledning.lenketekst" />
                            </Lenke>
                        </Normaltekst>
                    }
                    ariaLabelText={getMessage(intl, 'uttaksplan.skjema.fordeling.spørsmål')}
                    value={data.fellesperiodeukerMor!}
                    min={0}
                    max={ukerFellesperiode}
                    onChange={(fellesperiodeukerMor) => onChange({ fellesperiodeukerMor })}
                    steppers={{
                        reduceLabel: intl.formatMessage({ id: 'uttaksplan.skjema.fordeling.reduser.tooltip' }),
                        increaseLabel: intl.formatMessage({ id: 'uttaksplan.skjema.fordeling.øk.tooltip' }),
                    }}
                    ariaValueChangedMessage={(value) =>
                        intl.formatMessage(
                            { id: 'uttaksplan.skjema.fordeling.valgtVerdi' },
                            {
                                ukerForelder: value,
                                ukerTotalt: ukerFellesperiode,
                                navnForelder: navnPåForeldre.mor || intl.formatMessage({ id: 'uttaksplan.mor' }),
                            }
                        )
                    }
                    valueLabelRenderer={(options) => (
                        <Ingress tag="p" className="m-text-center fordelingFellesperiode--valgtVerdi">
                            <FormattedMessage
                                id="uttaksplan.skjema.fordeling.valgtVerdi"
                                values={{
                                    ukerForelder: options.value,
                                    ukerTotalt: options.max,
                                    navnForelder: navnPåForeldre.mor || intl.formatMessage({ id: 'uttaksplan.mor' }),
                                }}
                            />
                        </Ingress>
                    )}
                    valueLabelPlacement="above"
                    bottomContentRenderer={(options) => (
                        <Normaltekst className="m-text-center fordelingFellesperiode--bottomContent">
                            <FormattedMessage
                                id="uttaksplan.skjema.fordeling.annenForeldersFellesperiode"
                                values={{ annenForeldersNavn, antallUker: options.max - options.value }}
                            />
                        </Normaltekst>
                    )}
                />
            )}
        />
    );
};

export default FordelingFellesperiodeSpørsmål;
