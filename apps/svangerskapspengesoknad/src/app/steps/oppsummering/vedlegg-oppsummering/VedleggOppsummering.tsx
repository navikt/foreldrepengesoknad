import { FileIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, Link } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import Tilrettelegging, { ArbeidsforholdForTilrettelegging, Arbeidsforholdstype } from 'app/types/Tilrettelegging';

import './vedlegg-oppsummering.css';

interface Props {
    tilrettelegging: Tilrettelegging[];
}

const getVedleggTittel = (arbeidsforhold: ArbeidsforholdForTilrettelegging, intl: IntlShape) => {
    switch (arbeidsforhold.type) {
        case Arbeidsforholdstype.FRILANSER:
            return intl.formatMessage({ id: 'oppsummering.skjema.frilanser' });
        case Arbeidsforholdstype.SELVSTENDIG:
            return intl.formatMessage({ id: 'oppsummering.skjema.selvstendig' });
        default:
            return `${intl.formatMessage({ id: 'oppsummering.skjema.virksomhet' })} for ${arbeidsforhold.navn}`;
    }
};

const VedleggOppsummering: FunctionComponent<Props> = ({ tilrettelegging }) => {
    const intl = useIntl();
    const bem = bemUtils('vedlegg-oppsummering');
    return tilrettelegging.map((t) => {
        const tittel = getVedleggTittel(t.arbeidsforhold, intl);
        return (
            <div className={bem.element('tilrettelegging')} key={t.id}>
                <BodyShort className={bem.element('tittel')}>{tittel}</BodyShort>
                {t.vedlegg.map((v) => (
                    <div key={v.id}>
                        <HStack>
                            <Link className={bem.element('link')} href={v.url} target="_blank">
                                <FileIcon className={bem.element('icon')} title="Opplastet fil" />
                                <BodyShort> {v.filename}</BodyShort>
                            </Link>
                        </HStack>
                    </div>
                ))}
            </div>
        );
    });
};

export default VedleggOppsummering;
