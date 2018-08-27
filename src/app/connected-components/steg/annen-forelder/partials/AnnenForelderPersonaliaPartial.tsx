import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Checkbox } from 'nav-frontend-skjema';

import AnnenForelder, {
    AnnenForelderPartial
} from '../../../../types/søknad/AnnenForelder';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import FødselsnummerBolk from '../../../../bolker/FødselsnummerBolk';
import NavnPåAnnenForelderSpørsmål from '../../../../spørsmål/NavnPåAnnenForelderSpørsmål';
import { AppState } from '../../../../redux/reducers';
import Søker from '../../../../types/søknad/Søker';
import { Søkersituasjon } from '../../../../types/søknad/Søknad';
import { Adopsjonsbarn } from '../../../../types/søknad/Barn';

interface StateProps {
    søker: Søker;
    annenForelder: AnnenForelder;
    erFarEllerMedmor: boolean;
    situasjon: Søkersituasjon;
    adopsjonAvEktefellesBarn: boolean;
}
interface OwnProps {
    søkersFødselsnummer: string;
}

type Props = StateProps & OwnProps & InjectedIntlProps & DispatchProps;

class AnnenForelderPersonaliaPartial extends React.Component<Props> {
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
            søknadActions.updateSøker({
                erAleneOmOmsorg: kanIkkeOppgis
            })
        );
    }

    render() {
        const {
            søkersFødselsnummer,
            annenForelder,
            situasjon,
            dispatch,
            intl,
            adopsjonAvEktefellesBarn
        } = this.props;
        const { kanIkkeOppgis, navn } = annenForelder;

        return (
            <React.Fragment>
                <Block margin="xs">
                    <NavnPåAnnenForelderSpørsmål
                        navn={navn}
                        kanIkkeOppgis={kanIkkeOppgis}
                        onChange={(
                            annenForelderPartial: AnnenForelderPartial
                        ) =>
                            dispatch(
                                søknadActions.updateAnnenForelder(
                                    annenForelderPartial
                                )
                            )
                        }
                    />
                </Block>

                <Block visible={adopsjonAvEktefellesBarn !== true}>
                    <Checkbox
                        checked={kanIkkeOppgis || false}
                        label={
                            situasjon === Søkersituasjon.ADOPSJON
                                ? getMessage(
                                      intl,
                                      'annenForelder.spørsmål.adoptererAlene'
                                  )
                                : getMessage(
                                      intl,
                                      'annenForelder.spørsmål.kanOppgis'
                                  )
                        }
                        onChange={() => this.onKanIkkeOppgis()}
                    />
                </Block>

                {navn !== undefined &&
                    navn !== '' && (
                        <FødselsnummerBolk
                            kanIkkeOppgis={kanIkkeOppgis}
                            søkersFødselsnummer={søkersFødselsnummer}
                            fnr={annenForelder.fnr}
                            utenlandskFnr={annenForelder.utenlandskFnr}
                            bostedsland={annenForelder.bostedsland}
                            onChange={(
                                annenForelderPartial: AnnenForelderPartial
                            ) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder(
                                        annenForelderPartial
                                    )
                                )
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
    situasjon: state.søknad.situasjon,
    adopsjonAvEktefellesBarn: (state.søknad.barn as Adopsjonsbarn)
        .adopsjonAvEktefellesBarn
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(
    injectIntl(AnnenForelderPersonaliaPartial)
);
