import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import stegConfig, { StegID } from '../../../util/routing/stegConfig';
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
import { Skjemanummer } from '../../../types/søknad/Søknad';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import DateValues from '../../../util/validation/values';
import AdopsjonAvEktefellesBarnSpørsmål from '../../../spørsmål/AdopsjonAvEktefellesBarnSpørsmål';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import visibility from './visibility';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import cleanupAdopsjonsSteg from '../../../util/cleanup/cleanupAdopsjonsSteg';
import { apiActionCreators } from '../../../redux/actions';
import { søknadStegPath } from '../StegRoutes';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';

interface StateProps {
    barn: Adopsjonsbarn;
    stegProps: StegProps;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class RelasjonTilBarnAdopsjonSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.oppdaterAntallBarn = this.oppdaterAntallBarn.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

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

    handleOnSubmit(event: FormSubmitEvent, stegForm: Element) {
        const { dispatch, history, barn } = this.props;
        if (event.target === stegForm) {
            dispatch(søknadActions.updateBarn(cleanupAdopsjonsSteg(barn)));
            dispatch(apiActionCreators.storeAppState());
            history.push(`${søknadStegPath(stegConfig[StegID.RELASJON_TIL_BARN_ADOPSJON].nesteSteg)}`);
        }
    }

    render() {
        const { barn, dispatch, stegProps, intl } = this.props;

        return (
            <Steg onSubmit={this.handleOnSubmit} {...stegProps}>
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

                <Block visible={visibility.spørsmålOmAdopsjonsdato(barn)}>
                    <DatoInput
                        name="adopsjonsdato"
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

                <Block visible={visibility.spørsmålOmAntallBarn(barn)} hasChildBlocks={true}>
                    <AntallBarnBolk
                        spørsmål={getMessage(intl, 'antallBarn.spørsmål.venter')}
                        inputName="antallBarn"
                        antallBarn={barn.antallBarn}
                        onChange={this.oppdaterAntallBarn}
                    />
                </Block>

                <Block visible={visibility.spørsmålOmFødselsdatoer(barn)} hasChildBlocks={true}>
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

                <Block visible={visibility.spørsmålOmAdoptertIUtlandet(barn)}>
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

                <Block visible={visibility.spørsmålOmAnkomstdato(barn)}>
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

                <Block visible={visibility.spørsmålOmVedlegg(barn)}>
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
        renderFormTag: true,
        history: props.history,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_ADOPSJON, state.søknad, props.søkerinfo)
    };

    return {
        barn,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(RelasjonTilBarnAdopsjonSteg));
