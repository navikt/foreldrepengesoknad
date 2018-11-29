import * as React from 'react';
import RangeInput from 'common/components/skjema/elements/range-input/RangeInput';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { NavnPåForeldre } from 'common/types';
import getMessage from 'common/util/i18nUtils';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../../../util/routing/lenker';
import Block from 'common/components/block/Block';
import { getPermisjonsregler } from '../../../../util/uttaksplan/permisjonsregler';

export interface OwnProps {
    navnPåForeldre: NavnPåForeldre;
    ukerFellesperiode: number;
    annenForelderErFarEllerMedmor: boolean;
}

const FordelingFellesperiodeSpørsmål: React.StatelessComponent<
    OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps
> = ({ visible, annenForelderErFarEllerMedmor, navnPåForeldre, ukerFellesperiode, intl }) => {
    const permisjonsregler = getPermisjonsregler();
    const infotekst = getMessage(intl, 'uttaksplan.skjema.fordeling.veiledning', {
        pakrevdForelder1: permisjonsregler.antallUkerForeldrepengerFørFødsel + permisjonsregler.antallUkerMødrekvote,
        pakrevdForelder2: permisjonsregler.antallUkerFedrekvote,
        navnForelder1: navnPåForeldre.mor,
        navnForelder2: navnPåForeldre.farMedmor
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
                        increaseLabel: intl.formatMessage({ id: 'uttaksplan.skjema.fordeling.øk.tooltip' })
                    }}
                    ariaValueChangedMessage={(value) =>
                        intl.formatMessage(
                            { id: 'uttaksplan.skjema.fordeling.valgtVerdi' },
                            {
                                ukerForelder: value,
                                ukerTotalt: ukerFellesperiode,
                                navnForelder: navnPåForeldre.mor || intl.formatMessage({ id: 'uttaksplan.mor' })
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
                                    navnForelder: navnPåForeldre.mor || intl.formatMessage({ id: 'uttaksplan.mor' })
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

export default injectIntl(FordelingFellesperiodeSpørsmål);
