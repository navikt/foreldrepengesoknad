import { FunctionComponent } from 'react';
import { Block, guid } from '@navikt/fp-common';
import { TilretteleggingInput } from 'app/types/Tilrettelegging';
import DelvisTilretteleggingVisning from './DelvisTilretteleggingVisning';
import DelvisTilretteleggingSubform from './subform/DelvisTilretteleggingSubform';

interface Props {
    tilrettelegging: TilretteleggingInput;
    isSelected: boolean;
    selectedTilrettelegging: TilretteleggingInput | undefined;
    addTilrettelegging: (inntekt: TilretteleggingInput) => void;
    editTilrettelegging: (inntektSomEditeres: TilretteleggingInput, oppdatertInntekt: TilretteleggingInput) => void;
    deleteTilrettelegging: (inntektSomSlettes: TilretteleggingInput) => void;
    setSelectedTilrettelegging: React.Dispatch<React.SetStateAction<TilretteleggingInput | undefined>>;
    setLeggTilNyttTilrettelegging: React.Dispatch<React.SetStateAction<boolean>>;
}

const TilretteleggingListElement: FunctionComponent<Props> = ({
    isSelected,
    tilrettelegging,
    selectedTilrettelegging,
    setSelectedTilrettelegging,
    deleteTilrettelegging,
    addTilrettelegging,
    editTilrettelegging,
    setLeggTilNyttTilrettelegging,
}) => {
    return (
        <div key={guid()}>
            <Block padBottom="s">
                {!isSelected && (
                    <DelvisTilretteleggingVisning
                        tilrettelegging={tilrettelegging}
                        setSelectedTilrettelegging={setSelectedTilrettelegging}
                        deleteTilrettelegging={deleteTilrettelegging}
                    />
                )}
                {isSelected && (
                    <DelvisTilretteleggingSubform
                        selectedTilrettelegging={selectedTilrettelegging}
                        addTilrettelegging={addTilrettelegging}
                        editTilrettelegging={editTilrettelegging}
                        setSelectedTilrettelegging={setSelectedTilrettelegging}
                        erFørsteInput={false}
                        setLeggTilNyttTilrettelegging={setLeggTilNyttTilrettelegging}
                    />
                )}
            </Block>
        </div>
    );
};

export default TilretteleggingListElement;
