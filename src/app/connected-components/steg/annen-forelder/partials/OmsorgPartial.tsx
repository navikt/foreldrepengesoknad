import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { ForeldreansvarBarn } from '../../../../types/s\u00F8knad/Barn';
import { AnnenForelderPartial } from '../../../../types/s\u00F8knad/AnnenForelder';
import { Skjemadata } from '../../../../types/s\u00F8knad/S\u00F8knad';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import Spørsmål from 'common/components/sp\u00F8rsm\u00E5l/Sp\u00F8rsm\u00E5l';
import DatoInput from 'common/components/dato-input/DatoInput';
import getMessage from 'common/util/i18nUtils';
import Søknadsvedlegg from '../../../../components/s\u00F8knadsvedlegg/S\u00F8knadsvedlegg';

interface OmsorgPartialProps {
    barn: ForeldreansvarBarn;
    annenForelder: AnnenForelderPartial;
    søknad: Skjemadata;
}

type Props = OmsorgPartialProps & InjectedIntlProps & DispatchProps;

class OmsorgPartial extends React.Component<Props> {
    render() {
        const { barn, søknad, intl, dispatch } = this.props;

        return (
            <React.Fragment>
                {true && (
                    <React.Fragment>
                        <Spørsmål
                            synlig={søknad.aleneOmOmsorg !== undefined}
                            render={() => (
                                <DatoInput
                                    id="omsorgsovertakelseDato"
                                    label={getMessage(
                                        intl,
                                        'omsorgsovertakelseDato.spørsmål'
                                    )}
                                    onChange={(foreldreansvarsdato: Date) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                foreldreansvarsdato
                                            })
                                        );
                                    }}
                                    dato={barn.foreldreansvarsdato}
                                />
                            )}
                        />

                        <Spørsmål
                            animert={true}
                            synlig={barn.foreldreansvarsdato !== undefined}
                            render={() => (
                                <Søknadsvedlegg type="adopsjonsvedtak" />
                            )}
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default injectIntl(OmsorgPartial);
