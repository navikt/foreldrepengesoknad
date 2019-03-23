import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';
import { Dekningsgrad } from 'common/types';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import søknadActionCreators from '../../../../redux/actions/søknad/søknadActionCreators';
import { AppState } from '../../../../redux/reducers';
import Block from 'common/components/block/Block';
import { Søkersituasjon } from '../../../../types/søknad/Søknad';
import { getSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { Søknadsinfo } from 'app/selectors/types';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';

interface StateProps {
    dekningsgrad100AntallUker: number | undefined;
    dekningsgrad80AntallUker: number | undefined;
    harAnnenForelderSøktFP: boolean | undefined;
    startdatoPermisjon: Date | undefined;
    søknadsinfo: Søknadsinfo;
}
interface OwnProps {
    visible?: boolean;
}

type Props = OwnProps & StateProps & InjectedIntlProps & DispatchProps;

const getInfoboxText = (intl: InjectedIntl, erAleneOmOmsorg: boolean): string | undefined => {
    return erAleneOmOmsorg
        ? getMessage(intl, 'spørsmål.dekningsgrad.hjelpetekst.aleneomsorg')
        : getMessage(intl, 'spørsmål.dekningsgrad.hjelpetekst');
};

const skalViseVeileder = (
    erEndringssøknad: boolean,
    situasjon: Søkersituasjon,
    erFarEllerMedmor: boolean,
    erAleneomsorg: boolean,
    annenForelderHarRett: boolean,
    harAnnenForelderSøktFP?: boolean,
    dekningsgrad?: Dekningsgrad
): boolean => {
    if (dekningsgrad === '80' && erEndringssøknad === false) {
        if (situasjon === Søkersituasjon.ADOPSJON && (harAnnenForelderSøktFP === false || erAleneomsorg)) {
            return true;
        }

        if (situasjon === Søkersituasjon.FØDSEL) {
            if (!erFarEllerMedmor) {
                return true;
            } else {
                if (erAleneomsorg || !annenForelderHarRett) {
                    return true;
                }
            }
        }
    }

    return false;
};

const DekningsgradSpørsmål = (props: Props) => {
    const {
        visible = true,
        dispatch,
        intl,
        dekningsgrad100AntallUker,
        dekningsgrad80AntallUker,
        harAnnenForelderSøktFP,
        søknadsinfo
    } = props;

    const { dekningsgrad, situasjon, erEndringssøknad, erDeltUttak } = søknadsinfo.søknaden;
    const { erFarEllerMedmor, erAleneOmOmsorg } = søknadsinfo.søker;
    const { harRett } = søknadsinfo.annenForelder;

    let checked;
    if (dekningsgrad === '100') {
        checked = '100';
    } else if (dekningsgrad === '80') {
        checked = '80';
    }

    let labelKey: string = '';

    if (erEndringssøknad) {
        labelKey = erDeltUttak
            ? 'spørsmål.dekningsgrad.endringssøknad.label.deltUttak'
            : 'spørsmål.dekningsgrad.endringssøknad.label.ikkeDeltUttak';
    } else {
        if (harAnnenForelderSøktFP !== undefined && harAnnenForelderSøktFP === true) {
            labelKey = 'spørsmål.dekningsgrad.label.deltUttak';
        } else {
            labelKey = !erDeltUttak
                ? 'spørsmål.dekningsgrad.label.ikkeDeltUttak'
                : erFarEllerMedmor
                    ? 'spørsmål.dekningsgrad.label.deltUttak'
                    : 'spørsmål.dekningsgrad.label.deltUttakMor';
        }
    }

    return (
        <>
            <Block visible={visible}>
                <RadioPanelGruppeResponsive
                    twoColumns={true}
                    checked={checked}
                    legend={getMessage(intl, labelKey)}
                    radios={[
                        {
                            label: getMessage(intl, 'spørsmål.dekningsgrad.100', {
                                antallUker: dekningsgrad100AntallUker
                            }),
                            value: '100'
                        },
                        {
                            label: getMessage(intl, 'spørsmål.dekningsgrad.80', {
                                antallUker: dekningsgrad80AntallUker
                            }),
                            value: '80'
                        }
                    ]}
                    name="dekningsgrad"
                    infoboksTekst={erEndringssøknad ? undefined : getInfoboxText(intl, erAleneOmOmsorg)}
                    onChange={(e, v: Dekningsgrad) => dispatch(søknadActionCreators.updateSøknad({ dekningsgrad: v }))}
                />
            </Block>
            <Block
                visible={skalViseVeileder(
                    erEndringssøknad,
                    situasjon,
                    erFarEllerMedmor,
                    erAleneOmOmsorg,
                    harRett,
                    harAnnenForelderSøktFP,
                    dekningsgrad
                )}>
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: erAleneOmOmsorg
                                    ? 'spørsmål.dekningsgrad.hjelpetekst.aleneomsorg'
                                    : 'spørsmål.dekningsgrad.hjelpetekst'
                            }
                        ]}
                    />
                </Veilederpanel>
            </Block>
        </>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    dekningsgrad100AntallUker: state.api.dekningsgrad100AntallUker,
    dekningsgrad80AntallUker: state.api.dekningsgrad80AntallUker,
    harAnnenForelderSøktFP: state.søknad.ekstrainfo.uttaksplanSkjema.harAnnenForelderSøktFP,
    søknadsinfo: getSøknadsinfo(state)!,
    startdatoPermisjon: state.søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon
});

export default connect(mapStateToProps)(injectIntl(DekningsgradSpørsmål));
