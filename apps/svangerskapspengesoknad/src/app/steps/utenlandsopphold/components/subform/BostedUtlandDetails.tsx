import { BostedUtland } from 'app/types/BostedUtland';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { Block, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { Alert, Button } from '@navikt/ds-react';
import BostedUtlandSubform from './BostedUtlandSubform';
import BostedUtlandList from '../BostedUtlandList';

interface Props {
    alleOpphold: BostedUtland[];
    oppgirIFortid: boolean;
    setUtenlandsopphold: Dispatch<SetStateAction<BostedUtland[]>>;
}
const BostedUtlandDetails: FunctionComponent<Props> = ({ oppgirIFortid, alleOpphold, setUtenlandsopphold }) => {
    const [leggerTilNyttOppholdIUtlandet, setLeggerTilNyttOppholdIUtlandet] = useState(false);
    const [selectedOpphold, setSelectedOpphold] = useState<BostedUtland | undefined>(undefined);
    const [erFørsteInput, setErFørsteInput] = useState(true);
    const intl = useIntl();

    const addOpphold = (opphold: BostedUtland) => {
        const updatedOpphold = alleOpphold.concat(opphold);
        setUtenlandsopphold(updatedOpphold);
        setSelectedOpphold(undefined);
        setLeggerTilNyttOppholdIUtlandet(false);
        setErFørsteInput(false);
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
    const visAlertOmNødvendigInput = !erFørsteInput && alleOpphold.length === 0;
    const alertTekstId = oppgirIFortid
        ? 'utenlandsopphold.duMåOppgiInformasjon.iFortid'
        : 'utenlandsopphold.duMåOppgiInformasjon.iFremtid';
    return (
        <div>
            {alleOpphold.length > 0 && (
                <BostedUtlandList
                    alleOpphold={alleOpphold}
                    selectedOpphold={selectedOpphold}
                    oppgirIFortid={oppgirIFortid}
                    addOpphold={addOpphold}
                    editOpphold={editOpphold}
                    deleteOpphold={deleteOpphold}
                    setSelectedOpphold={setSelectedOpphold}
                    setLeggerTilNyttOppholdIUtlandet={setLeggerTilNyttOppholdIUtlandet}
                />
            )}
            {visAlertOmNødvendigInput && (
                <Block padBottom="l">
                    <Alert variant="info" style={{ padding: '0.5rem' }}>
                        {intlUtils(intl, alertTekstId)}
                    </Alert>
                </Block>
            )}
            {(leggerTilNyttOppholdIUtlandet || alleOpphold.length === 0) && (
                <BostedUtlandSubform
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
                        <FormattedMessage id="inntektsinformasjon.arbeid.leggTil" />
                    </Button>
                </Block>
            )}
        </div>
    );
};

export default BostedUtlandDetails;
