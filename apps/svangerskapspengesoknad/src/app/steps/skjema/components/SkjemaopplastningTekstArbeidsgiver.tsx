import { Label } from '@navikt/ds-react';
import { intlUtils } from '@navikt/fp-common';
import links from 'app/links/links';
import { FormattedMessage, useIntl } from 'react-intl';

const SkjemaopplastningTekstArbeidsgiver: React.FunctionComponent = () => {
    const intl = useIntl();

    return (
        <div style={{ marginBottom: '1rem' }}>
            <div>
                <Label>{intlUtils(intl, 'skjema.vedlegg.label.arbeidsgiver')}</Label>
            </div>
            <FormattedMessage
                id={'skjema.vedlegg.description.arbeidsgiver'}
                values={{
                    a: (msg: any) => (
                        <a
                            className="lenke"
                            rel="noopener noreferrer"
                            href={links.arbeidstilsynetSkjema}
                            target="_blank"
                        >
                            {msg}
                        </a>
                    ),
                }}
            />
        </div>
    );
};

export default SkjemaopplastningTekstArbeidsgiver;
