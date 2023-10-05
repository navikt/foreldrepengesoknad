import { FunctionComponent } from 'react';
import { Arbeidsforholdstype, TilretteleggingDTO, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import useSøknad from 'app/utils/hooks/useSøknad';
import { IntlShape, useIntl } from 'react-intl';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Søknad } from 'app/types/Søknad';
import { BodyShort, Label } from '@navikt/ds-react';

import './periodeVisning.css';

interface Props {
    periode: TilretteleggingDTO;
}

const getArbeidsgiverNavnForVirksomhet = (alleArbeidsforhold: Arbeidsforhold[], id: string) => {
    const arbeidsgiver = alleArbeidsforhold.find((arbeid) => arbeid.id && arbeid.id === id);
    return arbeidsgiver?.arbeidsgiverNavn;
};

const getArbeidsgiverNavn = (
    periode: TilretteleggingDTO,
    søkerinfo: Søkerinfo,
    søknad: Søknad,
    intl: IntlShape,
): string => {
    let navnArbeid: string | undefined = '';
    if (
        periode.arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET ||
        periode.arbeidsforhold.type === Arbeidsforholdstype.PRIVAT
    ) {
        navnArbeid = getArbeidsgiverNavnForVirksomhet(søkerinfo.arbeidsforhold, periode.arbeidsforhold.id);
    } else if (periode.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG) {
        navnArbeid = søknad.søker.selvstendigNæringsdrivendeInformasjon?.navnPåNæringen;
    } else {
        navnArbeid = intlUtils(intl, 'inntektsinformasjon.frilansArbeid.tittel');
    }
    return navnArbeid || 'Arbeidsgiver';
};

const PeriodeVisning: FunctionComponent<Props> = ({ periode }) => {
    const intl = useIntl();
    const søknad = useSøknad();
    const søkerinfo = useSøkerinfo();
    const fom = periode.type === Tilretteleggingstype.INGEN ? periode.slutteArbeidFom : periode.tilrettelagtArbeidFom;
    const arbeidsgiverNavn = getArbeidsgiverNavn(periode, søkerinfo, søknad, intl);
    const bem = bemUtils('periodeVisningInfoBox');

    return (
        <ul className={bem.element('periodeVisningList')}>
            <li>
                <div className={bem.block}>
                    <div className={bem.element('topRow')}>
                        <Label>{intlUtils(intl, 'oppsummering.periode.fra', { dato: formatDate(fom) })}</Label>
                        <BodyShort>
                            {periode.type === Tilretteleggingstype.DELVIS && periode.stillingsprosent && (
                                <BodyShort>{arbeidsgiverNavn}</BodyShort>
                            )}
                        </BodyShort>
                    </div>
                    <Block padBottom="m">
                        {periode.type === Tilretteleggingstype.DELVIS && periode.stillingsprosent && (
                            <BodyShort className={bem.element('stillingsprosent')}>
                                {intlUtils(intl, 'oppsummering.periode.stillingsprosent', {
                                    stillingsprosent: periode.stillingsprosent,
                                })}
                            </BodyShort>
                        )}
                    </Block>
                </div>
            </li>
        </ul>
    );
};

export default PeriodeVisning;
