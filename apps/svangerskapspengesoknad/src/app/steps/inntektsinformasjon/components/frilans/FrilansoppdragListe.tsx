import { formatDate } from '@navikt/fp-common';
import { FrilansOppdrag } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import InteractiveListElement from '@navikt/fp-common/src/common/components/interactive-list-element/InteractiveListElement';

interface Props {
    frilansoppdrag: FrilansOppdrag[];
    deleteFrilansoppdrag: (oppdrag: FrilansOppdrag) => void;
    selectOppdrag: (oppdrag: FrilansOppdrag) => void;
}

const FrilansoppdragListe: FunctionComponent<Props> = ({ frilansoppdrag, deleteFrilansoppdrag, selectOppdrag }) => {
    if (frilansoppdrag.length === 0) {
        return null;
    }

    return (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {frilansoppdrag.map((oppdrag, index) => (
                <InteractiveListElement
                    deleteLinkText="Slett oppdrag"
                    onDelete={() => deleteFrilansoppdrag(oppdrag)}
                    onEdit={() => selectOppdrag(oppdrag)}
                    text={`${formatDate(oppdrag.tidsperiode.fom)} - ${
                        oppdrag.tidsperiode.tom ? formatDate(oppdrag.tidsperiode.tom) : 'pågående'
                    }`}
                    title={oppdrag.navnPåArbeidsgiver}
                    deleteButtonAriaText={`Slett oppdrag for ${oppdrag.navnPåArbeidsgiver}`}
                    editButtonAriaText={`Rediger oppdrag for ${oppdrag.navnPåArbeidsgiver}`}
                    key={`${oppdrag.navnPåArbeidsgiver}+${index}`}
                />
            ))}
        </ul>
    );
};

export default FrilansoppdragListe;
