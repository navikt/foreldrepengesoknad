import { FunctionComponent } from 'react';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { guid } from '@navikt/fp-common';
import ArbeidIUtlandetListElement from './ArbeidIUtlandetListElement';

interface Props {
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    allArbeidIUtlandet: ArbeidIUtlandet[];
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    deleteAnnenInntekt: (inntektSomSlettes: ArbeidIUtlandet) => void;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
    setFeilmelding: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ArbeidIUtlandetList: FunctionComponent<Props> = ({
    selectedAnnenInntekt,
    allArbeidIUtlandet,
    addAnnenInntekt,
    editAnnenInntekt,
    deleteAnnenInntekt,
    setSelectedAnnenInntekt,
    setLeggTilNyttArbeidIUtlandet,
    setFeilmelding,
}) => {
    const sorterteArbeidIUtlandet = allArbeidIUtlandet.sort((a, b) => a.id - b.id);
    return (
        <>
            {sorterteArbeidIUtlandet.map((inntekt) => (
                <ArbeidIUtlandetListElement
                    key={guid()}
                    isSelected={selectedAnnenInntekt === inntekt}
                    inntekt={inntekt}
                    allArbeidIUtlandet={allArbeidIUtlandet}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    deleteAnnenInntekt={deleteAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                    setFeilmelding={setFeilmelding}
                />
            ))}
        </>
    );
};

export default ArbeidIUtlandetList;
