import { Næring } from 'app/types/Næring';
import EgenNæringListElement from './EgenNæringListElement';
import { guid } from '@navikt/fp-common';
import { FunctionComponent } from 'react';

interface Props {
    selectedNæring: Næring | undefined;
    allNæring: Næring[];
    addNæring: (inntekt: Næring) => void;
    editNæring: (inntektSomEditeres: Næring, oppdatertInntekt: Næring) => void;
    deleteNæring: (inntektSomSlettes: Næring) => void;
    setSelectedNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    setLeggTilNyNæring: React.Dispatch<React.SetStateAction<boolean>>;
}

const EgenNæringList: FunctionComponent<Props> = ({
    selectedNæring,
    allNæring,
    addNæring,
    editNæring,
    deleteNæring,
    setSelectedNæring,
    setLeggTilNyNæring,
}) => {
    const sorterteNæring = allNæring.sort((a, b) => a.id - b.id);
    return (
        <>
            {sorterteNæring.map((næring) => (
                <EgenNæringListElement
                    key={guid()}
                    isSelected={selectedNæring === næring}
                    næring={næring}
                    allNæring={allNæring}
                    addNæring={addNæring}
                    editNæring={editNæring}
                    deleteNæring={deleteNæring}
                    setSelectedNæring={setSelectedNæring}
                    selectedNæring={selectedNæring}
                    setLeggTilNyttNæring={setLeggTilNyNæring}
                />
            ))}
        </>
    );
};

export default EgenNæringList;
