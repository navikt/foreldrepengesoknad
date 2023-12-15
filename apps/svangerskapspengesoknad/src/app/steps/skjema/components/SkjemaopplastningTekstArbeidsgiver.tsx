import { Label } from '@navikt/ds-react';
import { Block, intlUtils } from '@navikt/fp-common';
import links from 'app/links/links';
import { FormattedMessage, useIntl } from 'react-intl';

const SkjemaopplastningTekstArbeidsgiver: React.FunctionComponent = () => {
    const intl = useIntl();

    return (
        <Block padBottom="xl">
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
        </Block>
    );
};

export default SkjemaopplastningTekstArbeidsgiver;
