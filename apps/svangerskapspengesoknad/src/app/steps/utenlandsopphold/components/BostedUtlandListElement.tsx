import { FunctionComponent } from 'react';
import { Block, guid } from '@navikt/fp-common';
import BostedUtlandInput from './BostedUtlandInput';
import BostedUtlandVisning from './BostedUtlandVisning';
import { BostedUtland } from 'app/types/BostedUtland';

interface Props {
    opphold: BostedUtland;
    alleOpphold: BostedUtland[];
    oppgirIFortid: boolean;
    isSelected: boolean;
    selectedOpphold: BostedUtland | undefined;
    leggerTilNyttOppholdIUtlandet: boolean;
    addOpphold: (opphold: BostedUtland) => void;
    editOpphold: (oppholdSomEditeres: BostedUtland, oppdatertOpphold: BostedUtland) => void;
    deleteOpphold: (oppholdSomSlettes: BostedUtland) => void;
    setSelectedOpphold: React.Dispatch<React.SetStateAction<BostedUtland | undefined>>;
    setLeggerTilNyttOppholdIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BostedUtlandListElement: FunctionComponent<Props> = ({
    isSelected,
    opphold,
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
        <div key={guid()}>
            <Block padBottom="s">
                {!isSelected && (
                    <BostedUtlandVisning
                        oppholdIUtlandet={opphold}
                        setSelectedOpphold={setSelectedOpphold}
                        deleteOpphold={deleteOpphold}
                        leggerTilNyttOppholdIUtlandet={leggerTilNyttOppholdIUtlandet}
                        annetOppholdBlirRedigert={!!selectedOpphold}
                    />
                )}
                {isSelected && (
                    <BostedUtlandInput
                        currentOppholdId={opphold.id}
                        oppgirIFortid={oppgirIFortid}
                        alleOpphold={alleOpphold}
                        selectedOpphold={selectedOpphold}
                        setSelectedOpphold={setSelectedOpphold}
                        setLeggerTilNyttOppholdIUtlandet={setLeggerTilNyttOppholdIUtlandet}
                        addOpphold={addOpphold}
                        editOpphold={editOpphold}
                    />
                )}
            </Block>
        </div>
    );
};

export default BostedUtlandListElement;
