import { Block, guid } from '@navikt/fp-common';
import { Næring } from 'app/types/Næring';
import { FunctionComponent } from 'react';
import EgenNæringVisning from '../EgenNæringVisning';
import EgenNæringSubform from '../subform/EgenNæringSubform';

interface Props {
    næring: Næring;
    isSelected: boolean;
    selectedNæring: Næring | undefined;
    allNæring: Næring[];
    addNæring: (inntekt: Næring) => void;
    editNæring: (inntektSomEditeres: Næring, oppdatertInntekt: Næring) => void;
    deleteNæring: (inntektSomSlettes: Næring) => void;
    setSelectedNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    setLeggTilNyttNæring: React.Dispatch<React.SetStateAction<boolean>>;
}

const EgenNæringListElement: FunctionComponent<Props> = ({
    isSelected,
    næring,
    selectedNæring,
    allNæring,
    setSelectedNæring,
    deleteNæring,
    addNæring,
    editNæring,
    setLeggTilNyttNæring,
}) => {
    return (
        <div key={guid()}>
            <Block padBottom="s">
                {!isSelected && (
                    <EgenNæringVisning
                        næring={næring}
                        setSelectedNæring={setSelectedNæring}
                        deleteNæring={deleteNæring}
                    />
                )}
                {isSelected && (
                    <EgenNæringSubform
                        addNæring={addNæring}
                        editNæring={editNæring}
                        allNæring={allNæring}
                        erFørsteInput={false}
                        selectedNæring={selectedNæring}
                        setLeggTilNyNæring={setLeggTilNyttNæring}
                        setSelectedNæring={setSelectedNæring}
                    />
                )}
            </Block>
        </div>
    );
};

export default EgenNæringListElement;
