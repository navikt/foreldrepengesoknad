import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { StegID } from '../../../util/routing/stegConfig';
import Steg from 'app/components/steg/Steg';

import { DispatchProps } from 'common/redux/types';
import { AppState } from '../../../redux/reducers';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import AntallBarnSpørsmål from '../../../spørsmål/AntallBarnSpørsmål';
import DatoInput from 'common/components/dato-input/DatoInput';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import Labeltekst from 'common/components/labeltekst/Labeltekst';

import utils from '../../../util/domain/fødselsdato';
import { ForeldreansvarBarnPartial } from '../../../types/søknad/Barn';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { Fødselsdato, HistoryProps } from '../../../types/common';
import { getAlderFraDato } from '../../../util/dates/dates';
import { StegProps } from '../../../components/steg/Steg';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export interface StateProps {
    barn: ForeldreansvarBarnPartial;
    visOver15årMelding: boolean;
    stegProps: StegProps;
}

export type Props = DispatchProps &
    StateProps &
    InjectedIntlProps &
    HistoryProps;

class RelasjonTilBarnForeldreansvarSteg extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
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
            barn,
            visOver15årMelding,
            intl,
            stegProps,
            dispatch
        } = this.props;
        return (
            <Steg {...stegProps}>
                <Spørsmål
                    render={() => (
                        <DatoInput
                            id="foreldreansvar_dato"
                            label={
                                <Labeltekst intlId="foreldreansvar.overtakelsedato" />
                            }
                            onChange={(dato: Date) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        foreldreansvarsdato: dato
                                    })
                                )
                            }
                            dato={barn.foreldreansvarsdato}
                        />
                    )}
                />
                <Spørsmål
                    animert={true}
                    synlig={barn.foreldreansvarsdato !== undefined}
                    render={() => (
                        <AttachmentsUploaderPure
                            attachments={barn.adopsjonsvedtak || []}
                            attachmentType="adopsjonsvedtak"
                            onFilesSelect={(attachments: Attachment[]) => {
                                attachments.forEach(
                                    (attachment: Attachment) => {
                                        dispatch(
                                            søknadActions.uploadAttachment(
                                                attachment
                                            )
                                        );
                                    }
                                );
                            }}
                            onFileDelete={(attachment: Attachment) =>
                                dispatch(
                                    søknadActions.deleteAttachment(attachment)
                                )
                            }
                        />
                    )}
                />
                <Spørsmål
                    animert={false}
                    synlig={barn.foreldreansvarsdato !== undefined}
                    margin="none"
                    render={() => (
                        <AntallBarnSpørsmål
                            spørsmål={intl.formatMessage({
                                id: 'foreldreansvar.antallBarn'
                            })}
                            inputName="foreldreansvar.antallBarn.input"
                            antallBarn={barn.antallBarn}
                            onChange={this.oppdaterAntallBarn}
                        />
                    )}
                />
                <Spørsmål
                    synlig={barn.antallBarn !== undefined}
                    margin="none"
                    render={() => (
                        <FødselsdatoerSpørsmål
                            fødselsdatoer={barn.fødselsdatoer || []}
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
                {visOver15årMelding && (
                    <Veilederinfo type="advarsel">
                        Barn over 15 år er registrert.
                    </Veilederinfo>
                )}
            </Steg>
        );
    }
}

const erAlderOver15År = (datoer: Fødselsdato[]) => {
    const harBarnOver15 = datoer.find((dato: Fødselsdato) => {
        if (dato) {
            return getAlderFraDato(dato).år > 15;
        }
        return false;
    });
    return harBarnOver15 !== undefined;
};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const barn = state.søknad.barn as ForeldreansvarBarnPartial;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON,
        renderFortsettKnapp:
            barn.fødselsdatoer && barn.fødselsdatoer.length > 0,
        history: props.history
    };

    return {
        barn,
        visOver15årMelding: erAlderOver15År(barn.fødselsdatoer || []),
        stegProps
    };
};

export default injectIntl(
    connect(mapStateToProps)(RelasjonTilBarnForeldreansvarSteg)
);
