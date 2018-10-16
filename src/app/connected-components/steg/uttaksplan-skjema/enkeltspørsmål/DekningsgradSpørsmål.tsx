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
import { TilgjengeligStønadskonto, StønadskontoType } from '../../../../types/uttaksplan/periodetyper';

interface StateProps {
    dekningsgrad?: Dekningsgrad;
    erAleneomsorg?: boolean;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
}
interface OwnProps {
    visible?: boolean;
}

type Props = OwnProps & StateProps & InjectedIntlProps & DispatchProps;

const dekningsgradConfig = {
    40: 50,
    46: 56,
    49: 59,
    63: 77,
    66: 80,
    92: 112,
    95: 115
};

const getLabelTexts = (tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[]) => {
    const dekningsgradUker100 = tilgjengeligeStønadskontoer
        .filter((k) => k.konto !== StønadskontoType.Flerbarnsdager)
        .reduce((sum, konto) => sum + konto.dager / 5, 0);
    const dekningsgradUker80 = dekningsgradConfig[dekningsgradUker100];

    return { dekningsgradUker100, dekningsgradUker80 };
};

const DekningsgradSpørsmål = (props: Props) => {
    const { visible = true, dispatch, erAleneomsorg, dekningsgrad, intl, tilgjengeligeStønadskontoer } = props;
    const labelTexts = getLabelTexts(tilgjengeligeStønadskontoer);

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
                            antallUker: labelTexts.dekningsgradUker100
                        }),
                        value: '100'
                    },
                    {
                        label: getMessage(intl, 'spørsmål.dekningsgrad.80', {
                            antallUker: labelTexts.dekningsgradUker80
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
    tilgjengeligeStønadskontoer: state.api.tilgjengeligeStønadskontoer
});

export default connect(mapStateToProps)(injectIntl(DekningsgradSpørsmål));
