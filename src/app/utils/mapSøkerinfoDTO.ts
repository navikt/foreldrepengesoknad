import { erMyndig } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Person from 'app/types/Person';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { SøkerinfoDTO, SøkerinfoDTOArbeidsforhold, SøkerinfoDTOSøker } from 'app/types/SøkerinfoDTO';
import dayjs from 'dayjs';

const mapArbeidsforholdDTOToArbeidsforhold = (
    arbeidsforhold: SøkerinfoDTOArbeidsforhold[] | undefined
): Arbeidsforhold[] => {
    if (!arbeidsforhold) {
        return [];
    }

    return arbeidsforhold.map((arbforhold) => {
        return {
            arbeidsgiverId: arbforhold.arbeidsgiverId,
            arbeidsgiverIdType: arbforhold.arbeidsgiverIdType,
            arbeidsgiverNavn: arbforhold.arbeidsgiverNavn,
            fom: dayjs(arbforhold.fom).toDate(),
            stillingsprosent: arbforhold.stillingsprosent,
            tom: arbforhold.tom ? dayjs(arbforhold.tom).toDate() : undefined,
        };
    });
};

const mapSøkerinfoDTOSøkerToPerson = (personDTO: SøkerinfoDTOSøker): Person => {
    return {
        erMyndig: erMyndig(personDTO.fødselsdato),
        etternavn: personDTO.etternavn,
        fornavn: personDTO.fornavn,
        fnr: personDTO.fnr,
        fødselsdato: dayjs(personDTO.fødselsdato).toDate(),
        ikkeNordiskEøsLand: personDTO.ikkeNordiskEøsLand,
        kjønn: personDTO.kjønn,
        bankkonto: personDTO.bankkonto,
    };
};

const mapSøkerinfoDTOToSøkerinfo = (søkerinfoDTO: SøkerinfoDTO): Søkerinfo => {
    const arbeidsforhold = mapArbeidsforholdDTOToArbeidsforhold(søkerinfoDTO.arbeidsforhold);
    const person = mapSøkerinfoDTOSøkerToPerson(søkerinfoDTO.søker);

    return {
        arbeidsforhold,
        person,
        registrerteBarn: [],
    };
};

export default mapSøkerinfoDTOToSøkerinfo;
