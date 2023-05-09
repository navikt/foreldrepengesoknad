import { IntlShape, useIntl } from 'react-intl';
import { ValidatorFailTextIntl } from 'common/lib/validation/types';

export interface Props {
    feil?: any;
}

const renderFeil = (feil: any, intl: IntlShape): JSX.Element => {
    let msg;
    if (typeof feil.feilmelding === 'string') {
        msg = feil.feilmelding;
    } else {
        const failTextIntl = feil.feilmelding as ValidatorFailTextIntl;
        msg = intl.formatMessage({ id: failTextIntl.intlKey }, failTextIntl.values);
    }
    return <div className="skjemaelement__feilmelding">{msg}</div>;
};

const SkjemaelementFeilmelding: React.FunctionComponent<Props> = ({ feil }) => {
    const intl = useIntl();
    return (
        <div role="alert" aria-live="assertive">
            {feil && renderFeil(feil, intl)}
        </div>
    );
};
export default SkjemaelementFeilmelding;
