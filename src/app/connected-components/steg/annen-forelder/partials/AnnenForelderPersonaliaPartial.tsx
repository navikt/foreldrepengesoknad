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
import { RegistrertAnnenForelder } from '../../../../types/Person';
import { Søkersituasjon } from '../../../../types/søknad/Søknad';
import { Adopsjonsbarn } from '../../../../types/søknad/Barn';
import { SøkerinfoProps } from '../../../Foreldrepengesøknad';

interface AnnenForelderPersonaliaPartialProps {
    søker: Søker;
    annenForelder: AnnenForelder;
    registrertAnnenForelder?: RegistrertAnnenForelder;
    søkersFødselsnummer: string;
    erFarEllerMedmor: boolean;
    situasjon: Søkersituasjon;
    adopsjonAvEktefellesBarn: boolean;
}

type Props = AnnenForelderPersonaliaPartialProps &
    SøkerinfoProps &
    InjectedIntlProps &
    DispatchProps;

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
            registrertAnnenForelder,
            situasjon,
            dispatch,
            intl,
            adopsjonAvEktefellesBarn
        } = this.props;
        const { kanIkkeOppgis, navn } = annenForelder;

        return (
            <React.Fragment>
                <Block
                    visible={registrertAnnenForelder === undefined}
                    margin="xs">
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

const mapStateToProps = (
    state: AppState,
    props: Props
): AnnenForelderPersonaliaPartialProps => ({
    søker: state.søknad.søker,
    søkersFødselsnummer: props.søkerinfo.person.fnr,
    annenForelder: state.søknad.annenForelder,
    registrertAnnenForelder: undefined,
    erFarEllerMedmor: true,
    situasjon: state.søknad.situasjon,
    adopsjonAvEktefellesBarn: (state.søknad.barn as Adopsjonsbarn)
        .adopsjonAvEktefellesBarn
});

export default connect<AnnenForelderPersonaliaPartialProps, {}, {}>(
    mapStateToProps
)(injectIntl(AnnenForelderPersonaliaPartial));
