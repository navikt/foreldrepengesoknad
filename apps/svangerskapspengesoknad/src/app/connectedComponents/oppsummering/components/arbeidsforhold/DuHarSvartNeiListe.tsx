import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';

import './duHarSvartNeiListe.less';

const cls = BEMHelper('duHarSvartNeiListe');

interface Props {
    harJobbetSomSelvstendigNæringsdrivende?: boolean;
    harJobbetFrilans?: boolean;
    harHattAndreInntektskilder?: boolean;
    hattInntektSomFosterforelder?: boolean;
    nyoppstartetFrilanser?: boolean;
    hattOppdragForNærVennEllerFamilie?: boolean;
    arbeidsforholdOppsummering?: boolean;
    frilansOppsummering?: boolean;
    selvstendigOppsummering?: boolean;
    endringAvNæringsinntekt?: boolean;
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?: boolean;
    harRegnskapsfører?: boolean;
    harRevisor?: boolean;
    kanInnhenteOpplsyningerFraRevisor?: boolean;
}

const DuHarSvartNeiListe: FunctionComponent<Props> = ({
    harJobbetSomSelvstendigNæringsdrivende,
    harJobbetFrilans,
    harHattAndreInntektskilder,
    hattInntektSomFosterforelder,
    nyoppstartetFrilanser,
    hattOppdragForNærVennEllerFamilie,
    arbeidsforholdOppsummering,
    frilansOppsummering,
    selvstendigOppsummering,
    endringAvNæringsinntekt,
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
    harRegnskapsfører,
    harRevisor,
    kanInnhenteOpplsyningerFraRevisor,
}) => {
    return (
        <div>
            <div className={cls.element('overskrift')}>
                <FormattedMessage
                    id="oppsummering.arbeidsforhold.svar"
                    values={{
                        strong: (msg: any) => <strong>{msg}</strong>,
                    }}
                />
            </div>
            <ul className={cls.element('liste')}>
                {arbeidsforholdOppsummering && harJobbetSomSelvstendigNæringsdrivende === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig" />
                    </li>
                )}
                {arbeidsforholdOppsummering && harJobbetFrilans === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.frilans" />
                    </li>
                )}
                {arbeidsforholdOppsummering && harHattAndreInntektskilder === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.andreInntekter" />
                    </li>
                )}
                {frilansOppsummering && hattInntektSomFosterforelder === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.frilans.fosterforelder" />
                    </li>
                )}
                {frilansOppsummering && nyoppstartetFrilanser === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.frilans.nyoppstartet" />
                    </li>
                )}
                {frilansOppsummering && hattOppdragForNærVennEllerFamilie === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.frilans.oppdragNærVennFamilie" />
                    </li>
                )}
                {selvstendigOppsummering && endringAvNæringsinntekt === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.endringAvNæringsinntekt" />
                    </li>
                )}
                {selvstendigOppsummering && harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene" />
                    </li>
                )}
                {selvstendigOppsummering && harRegnskapsfører === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.harRegnskapsfører" />
                    </li>
                )}
                {selvstendigOppsummering && harRevisor === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.harRevisor" />
                    </li>
                )}
                {selvstendigOppsummering && kanInnhenteOpplsyningerFraRevisor === false && (
                    <li>
                        <FormattedMessage id="oppsummering.arbeidsforhold.svar.selvstendig.kanInnhenteOpplsyningerFraRevisor" />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default DuHarSvartNeiListe;
