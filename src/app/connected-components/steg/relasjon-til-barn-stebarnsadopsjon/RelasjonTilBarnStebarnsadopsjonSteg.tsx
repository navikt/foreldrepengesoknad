import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { StegID } from '../../../util/routing/stegConfig';
import Steg, { StegProps } from 'app/components/steg/Steg';

import { DispatchProps } from 'common/redux/types';
import { AppState } from '../../../redux/reducers';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import AntallBarnBolk from '../../../bolker/AntallBarnBolk';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import Labeltekst from 'common/components/labeltekst/Labeltekst';

import utils from '../../../util/domain/fødselsdato';
import { HistoryProps } from '../../../types/common';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import isAvailable from '../isAvailable';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import { AttachmentType } from '../../../types/søknad/Søknad';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { fødselsdatoerErFyltUt } from '../../../util/validation/fields/fødselsdato';
import Bolk from 'common/components/bolk/Bolk';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import getMessage from 'common/util/i18nUtils';

export interface StateProps {
    barn: Adopsjonsbarn;
    fødselsdatoerOk: boolean;
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
        const { barn, fødselsdatoerOk, intl, dispatch, stegProps } = this.props;

        const visSpørsmålOmAntallBarn = barn.adopsjonsdato !== undefined;
        const visSpørsmålOmFødselsdatoer =
            visSpørsmålOmAntallBarn && barn.antallBarn !== undefined;
        const visSpørsmålOmVedlegg = fødselsdatoerOk;

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
                {visSpørsmålOmAntallBarn && (
                    <AntallBarnBolk
                        spørsmål={intl.formatMessage({
                            id: 'stebarnsadopsjon.antallBarn'
                        })}
                        inputName="stebarnsadopsjon.antallBarn.input"
                        antallBarn={barn.antallBarn}
                        onChange={this.oppdaterAntallBarn}
                    />
                )}
                <Spørsmål
                    synlig={visSpørsmålOmFødselsdatoer}
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
                <EkspanderbartInnhold erApen={visSpørsmålOmVedlegg}>
                    <Bolk
                        tittel={getMessage(
                            intl,
                            'attachments.tittel.stebarnsadopsjon'
                        )}
                        render={() => (
                            <div className="blokkPad-m">
                                <AttachmentsUploaderPure
                                    attachments={barn.adopsjonsvedtak || []}
                                    attachmentType={
                                        AttachmentType.ADOPSJONSVEDTAK
                                    }
                                    onFilesSelect={(
                                        attachments: Attachment[]
                                    ) => {
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
                                            søknadActions.deleteAttachment(
                                                attachment
                                            )
                                        )
                                    }
                                />
                            </div>
                        )}
                    />
                </EkspanderbartInnhold>
            </Steg>
        );
    }
}

const mapStateToProps = (
    state: AppState & StegProps,
    props: Props
): StateProps => {
    const barn = state.søknad.barn as Adopsjonsbarn;
    const fødselsdatoerOk = fødselsdatoerErFyltUt(barn.fødselsdatoer);

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON,
        renderFortsettKnapp:
            barnErGyldig(barn, state.søknad.situasjon) && fødselsdatoerOk,
        history: props.history,
        isAvailable: isAvailable(
            StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON,
            state
        )
    };

    return {
        barn,
        fødselsdatoerOk,
        stegProps
    };
};

export default injectIntl(
    connect(mapStateToProps)(RelasjonTilBarnStebarnsadopsjonSteg)
);
