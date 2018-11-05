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
import { SøkerRolle, Søkersituasjon } from '../../../../types/søknad/Søknad';
import { erFarEllerMedmor } from '../../../../util/domain/personUtil';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

interface StateProps {
    dekningsgrad?: Dekningsgrad;
    erAleneomsorg: boolean;
    dekningsgrad100AntallUker: number | undefined;
    dekningsgrad80AntallUker: number | undefined;
    rolle: SøkerRolle;
    harAnnenForelderSøktFP: boolean | undefined;
    situasjon: Søkersituasjon;
}
interface OwnProps {
    visible?: boolean;
}

type Props = OwnProps & StateProps & InjectedIntlProps & DispatchProps;

const getInfoboxText = (intl: InjectedIntl, erAleneOmOmsorg: boolean): string => {
    return erAleneOmOmsorg
        ? getMessage(intl, 'spørsmål.dekningsgrad.hjelpetekst')
        : getMessage(intl, 'spørsmål.dekningsgrad.hjelpetekst.aleneomsorg');
};

const DekningsgradSpørsmål = (props: Props) => {
    const {
        visible = true,
        dispatch,
        erAleneomsorg,
        dekningsgrad,
        intl,
        dekningsgrad100AntallUker,
        dekningsgrad80AntallUker,
        rolle,
        harAnnenForelderSøktFP,
        situasjon
    } = props;

    let checked;
    if (dekningsgrad === '100') {
        checked = '100';
    } else if (dekningsgrad === '80') {
        checked = '80';
    }

    let labelKey: string = '';

    if (erFarEllerMedmor(rolle)) {
        if (harAnnenForelderSøktFP !== undefined && harAnnenForelderSøktFP === true) {
            labelKey = 'spørsmål.dekningsgrad.label.deltUttak';
        } else {
            labelKey = erAleneomsorg
                ? 'spørsmål.dekningsgrad.label.ikkeDeltUttak'
                : 'spørsmål.dekningsgrad.label.deltUttak';
        }
    } else {
        if (harAnnenForelderSøktFP !== undefined && harAnnenForelderSøktFP === true) {
            labelKey = 'spørsmål.dekningsgrad.label.deltUttak';
        } else {
            labelKey = erAleneomsorg
                ? 'spørsmål.dekningsgrad.label.ikkeDeltUttak'
                : 'spørsmål.dekningsgrad.label.deltUttakMor';
        }
    }

    const skalViseVeileder =
        dekningsgrad === '80' &&
        (situasjon === Søkersituasjon.FØDSEL ||
            (situasjon === Søkersituasjon.ADOPSJON && harAnnenForelderSøktFP === false));

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
                    name="dekninsgrad"
                    infoboksTekst={getInfoboxText(intl, erAleneomsorg)}
                    onChange={(e, v: Dekningsgrad) => dispatch(søknadActionCreators.updateSøknad({ dekningsgrad: v }))}
                />
            </Block>
            <Block visible={skalViseVeileder}>
                <Veilederinfo>{getInfoboxText(intl, erAleneomsorg)}</Veilederinfo>
            </Block>
        </>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    dekningsgrad: state.søknad.dekningsgrad,
    erAleneomsorg: state.søknad.søker.erAleneOmOmsorg || !state.søknad.annenForelder.harRettPåForeldrepenger,
    dekningsgrad100AntallUker: state.api.dekningsgrad100AntallUker,
    dekningsgrad80AntallUker: state.api.dekningsgrad80AntallUker,
    rolle: state.søknad.søker.rolle,
    harAnnenForelderSøktFP: state.søknad.ekstrainfo.uttaksplanSkjema.harAnnenForelderSøktFP,
    situasjon: state.søknad.situasjon
});

export default connect(mapStateToProps)(injectIntl(DekningsgradSpørsmål));
