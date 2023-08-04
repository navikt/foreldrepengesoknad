import { FunctionComponent } from 'react';
import { guid } from '@navikt/fp-common';
import { BostedUtland } from 'app/types/BostedUtland';
import BostedUtlandListElement from './BostedUtlandListElement';

interface Props {
    alleOpphold: BostedUtland[];
    oppgirIFortid: boolean;
    selectedOpphold: BostedUtland | undefined;
    leggerTilNyttOppholdIUtlandet: boolean;
    addOpphold: (opphold: BostedUtland) => void;
    editOpphold: (oppholdSomEditeres: BostedUtland, oppdatertOpphold: BostedUtland) => void;
    deleteOpphold: (oppholdSomSlettes: BostedUtland) => void;
    setSelectedOpphold: React.Dispatch<React.SetStateAction<BostedUtland | undefined>>;
    setLeggerTilNyttOppholdIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BostedUtlandList: FunctionComponent<Props> = ({
    alleOpphold,
    selectedOpphold,
    leggerTilNyttOppholdIUtlandet,
    oppgirIFortid,
    setSelectedOpphold,
    deleteOpphold,
    addOpphold,
    editOpphold,
    setLeggerTilNyttOppholdIUtlandet,
}) => {
    return (
        <>
            {alleOpphold.map((opphold) => (
                <BostedUtlandListElement
                    alleOpphold={alleOpphold}
                    isSelected={selectedOpphold === opphold}
                    leggerTilNyttOppholdIUtlandet={leggerTilNyttOppholdIUtlandet}
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
