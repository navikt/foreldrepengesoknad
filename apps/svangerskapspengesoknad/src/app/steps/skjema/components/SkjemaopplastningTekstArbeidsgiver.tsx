import { FormattedMessage } from 'react-intl';

import { BodyShort, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

const SkjemaopplastningTekstArbeidsgiver: React.FunctionComponent = () => {
    return (
        <VStack>
            <BodyShort style={{ fontWeight: 'bold' }}>
                <FormattedMessage id="skjema.vedlegg.label.arbeidsgiver" />
            </BodyShort>
            <div>
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
        </VStack>
    );
};

export default SkjemaopplastningTekstArbeidsgiver;
