import * as React from 'react';
import { OverføringÅrsakType, Overføringsperiode } from '../../../types/uttaksplan/periodetyper';
import OverføringsårsakSpørsmål from '../../../spørsmål/OverføringsårsakSpørsmål';
import Block from 'common/components/block/Block';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { getOverføringÅrsakSkjemanummer } from '../../../util/skjemanummer/overføringÅrsakSkjemanummer';
import { RecursivePartial } from '../../../types/Partial';
import VedleggSpørsmål from '../../vedlegg-spørsmål/VedleggSpørsmål';
import VeilederMeldinger, { Message } from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';

interface Props {
    årsak?: OverføringÅrsakType;
    vedlegg?: Attachment[];
    navnAnnenForelder: string;
    søkerErFarEllerMedmor: boolean;
    erEndringssøknad: boolean;
    onChange: (periode: RecursivePartial<Overføringsperiode>) => void;
}

export const visVedlegg = (søkerErFarEllerMedmor: boolean, årsak: OverføringÅrsakType | undefined): boolean => {
    if (årsak !== undefined && årsak === OverføringÅrsakType.ikkeRettAnnenForelder) {
        return false;
    }

    if (søkerErFarEllerMedmor) {
        return årsak !== undefined;
    } else {
        return årsak !== undefined && årsak !== OverføringÅrsakType.aleneomsorg;
    }
};

const getVeilederInfotekst = (årsak: OverføringÅrsakType, navnAnnenForelder: string): Message => {
    if (årsak === OverføringÅrsakType.insititusjonsoppholdAnnenForelder) {
        return {
            type: 'normal',
            contentIntlKey: 'uttaksplan.overføring.vedlegg.info.insititusjonsoppholdAnnenForelder',
            values: { navnAnnenForelder }
        };
    } else if (årsak === OverføringÅrsakType.sykdomAnnenForelder) {
        return {
            type: 'normal',
            contentIntlKey: 'uttaksplan.overføring.vedlegg.info.sykdomAnnenForelder',
            values: { navnAnnenForelder }
        };
    } else {
        return {
            type: 'normal',
            contentIntlKey: 'uttaksplan.overføring.vedlegg.info'
        };
    }
};

class OverføringUttakPart extends React.Component<Props> {
    render() {
        const { onChange, søkerErFarEllerMedmor, årsak, vedlegg, navnAnnenForelder, erEndringssøknad } = this.props;
        const vedleggList = vedlegg || [];

        return (
            <>
                <Block margin="s">
                    <OverføringsårsakSpørsmål
                        annenForelderNavn={navnAnnenForelder}
                        årsak={årsak}
                        onChange={(å) => onChange({ årsak: å })}
                        visAleneomsorgSomMuligÅrsak={erEndringssøknad}
                    />
                </Block>
                <Block visible={visVedlegg(søkerErFarEllerMedmor, årsak)}>
                    <VeilederMeldinger messages={[getVeilederInfotekst(årsak!, navnAnnenForelder)]} />
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
