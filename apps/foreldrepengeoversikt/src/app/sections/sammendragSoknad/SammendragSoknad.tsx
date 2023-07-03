import PeriodeKort from 'app/components/periode-kort/PeriodeKort';

import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import { formaterDato } from 'app/utils/dateUtils';

interface Props {
    sak: SvangerskapspengeSak;
}

export const SammendragSoknad: React.FC<Props> = ({ sak }) => {
    const datoFormat = 'DD. MMMM YYYY';
    let melding;
    console.log(sak);
    if ('åpenBehandling' in sak) {
        return (
            <>
                <h2>Din søknad</h2>
                {sak.åpenBehandling &&
                    sak.åpenBehandling.søknad &&
                    sak.åpenBehandling.søknad.arbeidsforhold.map((arbeidsforhold) => {
                        return (
                            (melding = (
                                <p>
                                    <b>
                                        {formaterDato(arbeidsforhold.tilrettelegginger[0].fom, datoFormat)} -{' '}
                                        {formaterDato(arbeidsforhold.tilrettelegginger[0].tom, datoFormat)}
                                    </b>{' '}
                                    jobber du hos {arbeidsforhold.aktivitet.arbeidsgiver.id} og har søkt om{' '}
                                    {arbeidsforhold.tilrettelegginger[0].type} svangerskapspenger
                                </p>
                            )),
                            (
                                <PeriodeKort
                                    key={
                                        sak.åpenBehandling &&
                                        sak.åpenBehandling.søknad &&
                                        sak.åpenBehandling.søknad.arbeidsforhold.indexOf(arbeidsforhold)
                                    }
                                >
                                    {melding}
                                </PeriodeKort>
                            )
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
                            (melding = (
                                <p>
                                    <b>
                                        {formaterDato(arbeidsforhold.tilrettelegginger[0].fom, datoFormat)}{' '}
                                        {formaterDato(arbeidsforhold.tilrettelegginger[0].tom, datoFormat)}
                                    </b>{' '}
                                    jobber du hos {arbeidsforhold.aktivitet.arbeidsgiver.id} og mottar{' '}
                                    {arbeidsforhold.tilrettelegginger[0].type} svangerskapspenger
                                </p>
                            )),
                            (
                                <PeriodeKort
                                    key={
                                        sak.åpenBehandling &&
                                        sak.åpenBehandling.søknad &&
                                        sak.åpenBehandling.søknad.arbeidsforhold.indexOf(arbeidsforhold)
                                    }
                                >
                                    {melding}
                                </PeriodeKort>
                            )
                        );
                    })}
            </>
        );
    } else return <></>;
};
