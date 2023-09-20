import { Fieldset, FieldsetProps } from '@navikt/ds-react';
import React, { forwardRef } from 'react';

interface TestProps {
    'data-testid'?: string;
}

const SkjemagruppeQuestion = forwardRef(function SkjemagruppeQuestion(
    props: FieldsetProps & TestProps,
    ref: React.Ref<any>,
) {
    const { id, legend, ...rest } = props;
    const titleId = `${id}__title`;
    return <Fieldset {...rest} legend={<div id={titleId}>{legend}</div>} ref={ref} tabIndex={id ? -1 : undefined} />;
});

export default SkjemagruppeQuestion;
