import * as React from 'react';
import Block from 'common/components/block/Block';
import { injectIntl, IntlShape } from 'react-intl';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { MorsAktivitet } from '../../../types/uttaksplan/periodetyper';
import HvaSkalMorGjøreSpørsmål from '../../../spørsmål/HvaSkalMorGjøreSpørsmål';
import { getMorsAktivitetSkjemanummer } from '../../../util/skjemanummer/morsAktivitetSkjemanummer';
import VedleggSpørsmål from '../../skjema/vedleggSpørsmål/VedleggSpørsmål';
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
    intl: IntlShape;
}

type Props = OwnProps;

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
