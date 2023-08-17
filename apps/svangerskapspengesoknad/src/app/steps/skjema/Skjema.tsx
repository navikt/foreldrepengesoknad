// import { Step, intlUtils } from '@navikt/fp-common';
// import stepConfig from '../stepsConfig';
// import { useIntl } from 'react-intl';
// import { TilretteleggingFormComponents } from './tilretteleggingFormConfig';
// import { getTilretteleggingInitialValues } from './tilretteleggingUtils';
// import useSøknad from 'app/utils/hooks/useSøknad';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
// import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';

interface Props {
    id: string;
    type: Arbeidsforholdstype;
    navn: string;
}

const Skjema: FunctionComponent<Props> = ({ id, type, navn }) => {
    // const intl = useIntl();
    // const { tilrettelegging } = useSøknad();
    // const onValidSubmitHandler = (values: Partial<TilretteleggingFormData>) => {
    //     console.log(values);
    //     const tilrettelegging = mapOmTilretteleggingFormDataToState(values);
    //     return [actionCreator.setTilrettelegging(tilrettelegging)];
    // };

    // const handleSubmit = console.log('Hei');
    const skjemaTittel = `Side for skjema ${id} ${type} ${navn}`;
    // const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.ARBEID);
    return <p>{skjemaTittel}</p>;
};

export default Skjema;
