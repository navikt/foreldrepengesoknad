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

interface AnnenForelderUkjentProps {
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    erFarEllerMedmor: boolean;
    språk: Språkkode;
}

type Props = AnnenForelderUkjentProps & InjectedIntlProps & DispatchProps;

class AnnenForelderUkjent extends React.Component<Props> {
    render() {
        const { søker, annenForelder, dispatch, intl, språk } = this.props;
        const { kanIkkeOppgis, navn } = annenForelder;

        return (
            // TODO vise info om den andre forelderen dersom info finnes.
            <React.Fragment>
                <Bolk
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
                            checked={søker.aleneOmOmsorg || false}
                            label={getMessage(
                                intl,
                                'annenForelder.aleneOmOmsorg'
                            )}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        aleneOmOmsorg: e.target.checked
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

export default injectIntl(AnnenForelderUkjent);
