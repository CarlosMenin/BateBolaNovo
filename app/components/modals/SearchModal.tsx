'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { Range } from "react-date-range";
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';
import { useForm, FieldValues } from "react-hook-form";
import Input from '../inputs/Input';
import { Ranchers } from 'next/font/google';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setguestCount] = useState(1);
    const [step, setStep] = useState(STEPS.LOCATION);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            price: '1',
            city: ''
        }
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step != STEPS.INFO) {
            return onNext();
        }


        const price = watch('price');
        const city = watch('city');

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            price,
            city
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);

        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [dateRange.endDate, dateRange.startDate, guestCount, location?.value, onNext, params, router, searchModal, step, watch]);

    const actionLabel = useMemo(() => {
        if (step == STEPS.INFO) {
            return 'Procurar'
        }
        return "Próximo"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step == STEPS.LOCATION) {
            return undefined;
        }
        return "Voltar"
    }, [step]);

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Onde deseja procurar o evento?'
                subtitle='Ache o melhor evento para seu local'
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step == STEPS.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Para quando deseja entrar numa partida?'
                    subtitle='Escolha os dias disponíveis para jogar'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)
                    }

                />
            </div>
        )
    }

    if (step == STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Nos conte mais!'
                    subtitle='Nos forneça mais informações para limitar a sua busca'
                />
                <Counter
                    title='Convidados'
                    subtitle='Nos diga quantos amigos irão te acompanhar!'
                    value={guestCount}
                    onChange={(value) => setguestCount(value)}
                />
                <Input
                    id="price"
                    label="Preço máximo"
                    formatPrice={true}
                    type="number"
                    register={register}
                    errors={errors}
                    required
                />

                <Input
                    id="city"
                    label="Cidade"
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title='Filtros'
            actionLabel={actionLabel}
            secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />
    )
}

export default SearchModal;