import { formatDate } from '@navikt/fp-common';
import { Frilans } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import InteractiveListElement from '@navikt/fp-common/src/common/components/interactive-list-element/InteractiveListElement';

interface Props {
    frilans: Frilans;
    deleteFrilans: (oppdrag: Frilans) => void;
    selectFrilans: (oppdrag: Frilans) => void;
}

const FrilansInformasjon: FunctionComponent<Props> = ({ frilans, deleteFrilans, selectFrilans }) => {
    return (
        <InteractiveListElement
            deleteLinkText="Slett oppdrag"
            onDelete={() => deleteFrilans(frilans)}
            onEdit={() => selectFrilans(frilans)}
            text={`${formatDate(frilans.oppstart)} - ${frilans.sluttDato ? formatDate(frilans.sluttDato) : 'pågående'}`}
            title={'Frilansarbeid'}
            deleteButtonAriaText={'Slett frilansarbeid'}
            editButtonAriaText={'Rediger frilansarbeid'}
        />
    );
};

export default FrilansInformasjon;
