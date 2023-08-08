import { Button, Heading } from '@navikt/ds-react';
import { InntektsinformasjonFormData } from '../../inntektsinformasjonFormConfig';
import ArbeidIUtlandetSubform from './subform/ArbeidIUtlandetSubform';
import { Block, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FunctionComponent, useState } from 'react';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import ArbeidIUtlandetList from './ArbeidIUtlandetList';

interface Props {
    allArbeidIUtlandet: ArbeidIUtlandet[];
    formValues: InntektsinformasjonFormData;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    setArbeidIUtlandet: React.Dispatch<React.SetStateAction<ArbeidIUtlandet[]>>;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
}
const ArbeidIUtlandetDetaljer: FunctionComponent<Props> = ({
    allArbeidIUtlandet,
    formValues,
    selectedAnnenInntekt,
    setArbeidIUtlandet,
    setSelectedAnnenInntekt,
}) => {
    const intl = useIntl();
    const [leggerTilNyttArbeidIUtlandet, setLeggerTilNyttArbeidIUtlandet] = useState(false);

    const addAnnenInntekt = (annenInntekt: ArbeidIUtlandet) => {
        const updatedandreInntekterInformasjon = allArbeidIUtlandet.concat(annenInntekt);
        setArbeidIUtlandet(updatedandreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);
        setLeggerTilNyttArbeidIUtlandet(false);
    };

    const deleteAnnenInntekt = (inntektSomSlettes: ArbeidIUtlandet) => {
        const updatedAndreInntekterInformasjon = allArbeidIUtlandet.filter((inntekt) => inntekt !== inntektSomSlettes);
        setArbeidIUtlandet(updatedAndreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);
    };

    const editAnnenInntekt = (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => {
        const updatedAndreInntekterInformasjon = allArbeidIUtlandet
            .filter((inntekt) => inntekt !== inntektSomEditeres)
            .concat(oppdatertInntekt);
        setSelectedAnnenInntekt(undefined);
        setArbeidIUtlandet(updatedAndreInntekterInformasjon);
    };

    const handleOnLeggTilArbeidIUtlandet = () => {
        setLeggerTilNyttArbeidIUtlandet(true);
        setSelectedAnnenInntekt(undefined);
    };

    return (
        <Block padBottom="xl">
            <Heading level="3" size="small">
                {intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.tittel')}
            </Heading>

            {allArbeidIUtlandet.length > 0 && (
                <ArbeidIUtlandetList
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    allArbeidIUtlandet={allArbeidIUtlandet}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    deleteAnnenInntekt={deleteAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    setLeggTilNyttArbeidIUtlandet={setLeggerTilNyttArbeidIUtlandet}
                />
            )}
            {(leggerTilNyttArbeidIUtlandet ||
                (formValues.hattArbeidIUtlandet === YesOrNo.YES && allArbeidIUtlandet.length === 0)) && (
                <ArbeidIUtlandetSubform
                    allArbeidIUtlandet={allArbeidIUtlandet}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    erFørsteInput={allArbeidIUtlandet.length === 0}
                    setLeggTilNyttArbeidIUtlandet={setLeggerTilNyttArbeidIUtlandet}
                />
            )}
            {formValues.hattArbeidIUtlandet === YesOrNo.YES && allArbeidIUtlandet.length > 0 && (
                <Block padBottom="xl">
                    <Button
                        aria-label="legg til ny informasjon om arbeid i utlandet"
                        variant="secondary"
                        type="button"
                        onClick={handleOnLeggTilArbeidIUtlandet}
                    >
                        <FormattedMessage id="inntektsinformasjon.arbeidIUtlandet.leggTil" />
                    </Button>
                </Block>
            )}
        </Block>
    );
};

export default ArbeidIUtlandetDetaljer;
