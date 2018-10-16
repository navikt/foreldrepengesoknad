import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';
import { Dekningsgrad } from 'common/types';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import søknadActionCreators from '../../../../redux/actions/søknad/søknadActionCreators';
import { AppState } from '../../../../redux/reducers';
import Block from 'common/components/block/Block';

interface StateProps {
    dekningsgrad?: Dekningsgrad;
    erAleneomsorg?: boolean;
    dekningsgrad100AntallUker: number | undefined;
    dekningsgrad80AntallUker: number | undefined;
}
interface OwnProps {
    visible?: boolean;
}

type Props = OwnProps & StateProps & InjectedIntlProps & DispatchProps;

const DekningsgradSpørsmål = (props: Props) => {
    const {
        visible = true,
        dispatch,
        erAleneomsorg,
        dekningsgrad,
        intl,
        dekningsgrad100AntallUker,
        dekningsgrad80AntallUker
    } = props;

    let checked;
    if (dekningsgrad === '100') {
        checked = '100';
    } else if (dekningsgrad === '80') {
        checked = '80';
    }

    const labelKey: string = erAleneomsorg ? 'spørsmål.dekningsgrad.label.aleneomsorg' : 'spørsmål.dekningsgrad.label';

    return (
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
                infoboksTekst={getMessage(intl, 'spørsmål.dekningsgrad.hjelpetekst')}
                onChange={(e, v: Dekningsgrad) => dispatch(søknadActionCreators.updateSøknad({ dekningsgrad: v }))}
            />
        </Block>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    dekningsgrad: state.søknad.dekningsgrad,
    erAleneomsorg: state.søknad.søker.erAleneOmOmsorg || !state.søknad.annenForelder.harRettPåForeldrepenger,
    dekningsgrad100AntallUker: state.api.dekningsgrad100AntallUker,
    dekningsgrad80AntallUker: state.api.dekningsgrad80AntallUker
});

export default connect(mapStateToProps)(injectIntl(DekningsgradSpørsmål));
