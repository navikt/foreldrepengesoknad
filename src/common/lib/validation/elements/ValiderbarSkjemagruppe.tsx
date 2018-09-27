import React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import ValiderbartSkjemaelement, {
    ValiderbartSkjemaelementProps
} from 'common/lib/validation/elements/ValiderbartSkjemaelement';

export type ValiderbarCustomProps = ValiderbartSkjemaelementProps;

const ValiderbarSkjemagruppe: React.StatelessComponent<any> = (props: any) => {
    return <ValiderbartSkjemaelement component={SkjemaGruppe} {...props} />;
};

export default ValiderbarSkjemagruppe;
