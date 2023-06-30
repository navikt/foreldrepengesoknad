import PeriodeKort from 'app/components/periode-kort/PeriodeKort';

import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';

interface Props {
    sak: SvangerskapspengeSak;
}

export const SammendragSoknad: React.FC<Props> = ({ sak }) => {
    if ('åpenBehandling' in sak) {
        return (
            <>
                <h2>Din søknad</h2>
                {sak.åpenBehandling &&
                    sak.åpenBehandling.søknad &&
                    sak.åpenBehandling.søknad.arbeidsforhold.map((arbeidsforhold) => {
                        return (
                            <PeriodeKort
                                key={
                                    sak.åpenBehandling &&
                                    sak.åpenBehandling.søknad &&
                                    sak.åpenBehandling.søknad.arbeidsforhold.indexOf(arbeidsforhold)
                                }
                                arbeidsgiver={arbeidsforhold.aktivitet.arbeidsgiver.id}
                                fra={arbeidsforhold.tilrettelegginger[0].fom}
                                til={arbeidsforhold.tilrettelegginger[0].tom}
                                type={arbeidsforhold.tilrettelegginger[0].type}
                            />
                        );
                    })}
            </>
        );
    } else if ('gjeldendeVedtak' in sak) {
        return (
            <>
                <h2>Dine vedtak</h2>
                {sak.gjeldendeVedtak &&
                    sak.gjeldendeVedtak.arbeidsforhold.map((arbeidsforhold) => {
                        return (
                            <PeriodeKort
                                key={sak.gjeldendeVedtak && sak.gjeldendeVedtak.arbeidsforhold.indexOf(arbeidsforhold)}
                                arbeidsgiver={arbeidsforhold.aktivitet.arbeidsgiver.id}
                                fra={arbeidsforhold.tilrettelegginger[0].fom}
                                til={arbeidsforhold.tilrettelegginger[0].tom}
                                type={arbeidsforhold.tilrettelegginger[0].type}
                            />
                        );
                    })}
            </>
        );
    } else return <></>;

    console.log(sak);
};
