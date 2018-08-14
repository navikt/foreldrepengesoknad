import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { StegID } from '../../../util/routing/stegConfig';
import { DispatchProps } from 'common/redux/types';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';
import AntallBarnBolk from '../../../bolker/AntallBarnBolk';
import AdoptertIUtlandetSpørsmål from '../../../spørsmål/AdoptertIUtlandetSpørsmål';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import FødselsdatoerSpørsmål from '../../../spørsmål/FødselsdatoerSpørsmål';
import utils from '../../../util/domain/fødselsdato';
import { AppState } from '../../../redux/reducers';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { HistoryProps } from '../../../types/common';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import isAvailable from '../isAvailable';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import { AttachmentType, Skjemanummer } from '../../../types/søknad/Søknad';
import { fødselsdatoerErFyltUt } from '../../../util/validation/fields/fødselsdato';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import DateValues from '../../../util/validation/values';

interface StateProps {
    barn: Adopsjonsbarn;
    stegProps: StegProps;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class RelasjonTilBarnAdopsjonSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);

        if (props.barn.antallBarn) {
            props.dispatch(
                søknadActions.updateBarn({
                    fødselsdatoer: utils.trimFødselsdatoer(
                        props.barn.antallBarn,
                        this.props.barn.fødselsdatoer
                    )
                })
            );
        }
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
        const { barn, dispatch, stegProps, intl } = this.props;

        const fødselsdatoerFyltUt = fødselsdatoerErFyltUt(barn.fødselsdatoer);

        const visSpørsmålOmAntallBarn = barn.adopsjonsdato !== undefined;
        const visSpørsmålOmFødselsdatoer =
            visSpørsmålOmAntallBarn && barn.antallBarn !== undefined;
        const visSpørsmålOmAdoptertIUtlandet =
            barn.adoptertIUtlandet !== undefined ||
            (visSpørsmålOmFødselsdatoer && fødselsdatoerFyltUt);
        const visSpørsmålOmVedlegg =
            visSpørsmålOmAdoptertIUtlandet &&
            barn.adoptertIUtlandet !== undefined;

        return (
            <Steg {...stegProps}>
                <Block
                    render={() => (
                        <DatoInput
                            id="adopsjonsdato"
                            label={getMessage(intl, 'adopsjonsdato.spørsmål')}
                            onChange={(adopsjonsdato: Date) => {
                                dispatch(
                                    søknadActions.updateBarn({
                                        adopsjonsdato
                                    })
                                );
                            }}
                            dato={barn.adopsjonsdato}
                        />
                    )}
                />

                {visSpørsmålOmAntallBarn && (
                    <AntallBarnBolk
                        spørsmål={getMessage(
                            intl,
                            'antallBarn.spørsmål.venter'
                        )}
                        inputName="antallBarn"
                        antallBarn={barn.antallBarn}
                        onChange={this.oppdaterAntallBarn}
                    />
                )}

                {visSpørsmålOmFødselsdatoer && (
                    <FødselsdatoerSpørsmål
                        fødselsdatoer={barn.fødselsdatoer || []}
                        fødselsdatoAvgrensninger={{
                            minDato: DateValues.date15YearsAgo.toDate()
                        }}
                        onChange={(fødselsdatoer: Date[]) =>
                            dispatch(
                                søknadActions.updateBarn({
                                    fødselsdatoer
                                })
                            )
                        }
                    />
                )}

                <Block
                    visible={visSpørsmålOmAdoptertIUtlandet}
                    render={() => (
                        <AdoptertIUtlandetSpørsmål
                            adoptertIUtlandet={barn.adoptertIUtlandet}
                            onChange={(adoptertIUtlandet) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        adoptertIUtlandet
                                    })
                                )
                            }
                        />
                    )}
                />

                <Block
                    visible={visSpørsmålOmVedlegg}
                    title={getMessage(
                        intl,
                        'attachments.tittel.omsorgsovertakelse'
                    )}
                    render={() => (
                        <AttachmentsUploaderPure
                            attachments={
                                (barn as Adopsjonsbarn).omsorgsovertakelse || []
                            }
                            attachmentType={AttachmentType.OMSROGSOVERTAKELSE}
                            skjemanummer={Skjemanummer.OMSORGSOVERTAKELSESDATO}
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
                            onFileDelete={(attachment) =>
                                dispatch(
                                    søknadActions.deleteAttachment(attachment)
                                )
                            }
                        />
                    )}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const barn = state.søknad.barn as Adopsjonsbarn;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_ADOPSJON,
        renderFortsettKnapp: barnErGyldig(barn, state.søknad.situasjon),
        history: props.history,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_ADOPSJON, state)
    };

    return {
        barn,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnAdopsjonSteg)
);
