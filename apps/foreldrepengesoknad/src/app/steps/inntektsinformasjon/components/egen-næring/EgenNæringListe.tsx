import { formatDate } from '@navikt/fp-common';
import InteractiveListElement from 'app/components/interactive-list-element/InteractiveListElement';
import { Næring } from 'app/context/types/Næring';
import React, { FunctionComponent } from 'react';

interface Props {
    næringsInformasjon: Næring[];
    deleteNæring: (oppdrag: Næring) => void;
    selectNæring: (oppdrag: Næring) => void;
}

const EgenNæringListe: FunctionComponent<Props> = ({ næringsInformasjon, deleteNæring, selectNæring }) => {
    if (næringsInformasjon.length === 0) {
        return null;
    }

    return (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {næringsInformasjon.map((næring, index) => (
                <InteractiveListElement
                    deleteLinkText="Slett næring"
                    onDelete={() => deleteNæring(næring)}
                    onEdit={() => selectNæring(næring)}
                    text={`${formatDate(næring.tidsperiode.fom)} - ${
                        næring.tidsperiode.tom ? formatDate(næring.tidsperiode.tom) : 'pågående'
                    }`}
                    title={næring.navnPåNæringen}
                    deleteButtonAriaText={`Slett næring`}
                    editButtonAriaText={`Rediger næring`}
                    key={`${næring.navnPåNæringen}${index}`}
                />
            ))}
        </ul>
    );
};

export default EgenNæringListe;
