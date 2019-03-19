import * as React from 'react';
import Block from 'common/components/block/Block';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { MorsAktivitet } from '../types/uttaksplan/periodetyper';
import HvaSkalMorGjøreSpørsmål from '../spørsmål/HvaSkalMorGjøreSpørsmål';
import { getMorsAktivitetSkjemanummer } from '../util/skjemanummer/morsAktivitetSkjemanummer';
import VedleggSpørsmål from '../components/vedlegg-spørsmål/VedleggSpørsmål';
import { NavnISøknaden } from 'app/selectors/types';

export interface AktivitetskravMorChangeEvent {
    morsAktivitetIPerioden?: MorsAktivitet;
    vedlegg?: Attachment[];
}

interface OwnProps {
    morsAktivitetIPerioden?: MorsAktivitet;
    vedlegg?: Attachment[];
    navnPåForeldre: NavnISøknaden;
    onChange: (event: AktivitetskravMorChangeEvent) => void;
}

type Props = OwnProps & InjectedIntlProps;

class AktivitetskravMorBolk extends React.Component<Props> {
    render() {
        const { navnPåForeldre, vedlegg, onChange, morsAktivitetIPerioden } = this.props;
        return (
            <>
                <Block hasChildBlocks={true}>
                    <HvaSkalMorGjøreSpørsmål
                        navnPåForeldre={navnPåForeldre}
                        morsAktivitetIPerioden={morsAktivitetIPerioden}
                        onChange={(v) => onChange({ morsAktivitetIPerioden: v })}
                    />
                </Block>

                <Block margin="s" visible={morsAktivitetIPerioden !== undefined}>
                    <VedleggSpørsmål
                        attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
                        skjemanummer={getMorsAktivitetSkjemanummer(this.props.morsAktivitetIPerioden)}
                        vedlegg={vedlegg}
                        onChange={(v) => onChange({ vedlegg: v })}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(AktivitetskravMorBolk);
