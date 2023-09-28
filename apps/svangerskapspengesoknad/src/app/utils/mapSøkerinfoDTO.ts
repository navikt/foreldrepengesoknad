import { erMyndig, erKvinne, guid } from '@navikt/fp-common';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Søkerinfo } from 'app/types/Søkerinfo';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Person from 'app/types/Person';
import { SøkerinfoDTO, SøkerinfoDTOArbeidsforhold, SøkerinfoDTOSøker } from 'app/types/SøkerinfoDTO';

dayjs.extend(utc);
dayjs.extend(timezone);

const mapArbeidsforholdDTOToArbeidsforhold = (
    arbeidsforhold: SøkerinfoDTOArbeidsforhold[] | undefined
): Arbeidsforhold[] => {
    if (!arbeidsforhold) {
        return [];
    }

    return arbeidsforhold.map((arbforhold) => {
        return {
            id: guid(),
            arbeidsgiverId: arbforhold.arbeidsgiverId,
            arbeidsgiverIdType: arbforhold.arbeidsgiverIdType,
            arbeidsgiverNavn: arbforhold.arbeidsgiverNavn,
            fom: dayjs.utc(arbforhold.fom).toDate(),
            stillingsprosent: arbforhold.stillingsprosent,
            tom: arbforhold.tom ? dayjs.utc(arbforhold.tom).toDate() : undefined,
        };
    });
};

const mapSøkerinfoDTOSøkerToPerson = (personDTO: SøkerinfoDTOSøker): Person => {
    return {
        erKvinne: erKvinne(personDTO.kjønn),
        erMyndig: erMyndig(personDTO.fødselsdato),
        etternavn: personDTO.etternavn,
        fornavn: personDTO.fornavn,
        fnr: personDTO.fnr,
        fødselsdato: dayjs.utc(personDTO.fødselsdato).toDate(),
        kjønn: personDTO.kjønn,
    };
};

const mapSøkerinfoDTOToSøkerinfo = (søkerinfoDTO: SøkerinfoDTO): Søkerinfo => {
    const arbeidsforhold = mapArbeidsforholdDTOToArbeidsforhold(søkerinfoDTO.arbeidsforhold);
    const person = mapSøkerinfoDTOSøkerToPerson(søkerinfoDTO.søker);

    return {
        arbeidsforhold,
        person,
    };
};

export default mapSøkerinfoDTOToSøkerinfo;
