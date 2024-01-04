import { BodyShort, HStack, Link } from '@navikt/ds-react';
import { bemUtils, guid, intlUtils } from '@navikt/fp-common';
import Tilrettelegging, { ArbeidsforholdForTilrettelegging, Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import './vedlegg-oppsummering.css';
import { FileIcon } from '@navikt/aksel-icons';

interface Props {
    tilrettelegging: Tilrettelegging[];
}

const getVedleggTittel = (arbeidsforhold: ArbeidsforholdForTilrettelegging, intl: IntlShape) => {
    switch (arbeidsforhold.type) {
        case Arbeidsforholdstype.FRILANSER:
            return intlUtils(intl, 'oppsummering.skjema.frilanser');
        case Arbeidsforholdstype.SELVSTENDIG:
            return intlUtils(intl, 'oppsummering.skjema.frilanser');
        default:
            return `${intlUtils(intl, 'oppsummering.skjema.virksomhet')} for ${arbeidsforhold.navn}`;
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
                    <div key={guid()}>
                        <HStack>
                            <Link className={bem.element('link')} href={v.url} target="_blank" icon>
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
