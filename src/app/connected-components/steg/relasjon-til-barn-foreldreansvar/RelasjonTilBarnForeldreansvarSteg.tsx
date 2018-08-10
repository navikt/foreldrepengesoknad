import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { StegID } from '../../../util/routing/stegConfig';
import Steg from 'app/components/steg/Steg';

import { DispatchProps } from 'common/redux/types';
import { AppState } from '../../../redux/reducers';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import AntallBarnSpørsmålsgruppe from '../../../spørsmål/AntallBarnSpørsmålsgruppe';
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
import isAvailable from '../isAvailable';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import { AttachmentType } from '../../../types/søknad/Søknad';
import DateValues from '../../../util/validation/values';
import { fødselsdatoerErFyltUt } from '../../../util/validation/fields/fødselsdato';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import Bolk from 'common/components/bolk/Bolk';
import getMessage from 'common/util/i18nUtils';

export interface StateProps {
    barn: ForeldreansvarBarnPartial;
    visOver15årMelding: boolean;
    stegProps: StegProps;
    fødselsdatoerOk: boolean;
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
            fødselsdatoerOk,
            intl,
            stegProps,
            dispatch
        } = this.props;

        const visSpørsmålOmAntallBarn = barn.foreldreansvarsdato !== undefined;
        const visSpørsmålOmFødselsdatoer = barn.antallBarn !== undefined;
        const visSpørsmålOmVedlegg =
            fødselsdatoerOk || barn.adopsjonsvedtak !== undefined;

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
                {visSpørsmålOmAntallBarn && (
                    <AntallBarnSpørsmålsgruppe
                        spørsmål={intl.formatMessage({
                            id: 'foreldreansvar.antallBarn'
                        })}
                        inputName="foreldreansvar.antallBarn.input"
                        antallBarn={barn.antallBarn}
                        onChange={this.oppdaterAntallBarn}
                    />
                )}

                <Spørsmål
                    synlig={visSpørsmålOmFødselsdatoer}
                    margin="none"
                    render={() => (
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
                />
                {visOver15årMelding && (
                    <div className="blokk-s">
                        <Veilederinfo type="advarsel">
                            Barn over 15 år er registrert.
                        </Veilederinfo>
                    </div>
                )}

                <EkspanderbartInnhold erApen={visSpørsmålOmVedlegg}>
                    <Bolk
                        tittel={getMessage(
                            intl,
                            'attachments.tittel.foreldreansvar'
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
    const fødselsdatoerOk = fødselsdatoerErFyltUt(barn.fødselsdatoer);

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FORELDREANSVAR,
        renderFortsettKnapp:
            barnErGyldig(state.søknad.barn, state.søknad.situasjon) &&
            fødselsdatoerOk,
        history: props.history,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_FORELDREANSVAR, state)
    };

    return {
        barn,
        visOver15årMelding: erAlderOver15År(barn.fødselsdatoer || []),
        fødselsdatoerOk,
        stegProps
    };
};

export default injectIntl(
    connect(mapStateToProps)(RelasjonTilBarnForeldreansvarSteg)
);
