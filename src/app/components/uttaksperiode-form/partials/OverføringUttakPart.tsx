import * as React from 'react';
import { OverføringÅrsakType, Overføringsperiode } from '../../../types/uttaksplan/periodetyper';
import OverføringsårsakSpørsmål from '../../../spørsmål/OverføringsårsakSpørsmål';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { getOverføringÅrsakSkjemanummer } from '../../../util/skjemanummer/overføringÅrsakSkjemanummer';
import VedleggSpørsmål from '../../vedlegg-spørsmål/VedleggSpørsmål';
import { RecursivePartial } from '../../../types/Partial';

interface Props {
    årsak?: OverføringÅrsakType;
    vedlegg?: Attachment[];
    navnAnnenForelder: string;
    søkerErFarEllerMedmor: boolean;
    onChange: (periode: RecursivePartial<Overføringsperiode>) => void;
}

class OverføringUttakPart extends React.Component<Props> {
    render() {
        const { onChange, søkerErFarEllerMedmor, årsak, vedlegg, navnAnnenForelder } = this.props;
        const visVedlegg =
            (årsak !== undefined && årsak !== OverføringÅrsakType.aleneomsorg) ||
            (årsak === OverføringÅrsakType.aleneomsorg && søkerErFarEllerMedmor === true);
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
                <Block visible={visVedlegg}>
                    <Veilederinfo>
                        <FormattedMessage id="uttaksplan.overføring.vedlegg.info" />
                    </Veilederinfo>
                    <VedleggSpørsmål
                        vedlegg={vedleggList}
                        attachmentType={AttachmentType.OVERFØRING_KVOTE}
                        skjemanummer={getOverføringÅrsakSkjemanummer(årsak!)}
                        onChange={(v) => onChange({ vedlegg })}
                    />
                </Block>
            </>
        );
    }
}

export default OverføringUttakPart;
