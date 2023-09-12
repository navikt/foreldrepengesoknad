import { FunctionComponent } from 'react';
import ArbeidIUtlandetVisning from './visning/ArbeidIUtlandetVisning';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { Block, guid } from '@navikt/fp-common';
import ArbeidIUtlandetSubform from './subform/ArbeidIUtlandetSubform';

interface Props {
    inntekt: ArbeidIUtlandet;
    isSelected: boolean;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    allArbeidIUtlandet: ArbeidIUtlandet[];
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    deleteAnnenInntekt: (inntektSomSlettes: ArbeidIUtlandet) => void;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
    setFeilmelding: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ArbeidIUtlandetListElement: FunctionComponent<Props> = ({
    isSelected,
    inntekt,
    selectedAnnenInntekt,
    allArbeidIUtlandet,
    setSelectedAnnenInntekt,
    deleteAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
    setLeggTilNyttArbeidIUtlandet,
    setFeilmelding,
}) => {
    return (
        <div key={guid()}>
            <Block padBottom="s">
                {!isSelected && (
                    <ArbeidIUtlandetVisning
                        arbeidIUtlandet={inntekt}
                        setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                        deleteAnnenInntekt={deleteAnnenInntekt}
                    />
                )}
                {isSelected && (
                    <ArbeidIUtlandetSubform
                        allArbeidIUtlandet={allArbeidIUtlandet}
                        selectedAnnenInntekt={selectedAnnenInntekt}
                        addAnnenInntekt={addAnnenInntekt}
                        editAnnenInntekt={editAnnenInntekt}
                        setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                        erFørsteInput={false}
                        setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                        setFeilmelding={setFeilmelding}
                    />
                )}
            </Block>
        </div>
    );
};

export default ArbeidIUtlandetListElement;
