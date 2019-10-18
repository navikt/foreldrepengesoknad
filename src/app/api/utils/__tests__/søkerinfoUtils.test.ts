import { getAktiveArbeidsforhold, getArbeidsforhold } from '../søkerinfoUtils';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { SøkerinfoDTOArbeidsforhold } from 'app/api/types/sokerinfoDTO';
import moment from 'moment';

const mockedArbeidsforhold: Arbeidsforhold = {
    fom: new Date(),
    arbeidsgiverIdType: 'orgnr',
    arbeidsgiverNavn: 'navn',
    arbeidsgiverId: '123412341',
    stillingsprosent: 80
};

const mockArbeidsforholdDTO: SøkerinfoDTOArbeidsforhold = {
    fom: moment(new Date()).format('YYYY-MM-DD'),
    arbeidsgiverIdType: 'orgnr',
    arbeidsgiverNavn: 'navn',
    arbeidsgiverId: '123412341',
    stillingsprosent: 80
};

describe('søkerinfoUtils', () => {
    describe('getAktiveArbeidsforhold', () => {
        it('Skal gi en tom liste tilbake hvis det er ingen arbeidsforhold', () => {
            expect(getAktiveArbeidsforhold([], new Date())).toEqual([]);
        });

        it('Skal finne aktivt arbeidsforhold', () => {
            expect(getAktiveArbeidsforhold([mockedArbeidsforhold], new Date())).toEqual([mockedArbeidsforhold]);
        });

        it('Skal fjerne inaktivt arbeidsforhold', () => {
            const inaktivtArbeidsforhold: Arbeidsforhold = {
                ...mockedArbeidsforhold,
                fom: new Date('2016-01-01'),
                tom: new Date('2019-01-01')
            };

            expect(getAktiveArbeidsforhold([inaktivtArbeidsforhold], new Date('2019-06-01'))).toEqual([]);
        });
    });

    describe('getArbeidsforhold', () => {
        it('Skal kun beholde ett arbeidsforhold per orgnr', () => {
            const arbeidsforhold = [mockArbeidsforholdDTO, mockArbeidsforholdDTO, mockArbeidsforholdDTO];

            expect(getArbeidsforhold(arbeidsforhold).length).toEqual(1);
        });

        it('Skal beholde pågående arbeidsforhold hvis flere arbeidsforhold med samme orgnr', () => {
            const arbeidsforholdDTOAvsluttet = {
                ...mockArbeidsforholdDTO,
                arbeidsgiverNavn: 'avsluttet',
                tom: moment(new Date()).format('YYYY-MM-DD')
            };

            const arbeidsforholdDTOPågående = {
                ...mockArbeidsforholdDTO,
                arbeidsgiverNavn: 'pågående'
            };
            const arbeidsforhold = [
                arbeidsforholdDTOAvsluttet,
                arbeidsforholdDTOAvsluttet,
                arbeidsforholdDTOAvsluttet,
                arbeidsforholdDTOPågående
            ];

            const result = getArbeidsforhold(arbeidsforhold);

            expect(result.length).toEqual(1);
            expect(result[0].arbeidsgiverNavn).toEqual('pågående');
        });

        it('Skal ikke gjøre noe om alle arbeidsforhold har unike orgnr', () => {
            const arbf1 = {
                ...mockArbeidsforholdDTO
            };
            const arbf2 = {
                ...mockArbeidsforholdDTO,
                arbeidsgiverId: '123'
            };
            const arbf3 = {
                ...mockArbeidsforholdDTO,
                arbeidsgiverId: '234'
            };

            const arbeidsforhold = [arbf1, arbf2, arbf3];

            expect(getArbeidsforhold(arbeidsforhold).length).toEqual(3);
        });
    });
});
