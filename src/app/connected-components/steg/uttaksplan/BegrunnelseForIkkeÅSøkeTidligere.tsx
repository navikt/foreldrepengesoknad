import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { EndringTilbakeITidÅrsak } from 'app/types/uttaksplan/periodetyper';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Skjemanummer } from 'app/types/søknad/Søknad';
import { TextareaChangeEvent } from 'app/types/dom/Events';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import Textarea from 'common/components/skjema/wrappers/Textarea';
import VedleggSpørsmål from 'app/components/vedlegg-spørsmål/VedleggSpørsmål';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

interface OwnProps {
    årsak: EndringTilbakeITidÅrsak;
    begrunnelse?: string;
    vedlegg?: Attachment[];
    onBegrunnelseChange: (begrunnelse: string) => void;
    onVedleggChange: (vedlegg: Attachment[]) => void;
}

type Props = OwnProps & InjectedIntlProps;

const BegrunnelseForIkkeÅSøkeTidligere = (props: Props) => {
    const { begrunnelse, vedlegg, intl, årsak, onBegrunnelseChange, onVedleggChange } = props;

    const veilederMessage = `uttaksplan.endringTilbakeITid.veileder.${årsak}`;
    const begrunnelseLabel = `uttaksplan.endringTilbakeITid.begrunnelse.${årsak}`;

    return (
        <div className="blokk-m">
            <Block margin="xs">
                <Veilederinfo stil="normal" type="info">
                    <Normaltekst>{getMessage(intl, veilederMessage)}</Normaltekst>
                </Veilederinfo>
            </Block>
            <Block margin="s">
                <Textarea
                    value={begrunnelse || ''}
                    name="begrunnelseForIkkeÅSøkeTidligere"
                    label={getMessage(intl, begrunnelseLabel)}
                    onChange={(e: TextareaChangeEvent) => {
                        onBegrunnelseChange(e.target.value);
                    }}
                />
            </Block>
            <VedleggSpørsmål
                vedlegg={vedlegg || []}
                attachmentType={AttachmentType.BEGRUNNELSE_FOR_IKKE_Å_SØKE_TIDLIGERE}
                onChange={(endredeVedlegg: Attachment[]) => {
                    onVedleggChange(endredeVedlegg);
                }}
                skjemanummer={Skjemanummer.ANNET}
            />
        </div>
    );
};

export default injectIntl(BegrunnelseForIkkeÅSøkeTidligere);
