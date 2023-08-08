import { FunctionComponent } from 'react';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { guid } from '@navikt/fp-common';
import ArbeidIUtlandetListElement from './ArbeidIUtlandetListElement';

interface Props {
    andreInntekterIUtlandet: ArbeidIUtlandet[];
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    deleteAnnenInntekt: (inntektSomSlettes: ArbeidIUtlandet) => void;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArbeidIUtlandetList: FunctionComponent<Props> = ({
    andreInntekterIUtlandet,
    selectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
    deleteAnnenInntekt,
    setSelectedAnnenInntekt,
    setLeggTilNyttArbeidIUtlandet,
}) => {
    return (
        <>
            {andreInntekterIUtlandet.map((inntekt) => (
                <ArbeidIUtlandetListElement
                    key={guid()}
                    isSelected={selectedAnnenInntekt === inntekt}
                    inntekt={inntekt}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    deleteAnnenInntekt={deleteAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                />
            ))}
        </>
    );
};

export default ArbeidIUtlandetList;
