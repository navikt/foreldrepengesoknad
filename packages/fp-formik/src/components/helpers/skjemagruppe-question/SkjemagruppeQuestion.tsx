import { Fieldset, FieldsetProps } from '@navikt/ds-react';
import React, { forwardRef } from 'react';
import { TestProps } from '../../../types';

const SkjemagruppeQuestion = forwardRef(function SkjemagruppeQuestion(
    props: FieldsetProps & TestProps,
    ref: React.Ref<any>,
) {
    const { id, legend, ...rest } = props;
    return <Fieldset {...rest} id={id} legend={legend} ref={ref} tabIndex={id ? -1 : props.tabIndex} />;
});

export default SkjemagruppeQuestion;
