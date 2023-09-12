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
    selectedOpphold: BostedUtland | undefined;
    leggerTilNyttOppholdIUtlandet: boolean;
    setLeggerTilNyttOppholdIUtlandet: Dispatch<SetStateAction<boolean>>;
    setUtenlandsopphold: Dispatch<SetStateAction<BostedUtland[]>>;
    setSelectedOpphold: Dispatch<SetStateAction<BostedUtland | undefined>>;
    setSubmitIsClicked: Dispatch<SetStateAction<boolean>>;
}
const BostedUtlandDetails: FunctionComponent<Props> = ({
    oppgirIFortid,
    alleOpphold,
    selectedOpphold,
    leggerTilNyttOppholdIUtlandet,
    setUtenlandsopphold,
    setSelectedOpphold,
    setSubmitIsClicked,
    setLeggerTilNyttOppholdIUtlandet,
}) => {
    const [erFørsteInput, setErFørsteInput] = useState(true);
    const intl = useIntl();

    const addOpphold = (opphold: BostedUtland) => {
        const updatedOpphold = alleOpphold.concat(opphold);
        setUtenlandsopphold(updatedOpphold);
        setSelectedOpphold(undefined);
        setLeggerTilNyttOppholdIUtlandet(false);
        setErFørsteInput(false);
        setSubmitIsClicked(false);
    };

    const deleteOpphold = (oppholdSomSlettes: BostedUtland) => {
        const updatedOpphold = alleOpphold.filter((opphold) => opphold !== oppholdSomSlettes);
        setUtenlandsopphold(updatedOpphold);
        setSelectedOpphold(undefined);
        setSubmitIsClicked(false);
    };

    const editOpphold = (oppholdSomEditeres: BostedUtland, oppdatertOpphold: BostedUtland) => {
        const updatedOpphold = alleOpphold.filter((opphold) => opphold !== oppholdSomEditeres).concat(oppdatertOpphold);
        setSelectedOpphold(undefined);
        setUtenlandsopphold(updatedOpphold);
        setSubmitIsClicked(false);
    };

    const handleOnLeggTilOppholdIUtlandet = () => {
        setSubmitIsClicked(false);
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
                        disabled={selectedOpphold !== undefined || leggerTilNyttOppholdIUtlandet}
                        aria-label="legg til nytt opphold i utlandet"
                        variant="secondary"
                        type="button"
                        onClick={handleOnLeggTilOppholdIUtlandet}
                    >
                        <FormattedMessage id="utenlandsopphold.leggTil" />
                    </Button>
                </Block>
            )}
        </div>
    );
};

export default BostedUtlandDetails;
