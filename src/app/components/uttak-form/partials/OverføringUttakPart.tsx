import * as React from 'react';
import { OverføringÅrsakType, Overføringsperiode } from '../../../types/uttaksplan/periodetyper';
import OverføringsårsakSpørsmål from '../../../spørsmål/OverføringsårsakSpørsmål';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { getOverføringÅrsakSkjemanummer } from '../../../util/skjemanummer/overføringÅrsakSkjemanummer';
import { RecursivePartial } from '../../../types/Partial';
import VedleggSpørsmål from '../../vedlegg-spørsmål/VedleggSpørsmål';

interface Props {
    årsak?: OverføringÅrsakType;
    vedlegg?: Attachment[];
    navnAnnenForelder: string;
    onChange: (periode: RecursivePartial<Overføringsperiode>) => void;
}

const getVeilederInfotekst = (årsak: OverføringÅrsakType, navnAnnenForelder: string) => {
    if (årsak === OverføringÅrsakType.insititusjonsoppholdAnnenForelder) {
        return (
            <FormattedMessage
                id="uttaksplan.overføring.vedlegg.info.insititusjonsoppholdAnnenForelder"
                values={{ navnAnnenForelder }}
            />
        );
    } else if (årsak === OverføringÅrsakType.sykdomAnnenForelder) {
        return (
            <FormattedMessage
                id="uttaksplan.overføring.vedlegg.info.sykdomAnnenForelder"
                values={{ navnAnnenForelder }}
            />
        );
    } else {
        return <FormattedMessage id="uttaksplan.overføring.vedlegg.info" />;
    }
};

class OverføringUttakPart extends React.Component<Props> {
    render() {
        const { onChange, årsak, vedlegg, navnAnnenForelder } = this.props;
        const vedleggList = vedlegg || [];

        return (
            <>
                <Block margin="s">
                    <OverføringsårsakSpørsmål
                        annenForelderNavn={navnAnnenForelder}
                        årsak={årsak}
                        onChange={(å) => onChange({ årsak: å })}
                    />
                </Block>
                <Block visible={årsak !== undefined}>
                    <Veilederinfo>{getVeilederInfotekst(årsak!, navnAnnenForelder)}</Veilederinfo>
                    <VedleggSpørsmål
                        vedlegg={vedleggList}
                        attachmentType={AttachmentType.OVERFØRING_KVOTE}
                        skjemanummer={getOverføringÅrsakSkjemanummer(årsak!)}
                        onChange={(v) => onChange({ vedlegg: v })}
                    />
                </Block>
            </>
        );
    }
}

export default OverføringUttakPart;
