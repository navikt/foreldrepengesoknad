import * as React from 'react';
import { OverføringÅrsakType } from '../../../types/uttaksplan/periodetyper';
import OverføringsårsakSpørsmål from '../../../spørsmål/OverføringsårsakSpørsmål';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { getOverføringÅrsakSkjemanummer } from '../../../util/skjemanummer/overføring\u00C5rsakSkjemanummer';
import VedleggSpørsmål from '../../vedlegg-sp\u00F8rsm\u00E5l/VedleggSp\u00F8rsm\u00E5l';

interface Props {
    skjemadata: OverføringUttakFormSkjemadata;
    navnAnnenForelder: string;
    søkerErFarEllerMedmor: boolean;
    onChange: (skjemadata: OverføringUttakFormSkjemadata) => void;
}

export interface OverføringUttakFormSkjemadata {
    årsak?: OverføringÅrsakType;
    vedlegg?: Attachment[];
}

class OverføringUttakForm extends React.Component<Props> {
    render() {
        const { onChange, søkerErFarEllerMedmor, skjemadata, navnAnnenForelder } = this.props;
        const visVedlegg =
            (skjemadata.årsak !== undefined && skjemadata.årsak !== OverføringÅrsakType.aleneomsorg) ||
            (skjemadata.årsak === OverføringÅrsakType.aleneomsorg && søkerErFarEllerMedmor === true);
        const vedleggList = skjemadata.vedlegg || [];
        return (
            <>
                <Block margin="s">
                    <OverføringsårsakSpørsmål
                        annenForelderNavn={navnAnnenForelder}
                        årsak={skjemadata.årsak}
                        onChange={(å) => onChange({ årsak: å })}
                    />
                </Block>
                <Block visible={visVedlegg}>
                    <Veilederinfo>
                        <FormattedMessage id="uttaksplan.overføring.vedlegg.info" />
                    </Veilederinfo>
                    <VedleggSpørsmål
                        vedlegg={vedleggList}
                        attachmentType={AttachmentType.OVERFØRING_KVOTE}
                        skjemanummer={getOverføringÅrsakSkjemanummer(skjemadata.årsak!)}
                        onChange={(vedlegg) => onChange({ årsak: this.props.skjemadata.årsak, vedlegg })}
                    />
                </Block>
            </>
        );
    }
}

export default OverføringUttakForm;
