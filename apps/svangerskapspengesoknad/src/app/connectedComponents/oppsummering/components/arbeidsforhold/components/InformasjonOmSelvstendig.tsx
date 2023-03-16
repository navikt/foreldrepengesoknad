import React, { FunctionComponent } from 'react';
import Block from 'common/components/block/Block';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import EndringSelvstendig from './selvstendig/EndringSelvstendig';
import RevisorSelvstendig from './selvstendig/RevisorSelvstendig';
import RegnskapsførerSelvstendig from './selvstendig/RegnskapsførerSelvstendig';
import DetaljerSelvstendig from './selvstendig/DetaljerSelvstendig';
import DuHarSvartNeiListe from '../DuHarSvartNeiListe';

interface Props {
    selvstendigInformasjon: Næring;
}

const InformasjonOmSelvstendig: FunctionComponent<Props> = ({ selvstendigInformasjon }) => {
    return (
        <Block margin="xxs">
            <div className="grayInfoBox">
                <DetaljerSelvstendig
                    navnPåNæringen={selvstendigInformasjon.navnPåNæringen}
                    orgnr={selvstendigInformasjon.organisasjonsnummer}
                    oppstartsdato={selvstendigInformasjon.oppstartsdato!}
                    pågående={selvstendigInformasjon.pågående}
                    tidsperiode={selvstendigInformasjon.tidsperiode}
                    typer={selvstendigInformasjon.næringstyper}
                />

                {selvstendigInformasjon.endringAvNæringsinntektInformasjon && (
                    <EndringSelvstendig
                        endringAvNæringsinntektInformasjon={selvstendigInformasjon.endringAvNæringsinntektInformasjon}
                    />
                )}

                {selvstendigInformasjon.harRevisor && <RevisorSelvstendig revisor={selvstendigInformasjon.revisor!} />}

                {selvstendigInformasjon.harRegnskapsfører && (
                    <RegnskapsførerSelvstendig regnskapsfører={selvstendigInformasjon.regnskapsfører!} />
                )}

                <DuHarSvartNeiListe
                    selvstendigOppsummering={true}
                    endringAvNæringsinntekt={selvstendigInformasjon.hattVarigEndringAvNæringsinntektSiste4Kalenderår}
                    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene={
                        selvstendigInformasjon.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                    }
                    harRegnskapsfører={selvstendigInformasjon.harRegnskapsfører}
                    harRevisor={selvstendigInformasjon.harRevisor}
                    kanInnhenteOpplsyningerFraRevisor={selvstendigInformasjon.kanInnhenteOpplsyningerFraRevisor}
                />
            </div>
        </Block>
    );
};

export default InformasjonOmSelvstendig;
