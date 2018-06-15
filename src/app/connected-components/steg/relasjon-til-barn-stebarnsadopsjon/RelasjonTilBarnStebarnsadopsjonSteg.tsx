import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { StegID } from '../../../util/stegConfig';
import Steg, { StegProps } from 'app/components/layout/Steg';

import { DispatchProps } from 'common/redux/types';
import { AppState } from '../../../redux/reducers';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import AntallBarnSpørsmål from '../../../spørsmål/AntallBarnSpørsmål';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import DatoInput from 'common/components/dato-input/DatoInput';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import Labeltekst from 'common/components/labeltekst/Labeltekst';

import utils from '../../../util/fødselsdato';
import { HistoryProps } from '../../../types/common';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Attachment } from 'common/storage/attachment/types/Attachment';

export interface StateProps {
    barn: Adopsjonsbarn;
    stegProps: StegProps;
}

export type Props = DispatchProps &
    StateProps &
    InjectedIntlProps &
    HistoryProps;

class RelasjonTilBarnStebarnsadopsjonSteg extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateSøknad({
                barn: {
                    ...this.props.barn,
                    antallBarn: antall,
                    fødselsdatoer: utils.trimFødselsdatoer(
                        antall,
                        this.props.barn.fødselsdatoer
                    )
                }
            })
        );
    }

    render() {
        const { barn, intl, dispatch, stegProps } = this.props;
        return (
            <Steg {...stegProps}>
                <Spørsmål
                    render={() => (
                        <DatoInput
                            id="adopsjonsdato"
                            label={
                                <Labeltekst intlId="stebarnsadopsjon.adopsjonsdato" />
                            }
                            onChange={(dato: Date) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        adopsjonsdato: dato
                                    })
                                );
                            }}
                            dato={barn.adopsjonsdato}
                        />
                    )}
                />
                <Spørsmål
                    animert={true}
                    synlig={barn.adopsjonsdato !== undefined}
                    render={() => (
                        <AttachmentsUploader
                            attachments={barn.adopsjonsvedtak}
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
                            onFileDelete={() => {}}
                        />
                    )}
                />
                <Spørsmål
                    animert={false}
                    synlig={barn.adopsjonsdato !== undefined}
                    margin="none"
                    render={() => (
                        <AntallBarnSpørsmål
                            spørsmål={intl.formatMessage({
                                id: 'stebarnsadopsjon.antallBarn'
                            })}
                            inputName="stebarnsadopsjon.antallBarn.input"
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
            </Steg>
        );
    }
}

const mapStateToProps = (
    state: AppState & StegProps,
    props: Props
): StateProps => {
    const barn = state.søknad.barn as Adopsjonsbarn;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON,
        renderFortsettKnapp:
            barn.fødselsdatoer && barn.fødselsdatoer.length > 0,
        history: props.history
    };

    return {
        barn,
        stegProps
    };
};

export default injectIntl(
    connect(mapStateToProps)(RelasjonTilBarnStebarnsadopsjonSteg)
);
