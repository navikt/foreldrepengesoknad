import { Heading } from '@navikt/ds-react';
import { Locale } from '@navikt/fp-types';
import { FunctionComponent } from 'react';

interface Props {
    locale: Locale;
    onChangeLocale: (activeLocale: Locale) => void;
}

const Planlegger: FunctionComponent<Props> = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <Heading size="large">Velkommen til ny planlegger!</Heading>
        </div>
    );
};

export default Planlegger;
