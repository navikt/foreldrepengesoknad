import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox } from 'nav-frontend-skjema';

import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Bolk from '../../../../components/layout/Bolk';
import { Språkkode } from 'common/intl/types';
import FødselsnummerSpørsmål from '../../../../spørsmål/FødselsnummerSpørsmål';
import NavnPåAnnenForelderSpørsmål from '../../../../spørsmål/NavnPåAnnenForelderSpørsmål';
import Søker from '../../../../types/søknad/Søker';
import PersonaliaBox from 'common/components/personalia-box/PersonaliaBox';

interface AnnenForelderPersonaliaPartialProps {
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    dataOmAndreForelderen: any;
    erFarEllerMedmor: boolean;
    språk: Språkkode;
}

type Props = AnnenForelderPersonaliaPartialProps &
    InjectedIntlProps &
    DispatchProps;

class AnnenForelderPersonaliaPartial extends React.Component<Props> {
    render() {
        const {
            søker,
            annenForelder,
            dataOmAndreForelderen,
            dispatch,
            intl,
            språk
        } = this.props;
        const { kanIkkeOppgis, navn } = annenForelder;

        return (
            <React.Fragment>
                <Bolk
                    tittel="Informasjon om den andre forelderen"
                    synlig={dataOmAndreForelderen !== undefined}
                    render={() => (
                        <PersonaliaBox personalia={dataOmAndreForelderen} />
                    )}
                />

                <Bolk
                    synlig={dataOmAndreForelderen === undefined}
                    render={() => (
                        <NavnPåAnnenForelderSpørsmål
                            navn={navn}
                            kanIkkeOppgis={kanIkkeOppgis}
                            onChange={(
                                annenForelderPartial: AnnenForelderPartial,
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder(
                                        annenForelderPartial
                                    )
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={!kanIkkeOppgis}
                    render={() => (
                        <Checkbox
                            checked={søker.erAleneOmOmsorg}
                            label={getMessage(
                                intl,
                                'annenForelder.aleneOmOmsorg'
                            )}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        erAleneOmOmsorg: e.target.checked
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={navn !== undefined}
                    render={() => (
                        <FødselsnummerSpørsmål
                            annenForelder={annenForelder}
                            onChange={(
                                annenForelderPartial: AnnenForelderPartial,
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder(
                                        annenForelderPartial
                                    )
                                )
                            }
                            språk={språk}
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(AnnenForelderPersonaliaPartial);
