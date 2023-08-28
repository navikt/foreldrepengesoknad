import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import { SkjemaFormData, initialSkjemaFormData } from './skjemaFormTypes';

//TODO
export const getInitialSkjemaValuesFromState = (state: SvangerskapspengerContextState): SkjemaFormData => {
    const vedlegg = state.søknad.vedlegg;
    return {
        ...initialSkjemaFormData,
        vedlegg: vedlegg,
    };
};

export const mapSkjemaToState = () => {
    console.log('TODO');
};
