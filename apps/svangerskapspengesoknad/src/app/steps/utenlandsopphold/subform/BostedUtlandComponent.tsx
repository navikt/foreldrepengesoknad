import { BostedUtland } from 'app/types/BostedUtland';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { Block } from '@navikt/fp-common';
import { FormattedMessage } from 'react-intl';
import { Button } from '@navikt/ds-react';
import BostedUtlandInput from '../components/BostedUtlandInput';
import BostedUtlandList from '../components/BostedUtlandList';

interface Props {
    alleOpphold: BostedUtland[];
    oppgirIFortid: boolean;
    setUtenlandsopphold: Dispatch<SetStateAction<BostedUtland[]>>;
}
const BostedUtlandComponent: FunctionComponent<Props> = ({ oppgirIFortid, alleOpphold, setUtenlandsopphold }) => {
    const [leggerTilNyttOppholdIUtlandet, setLeggerTilNyttOppholdIUtlandet] = useState(false);
    const [selectedOpphold, setSelectedOpphold] = useState<BostedUtland | undefined>(undefined);

    const addOpphold = (opphold: BostedUtland) => {
        const updatedOpphold = alleOpphold.concat(opphold);
        setUtenlandsopphold(updatedOpphold);
        setSelectedOpphold(undefined);
        setLeggerTilNyttOppholdIUtlandet(false);
    };

    const deleteOpphold = (oppholdSomSlettes: BostedUtland) => {
        const updatedOpphold = alleOpphold.filter((opphold) => opphold !== oppholdSomSlettes);
        setUtenlandsopphold(updatedOpphold);
        setSelectedOpphold(undefined);
    };

    const editOpphold = (oppholdSomEditeres: BostedUtland, oppdatertOpphold: BostedUtland) => {
        const updatedOpphold = alleOpphold.filter((opphold) => opphold !== oppholdSomEditeres).concat(oppdatertOpphold);
        setSelectedOpphold(undefined);
        setUtenlandsopphold(updatedOpphold);
    };

    const handleOnLeggTilOppholdIUtlandet = () => {
        setLeggerTilNyttOppholdIUtlandet(true);
        setSelectedOpphold(undefined);
    };

    return (
        <div>
            {alleOpphold.length > 0 && (
                <BostedUtlandList
                    alleOpphold={alleOpphold}
                    selectedOpphold={selectedOpphold}
                    oppgirIFortid={oppgirIFortid}
                    leggerTilNyttOppholdIUtlandet={leggerTilNyttOppholdIUtlandet}
                    addOpphold={addOpphold}
                    editOpphold={editOpphold}
                    deleteOpphold={deleteOpphold}
                    setSelectedOpphold={setSelectedOpphold}
                    setLeggerTilNyttOppholdIUtlandet={setLeggerTilNyttOppholdIUtlandet}
                />
            )}
            {(leggerTilNyttOppholdIUtlandet || alleOpphold.length === 0) && (
                <BostedUtlandInput
                    alleOpphold={alleOpphold}
                    oppgirIFortid={oppgirIFortid}
                    selectedOpphold={selectedOpphold}
                    setSelectedOpphold={setSelectedOpphold}
                    addOpphold={addOpphold}
                    editOpphold={editOpphold}
                    currentOppholdId={selectedOpphold?.id}
                    setLeggerTilNyttOppholdIUtlandet={setLeggerTilNyttOppholdIUtlandet}
                />
            )}

            {alleOpphold.length > 0 && (
                <Block padBottom="xl">
                    <Button
                        aria-label="legg til nytt opphold i utlandet"
                        variant="secondary"
                        type="button"
                        onClick={handleOnLeggTilOppholdIUtlandet}
                    >
                        <FormattedMessage id="inntektsinformasjon.arbeidIUtlandet.leggTil" />
                    </Button>
                </Block>
            )}
        </div>
    );
};

export default BostedUtlandComponent;
