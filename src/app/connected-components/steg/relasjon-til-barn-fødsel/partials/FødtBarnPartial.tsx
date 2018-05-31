import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Bolk from 'app/components/layout/Bolk';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnSpørsmål from '../../../../spørsmål/AntallBarnSpørsmål';
import { FødtBarn } from '../../../../types/søknad/Barn';
import FødselsdatoerSpørsmål from '../../../../spørsmål/FødselsdatoerSpørsmål';

import utils from '../../../../util/fødselsdato';
import { søknadStegPath } from '../../StegRoutes';
import FortsettKnapp from 'common/components/fortsett-knapp/FortsettKnapp';
import { HistoryProps } from '../../../../types/common';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Søknadsvedlegg from '../../../../components/søknadsvedlegg/Søknadsvedlegg';

interface StateProps {
    barn: FødtBarn;
    fødselsattestErLastetOpp: boolean;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class FødtBarnPartial extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
                ...this.props.barn,
                antallBarn: antall,
                fødselsdatoer: utils.trimFødselsdatoer(
                    antall,
                    this.props.barn.fødselsdatoer
                )
            })
        );
    }

    render() {
        const {
            intl,
            dispatch,
            barn,
            fødselsattestErLastetOpp,
            history
        } = this.props;
        return (
            <React.Fragment>
                <Spørsmål
                    render={() => (
                        <AntallBarnSpørsmål
                            spørsmål={getMessage(
                                intl,
                                'antallBarn.spørsmål.fått'
                            )}
                            inputName="antallBarn"
                            antallBarn={barn.antallBarn}
                            onChange={this.oppdaterAntallBarn}
                        />
                    )}
                />

                <Spørsmål
                    render={() => (
                        <FødselsdatoerSpørsmål
                            fødselsdatoer={barn.fødselsdatoer}
                            onChange={(fødselsdatoer: Date[]) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        fødselsdatoer
                                    })
                                )
                            }
                        />
                    )}
                />

                <Bolk
                    synlig={
                        barn.fødselsdatoer.length > 0 &&
                        barn.fødselsdatoer.every(
                            (fødselsdato: Date) => fødselsdato instanceof Date
                        )
                    }
                    tittel={getMessage(intl, 'vedlegg.tittel.fødselsattest')}
                    render={() => <Søknadsvedlegg type="fødselsattest" />}
                />

                {fødselsattestErLastetOpp && (
                    <FortsettKnapp
                        history={history}
                        location={søknadStegPath('annen-forelder')}>
                        {getMessage(intl, 'fortsettknapp.label')}
                    </FortsettKnapp>
                )}
            </React.Fragment>
        );
    }
}

export default injectIntl(FødtBarnPartial);
