import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { getFritekstfeltRules } from 'app/util/validation/fritekstfelt';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { SenEndringÅrsak } from 'app/types/uttaksplan/periodetyper';
import { Skjemanummer } from 'app/types/søknad/Søknad';
import { TextareaChangeEvent } from 'app/types/dom/Events';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import Textarea from 'common/components/skjema/wrappers/Textarea';
import throttle from 'lodash.throttle';
import VedleggSpørsmål from 'app/components/vedlegg-spørsmål/VedleggSpørsmål';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

const BEGRUNNELSE_MAX_LENGTH = 10;

interface OwnProps {
    årsak: SenEndringÅrsak;
    begrunnelse?: string;
    vedlegg?: Attachment[];
    onBegrunnelseChange: (begrunnelse: string) => void;
    onVedleggChange: (vedlegg: Attachment[]) => void;
}

type Props = OwnProps & InjectedIntlProps;

interface State {
    begrunnelse: string;
}

class BegrunnelseForSenEndring extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            begrunnelse: this.props.begrunnelse || ''
        };

        this.throttledOnChange = throttle(this.throttledOnChange, 2000);
    }

    throttledOnChange = () => {
        this.props.onBegrunnelseChange(this.state.begrunnelse);
    };

    handleBegrunnelseChange = (e: TextareaChangeEvent) => {
        this.setState(
            {
                begrunnelse: e.target.value
            },
            this.throttledOnChange
        );
    };

    render() {
        const { vedlegg, intl, årsak, onVedleggChange } = this.props;

        const veilederMessage = `uttaksplan.senEndring.veileder.${årsak}`;
        const begrunnelseLabel = `uttaksplan.senEndring.begrunnelse.${årsak}`;

        return (
            <div className="blokk-m">
                <Block margin="xs">
                    <Veilederinfo stil="normal" type="info">
                        <Normaltekst>{getMessage(intl, veilederMessage)}</Normaltekst>
                    </Veilederinfo>
                </Block>
                <Block margin="s">
                    <Textarea
                        value={this.state.begrunnelse}
                        maxLength={BEGRUNNELSE_MAX_LENGTH}
                        validators={getFritekstfeltRules(
                            { maxLength: BEGRUNNELSE_MAX_LENGTH },
                            intl,
                            this.state.begrunnelse
                        )}
                        name="begrunnelseForSenEndring"
                        label={getMessage(intl, begrunnelseLabel)}
                        onChange={this.handleBegrunnelseChange}
                    />
                </Block>
                <VedleggSpørsmål
                    vedlegg={vedlegg || []}
                    attachmentType={AttachmentType.SEN_ENDRING}
                    onChange={(endredeVedlegg: Attachment[]) => {
                        onVedleggChange(endredeVedlegg);
                    }}
                    skjemanummer={Skjemanummer.ANNET}
                />
            </div>
        );
    }
}

export default injectIntl(BegrunnelseForSenEndring);
