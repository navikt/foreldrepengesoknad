import { FunctionComponent } from 'react';
import { guid } from '@navikt/fp-common';
import { BostedUtland } from 'app/types/BostedUtland';
import BostedUtlandListElement from './BostedUtlandListElement';

interface Props {
    alleOpphold: BostedUtland[];
    oppgirIFortid: boolean;
    selectedOpphold: BostedUtland | undefined;
    addOpphold: (opphold: BostedUtland) => void;
    editOpphold: (oppholdSomEditeres: BostedUtland, oppdatertOpphold: BostedUtland) => void;
    deleteOpphold: (oppholdSomSlettes: BostedUtland) => void;
    setSelectedOpphold: React.Dispatch<React.SetStateAction<BostedUtland | undefined>>;
    setLeggerTilNyttOppholdIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BostedUtlandList: FunctionComponent<Props> = ({
    alleOpphold,
    selectedOpphold,
    oppgirIFortid,
    setSelectedOpphold,
    deleteOpphold,
    addOpphold,
    editOpphold,
    setLeggerTilNyttOppholdIUtlandet,
}) => {
    const sorterteOpphold = alleOpphold.sort((a, b) => a.id - b.id);

    return (
        <>
            {sorterteOpphold.map((opphold) => (
                <BostedUtlandListElement
                    alleOpphold={alleOpphold}
                    isSelected={selectedOpphold === opphold}
                    oppgirIFortid={oppgirIFortid}
                    opphold={opphold}
                    selectedOpphold={selectedOpphold}
                    setSelectedOpphold={setSelectedOpphold}
                    addOpphold={addOpphold}
                    editOpphold={editOpphold}
                    deleteOpphold={deleteOpphold}
                    setLeggerTilNyttOppholdIUtlandet={setLeggerTilNyttOppholdIUtlandet}
                    key={guid()}
                />
            ))}
        </>
    );
};

export default BostedUtlandList;
