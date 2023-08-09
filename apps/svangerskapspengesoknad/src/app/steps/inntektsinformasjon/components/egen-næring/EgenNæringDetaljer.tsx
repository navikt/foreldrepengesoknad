import { InntektsinformasjonFormData } from '../../inntektsinformasjonFormConfig';
import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FunctionComponent, useState } from 'react';
import { Næring } from 'app/types/Næring';
import EgenNæringSubform from './subform/EgenNæringSubform';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Heading } from '@navikt/ds-react';
import EgenNæringList from './validation/EgenNæringList';
interface Props {
    selectedNæring: Næring | undefined;
    allNæring: Næring[];
    formValues: InntektsinformasjonFormData;
    setAllNæring: React.Dispatch<React.SetStateAction<Næring[]>>;
    setSelectedNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
}
const EgenNæringDetaljer: FunctionComponent<Props> = ({
    selectedNæring,
    allNæring,
    formValues,
    setAllNæring,
    setSelectedNæring,
}) => {
    const intl = useIntl();
    const [leggTilNyNæring, setLeggTilNyNæring] = useState(false);

    const addNæring = (nyNæring: Næring) => {
        const updatedNæringsinfo = allNæring.concat(nyNæring);
        setAllNæring(updatedNæringsinfo);
        setSelectedNæring(undefined);
        setLeggTilNyNæring(false);
    };

    const deleteNæring = (næringSomSlettes: Næring) => {
        const updatedNæringInformasjon = allNæring.filter((n) => n !== næringSomSlettes);
        setAllNæring(updatedNæringInformasjon);
        setSelectedNæring(undefined);
    };

    const editNæring = (næringSomEditeres: Næring, oppdatertNæring: Næring) => {
        const updatedNæringInformasjon = allNæring.filter((n) => n !== næringSomEditeres).concat(oppdatertNæring);
        setSelectedNæring(undefined);
        setAllNæring(updatedNæringInformasjon);
    };

    const handleOnLeggTilNæring = () => {
        setLeggTilNyNæring(true);
        setSelectedNæring(undefined);
    };

    if (formValues.hattInntektSomNæringsdrivende !== YesOrNo.YES) {
        return null;
    }

    return (
        <>
            <Block padBottom="l">
                <Heading level="3" size="small">
                    {intlUtils(intl, 'inntektsinformasjon.egenNæring.tittel')}
                </Heading>
            </Block>
            {allNæring.length > 0 && (
                <EgenNæringList
                    selectedNæring={selectedNæring}
                    allNæring={allNæring}
                    addNæring={addNæring}
                    editNæring={editNæring}
                    deleteNæring={deleteNæring}
                    setSelectedNæring={setSelectedNæring}
                    setLeggTilNyNæring={setLeggTilNyNæring}
                />
            )}
            {(leggTilNyNæring || allNæring.length === 0) && (
                <EgenNæringSubform
                    allNæring={allNæring}
                    selectedNæring={selectedNæring}
                    addNæring={addNæring}
                    editNæring={editNæring}
                    setSelectedNæring={setSelectedNæring}
                    erFørsteInput={allNæring.length === 0}
                    setLeggTilNyNæring={setLeggTilNyNæring}
                />
            )}
            {allNæring.length > 0 && (
                <Block padBottom="xl">
                    <Button
                        aria-label="legg til ny informasjon om arbeid i utlandet"
                        variant="secondary"
                        type="button"
                        onClick={handleOnLeggTilNæring}
                    >
                        <FormattedMessage id="inntektsinformasjon.arbeid.leggTil" />
                    </Button>
                </Block>
            )}
        </>
    );
};

export default EgenNæringDetaljer;
