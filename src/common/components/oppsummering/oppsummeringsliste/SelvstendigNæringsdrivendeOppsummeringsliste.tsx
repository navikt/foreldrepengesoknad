import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../app/util/dates/dates';
import Oppsummeringsliste from 'common/components/oppsummering/oppsummeringsliste/Oppsummeringsliste';
import { Næring } from '../../../../app/types/søknad/SelvstendigNæringsdrivendeInformasjon';

interface SelvstendigNæringsdrivendeOppsummeringslisteProps {
    næringer: Næring[];
}

type Props = SelvstendigNæringsdrivendeOppsummeringslisteProps & InjectedIntlProps;

class SelvstendigNæringsdrivendeOppsummeringsliste extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.createOppsummeringslisteData = this.createOppsummeringslisteData.bind(this);
        this.createOppsummeringslisteelementData = this.createOppsummeringslisteelementData.bind(this);
    }

    createOppsummeringslisteData() {
        const { næringer } = this.props;
        return næringer.map((næring) => this.createOppsummeringslisteelementData(næring));
    }

    createOppsummeringslisteelementData(næring: Næring) {
        const { intl } = this.props;
        const { navnPåNæringen, tidsperiode, pågående } = næring;
        return {
            venstrestiltTekst: navnPåNæringen,
            høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                fom: formatDate(tidsperiode.fom),
                tom: pågående ? 'pågående' : formatDate(tidsperiode.tom)
            }),
            content: <Næringsdetaljer næring={næring} />
        };
    }

    render() {
        return <Oppsummeringsliste data={this.createOppsummeringslisteData()} />;
    }
}

interface NæringsdetaljerProps {
    næring: Næring;
}

const Næringsdetaljer: React.StatelessComponent<NæringsdetaljerProps> = ({ næring }: NæringsdetaljerProps) => {
    const {
        nyIArbeidslivet,
        registrertILand,
        registrertINorge,
        oppstartsdato,
        stillingsprosent,
        organisasjonsnummer,
        næringsinntekt,
        endringAvNæringsinntektInformasjon,
        næringstyper,
        kanInnhenteOpplsyningerFraRevisor,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        revisor,
        harRegnskapsfører,
        regnskapsfører,
        harRevisor
    } = næring;

    return (
        <>
            <span>Næringstype(r): {næringstyper.join(', ')}</span>
            <span>Organisasjonsnummer: {organisasjonsnummer}</span>
            <span>Stillingsprosent: {stillingsprosent}</span>
            <span>Oppstartsdato: {formatDate(oppstartsdato)}</span>
            <span>Næringsinntekt: {næringsinntekt}</span>
            <span>Registrert i land: {registrertINorge ? 'Norge' : registrertILand}</span>
            {nyIArbeidslivet !== undefined && <span>Ny i arbeidslivet: {nyIArbeidslivet ? 'Ja' : 'Nei'}</span>}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår !== undefined && (
                <span>
                    Har hatt varig endring av næringsinntekt siste 4 kalenderår:{' '}
                    {hattVarigEndringAvNæringsinntektSiste4Kalenderår ? 'Ja' : 'Nei'}
                </span>
            )}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår === true && (
                <>
                    <span>
                        Dato for endring av næringsinntekt: {formatDate(endringAvNæringsinntektInformasjon!.dato)}
                    </span>
                    <span>
                        Næringsinntekt etter endring: {endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring}
                    </span>
                    <span>
                        Forklaring av endring av næringsinntekt: {endringAvNæringsinntektInformasjon!.forklaring}
                    </span>
                </>
            )}
            {harRegnskapsfører === true && (
                <>
                    <span>Regnskapsførers navn: {regnskapsfører.navn}</span>
                    <span>Regnskapsførers telefonnummer: {regnskapsfører.telefonnummer}</span>
                    <span>
                        Regnskapsfører er nær venn eller familie: {regnskapsfører.erNærVennEllerFamilie ? 'Ja' : 'Nei'}
                    </span>
                </>
            )}
            {harRegnskapsfører === false &&
                harRevisor === true && (
                    <>
                        <span>Revisors navn: {revisor.navn}</span>
                        <span>Revisors telefonnummer: {revisor.telefonnummer}</span>
                        <span>Revisor er nær venn eller familie: {revisor.erNærVennEllerFamilie ? 'Ja' : 'Nei'}</span>
                        <span>
                            Har gitt samtykke til NAV til å innhente opplysninger fra revisor:{' '}
                            {kanInnhenteOpplsyningerFraRevisor ? 'Ja' : 'Nei'}
                        </span>
                    </>
                )}
        </>
    );
};

export default injectIntl(SelvstendigNæringsdrivendeOppsummeringsliste);
