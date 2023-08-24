import { FunctionComponent } from 'react';
import { guid } from '@navikt/fp-common';
import { TilretteleggingInput } from 'app/types/Tilrettelegging';
import DelvisTilretteleggingListElement from './DelvisTilretteleggingListElement';

interface Props {
    selectedTilrettelegging: TilretteleggingInput | undefined;
    allTilrettelegging: TilretteleggingInput[];
    addTilrettelegging: (inntekt: TilretteleggingInput) => void;
    editTilrettelegging: (
        tilretteleggingSomEditeres: TilretteleggingInput,
        oppdatertTilrettelegging: TilretteleggingInput
    ) => void;
    deleteTilrettelegging: (inntektSomSlettes: TilretteleggingInput) => void;
    setSelectedTilrettelegging: React.Dispatch<React.SetStateAction<TilretteleggingInput | undefined>>;
    setLeggTilNyttTilrettelegging: React.Dispatch<React.SetStateAction<boolean>>;
}

const DelvisTilretteleggingList: FunctionComponent<Props> = ({
    selectedTilrettelegging,
    allTilrettelegging,
    addTilrettelegging,
    editTilrettelegging,
    deleteTilrettelegging,
    setSelectedTilrettelegging,
    setLeggTilNyttTilrettelegging,
}) => {
    return (
        <>
            {allTilrettelegging.map((tilrettelegging) => (
                <DelvisTilretteleggingListElement
                    key={guid()}
                    isSelected={selectedTilrettelegging === tilrettelegging}
                    tilrettelegging={tilrettelegging}
                    addTilrettelegging={addTilrettelegging}
                    editTilrettelegging={editTilrettelegging}
                    deleteTilrettelegging={deleteTilrettelegging}
                    setSelectedTilrettelegging={setSelectedTilrettelegging}
                    selectedTilrettelegging={selectedTilrettelegging}
                    setLeggTilNyttTilrettelegging={setLeggTilNyttTilrettelegging}
                />
            ))}
        </>
    );
};

export default DelvisTilretteleggingList;
