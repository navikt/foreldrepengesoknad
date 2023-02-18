import { formatDate } from '@navikt/fp-common';
import InteractiveListElement from 'app/components/interactive-list-element/InteractiveListElement';
import { FrilansOppdrag } from 'app/context/types/Frilans';
import React, { FunctionComponent } from 'react';

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
