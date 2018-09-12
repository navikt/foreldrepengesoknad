import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Checkbox } from 'nav-frontend-skjema';

import AnnenForelder from '../../../../types/søknad/AnnenForelder';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import FødselsnummerBolk from '../../../../bolker/FødselsnummerBolk';
import NavnPåAnnenForelderSpørsmål from '../../../../spørsmål/NavnPåAnnenForelderSpørsmål';
import { AppState } from '../../../../redux/reducers';
import Søker from '../../../../types/søknad/Søker';
import { Søkersituasjon } from '../../../../types/søknad/Søknad';
import { AnnenForelderStegVisibility } from '../visibility/annenForelderVisibility';

interface StateProps {
    søker: Søker;
    annenForelder: AnnenForelder;
    erFarEllerMedmor: boolean;
    situasjon: Søkersituasjon;
}
interface AnnenForelderPersonaliaPartProps {
    søkersFødselsnummer: string;
    vis: AnnenForelderStegVisibility;
}

type Props = StateProps & AnnenForelderPersonaliaPartProps & InjectedIntlProps & DispatchProps;

class AnnenForelderPersonaliaPart extends React.Component<Props> {
    onKanIkkeOppgis() {
        const { dispatch } = this.props;
        const kanIkkeOppgis = !this.props.annenForelder.kanIkkeOppgis;

        dispatch(
            søknadActions.updateAnnenForelder({
                navn: undefined,
                fnr: undefined,
                utenlandskFnr: undefined,
                kanIkkeOppgis,
                harRettPåForeldrepenger: undefined
            })
        );
        dispatch(
            søknadActions.updateAnnenForelder({
                kanIkkeOppgis
            })
        );
    }

    render() {
        const { søkersFødselsnummer, annenForelder, situasjon, dispatch, intl, vis } = this.props;
        const { kanIkkeOppgis, navn } = annenForelder;

        return (
            <React.Fragment>
                <Block margin="xs">
                    <NavnPåAnnenForelderSpørsmål
                        navn={navn}
                        kanIkkeOppgis={kanIkkeOppgis}
                        onChange={(annenForelderPartial: Partial<AnnenForelder>) =>
                            dispatch(søknadActions.updateAnnenForelder(annenForelderPartial))
                        }
                    />
                </Block>

                <Block visible={vis.annenForelderKanIkkeOppgisValg}>
                    <Checkbox
                        checked={kanIkkeOppgis || false}
                        label={
                            situasjon === Søkersituasjon.ADOPSJON
                                ? getMessage(intl, 'annenForelder.spørsmål.adoptererAlene')
                                : getMessage(intl, 'annenForelder.spørsmål.kanOppgis')
                        }
                        onChange={() => this.onKanIkkeOppgis()}
                    />
                </Block>

                {vis.fødselsnummerInput && (
                    <FødselsnummerBolk
                        kanIkkeOppgis={kanIkkeOppgis}
                        søkersFødselsnummer={søkersFødselsnummer}
                        fnr={annenForelder.fnr}
                        utenlandskFnr={annenForelder.utenlandskFnr}
                        bostedsland={annenForelder.bostedsland}
                        onChange={(annenForelderPartial: Partial<AnnenForelder>) =>
                            dispatch(søknadActions.updateAnnenForelder(annenForelderPartial))
                        }
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
    søker: state.søknad.søker,
    annenForelder: state.søknad.annenForelder,
    erFarEllerMedmor: true,
    situasjon: state.søknad.situasjon
});

export default connect<StateProps, {}, AnnenForelderPersonaliaPartProps>(mapStateToProps)(
    injectIntl(AnnenForelderPersonaliaPart)
);
