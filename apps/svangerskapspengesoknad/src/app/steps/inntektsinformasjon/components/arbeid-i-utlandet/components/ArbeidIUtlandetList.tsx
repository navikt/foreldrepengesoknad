import { FunctionComponent } from 'react';
import { InntektsinformasjonFormData } from '../../../inntektsinformasjonFormConfig';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { guid } from '@navikt/fp-common';
import { FormikErrors } from 'formik';
import ArbeidIUtlandetListElement from './ArbeidIUtlandetListElement';

interface Props {
    andreInntekterIUtlandet: ArbeidIUtlandet[];
    formValues: InntektsinformasjonFormData;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    leggerTilNyttArbeidIUtlandet: boolean;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    deleteAnnenInntekt: (inntektSomSlettes: ArbeidIUtlandet) => void;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArbeidIUtlandetList: FunctionComponent<Props> = ({
    andreInntekterIUtlandet,
    formValues,
    errors,
    selectedAnnenInntekt,
    leggerTilNyttArbeidIUtlandet,
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
                    isSelected={selectedAnnenInntekt === inntekt} //TODO - call a function to find out
                    inntekt={inntekt}
                    formValues={formValues}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    deleteAnnenInntekt={deleteAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    errors={errors}
                    setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                    leggerTilNyttArbeidIUtlandet={leggerTilNyttArbeidIUtlandet}
                />
            ))}
        </>
    );
};

export default ArbeidIUtlandetList;
