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
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import isAvailable from '../util/isAvailable';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import { AttachmentType, Skjemanummer } from '../../../types/søknad/Søknad';
import { fødselsdatoerErFyltUt } from '../../../util/validation/fields/fødselsdato';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import DateValues from '../../../util/validation/values';
import AdopsjonAvEktefellesBarnSpørsmål from '../../../spørsmål/AdopsjonAvEktefellesBarnSpørsmål';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';

interface StateProps {
    barn: Adopsjonsbarn;
    stegProps: StegProps;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class RelasjonTilBarnAdopsjonSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);

        if (props.barn.antallBarn) {
            props.dispatch(
                søknadActions.updateBarn({
                    fødselsdatoer: utils.trimFødselsdatoer(props.barn.antallBarn, this.props.barn.fødselsdatoer)
                })
            );
        }
    }

    oppdaterAntallBarn(antall: number) {
        this.props.dispatch(
            søknadActions.updateBarn({
                ...this.props.barn,
                antallBarn: antall,
                fødselsdatoer: utils.trimFødselsdatoer(antall, this.props.barn.fødselsdatoer)
            })
        );
    }

    render() {
        const { barn, dispatch, stegProps, intl } = this.props;

        const utfyltFødselsdatoer = fødselsdatoerErFyltUt(barn.fødselsdatoer);
        const visSpørsmålOmAdopsjonsdato = barn.adopsjonAvEktefellesBarn !== undefined;
        const visSpørsmålOmAntallBarn = barn.adopsjonsdato !== undefined;
        const visSpørsmålOmFødselsdatoer = visSpørsmålOmAntallBarn && barn.antallBarn !== undefined;
        const visSpørsmålOmAdoptertIUtlandet =
            !barn.adopsjonAvEktefellesBarn && visSpørsmålOmFødselsdatoer && utfyltFødselsdatoer;
        const visSpørsmålOmAnkomstdato = barn.adopsjonAvEktefellesBarn === false && barn.adoptertIUtlandet === true;
        const utfyltAdoptertIUtlandet =
            visSpørsmålOmAdoptertIUtlandet &&
            ((barn.adoptertIUtlandet && barn.ankomstdato !== undefined) || barn.adoptertIUtlandet === false);
        const visSpørsmålOmVedlegg =
            utfyltAdoptertIUtlandet || (barn.adopsjonAvEktefellesBarn === true && utfyltFødselsdatoer);

        return (
            <Steg {...stegProps}>
                <Block>
                    <AdopsjonAvEktefellesBarnSpørsmål
                        adopsjonAvEktefellesBarn={barn.adopsjonAvEktefellesBarn}
                        onChange={(adopsjonAvEktefellesBarn: boolean) => {
                            dispatch(
                                søknadActions.updateBarn({
                                    adopsjonAvEktefellesBarn
                                })
                            );
                        }}
                    />
                </Block>

                <Block visible={visSpørsmålOmAdopsjonsdato}>
                    <DatoInput
                        id="adopsjonsdato"
                        label={getMessage(
                            intl,
                            barn.adopsjonAvEktefellesBarn ? 'stebarnsadopsjonsdato.spørsmål' : 'adopsjonsdato.spørsmål'
                        )}
                        onChange={(adopsjonsdato: Date) => {
                            dispatch(
                                søknadActions.updateBarn({
                                    adopsjonsdato
                                })
                            );
                        }}
                        dato={barn.adopsjonsdato}
                    />
                </Block>

                <Block visible={visSpørsmålOmAntallBarn}>
                    <AntallBarnBolk
                        spørsmål={getMessage(intl, 'antallBarn.spørsmål.venter')}
                        inputName="antallBarn"
                        antallBarn={barn.antallBarn}
                        onChange={this.oppdaterAntallBarn}
                    />
                </Block>

                <Block visible={visSpørsmålOmFødselsdatoer}>
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
                </Block>

                <Block visible={visSpørsmålOmAdoptertIUtlandet}>
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
                </Block>

                <Block visible={visSpørsmålOmAnkomstdato}>
                    <DatoInput
                        id="ankomstdato"
                        name="ankomstdato"
                        label={getMessage(intl, 'ankomstdato.spørsmål')}
                        onChange={(ankomstdato: Date) => {
                            dispatch(
                                søknadActions.updateBarn({
                                    ankomstdato
                                })
                            );
                        }}
                        dato={barn.ankomstdato}
                    />
                </Block>

                <Block
                    visible={visSpørsmålOmVedlegg}
                    header={{
                        title: getMessage(
                            intl,
                            barn.adopsjonAvEktefellesBarn
                                ? 'attachments.tittel.stebarnsadopsjon'
                                : 'attachments.tittel.omsorgsovertakelse'
                        )
                    }}>
                    <Block margin="xs">
                        <Veilederinfo>
                            {getMessage(
                                intl,
                                barn.adopsjonAvEktefellesBarn
                                    ? 'vedlegg.veileder.stebarnsadopsjon'
                                    : 'vedlegg.veileder.adopsjon'
                            )}
                        </Veilederinfo>
                    </Block>
                    <AttachmentsUploaderPure
                        attachments={(barn as Adopsjonsbarn).omsorgsovertakelse || []}
                        attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                        skjemanummer={Skjemanummer.OMSORGSOVERTAKELSESDATO}
                        onFilesSelect={(attachments: Attachment[]) => {
                            attachments.forEach((attachment: Attachment) => {
                                dispatch(søknadActions.uploadAttachment(attachment));
                            });
                        }}
                        onFileDelete={(attachment) => dispatch(søknadActions.deleteAttachment(attachment))}
                    />
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const barn = state.søknad.barn as Adopsjonsbarn;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_ADOPSJON,
        renderFortsettKnapp: barnErGyldig(state.søknad, props.søkerinfo),
        history: props.history,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_ADOPSJON, state.søknad, props.søkerinfo)
    };

    return {
        barn,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(RelasjonTilBarnAdopsjonSteg));
