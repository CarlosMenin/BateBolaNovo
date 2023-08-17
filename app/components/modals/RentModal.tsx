'use client';

import { useMemo, useState } from "react";
import { FieldErrors, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import TimeInput from "../inputs/TimeInput";
import DataInput from "../inputs/DataInput";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const isFutureDate = (date: Date) => {
  const now = new Date();
  return date > now;
};

const isFutureTime = (time: Date, selectedDate: Date) => {
  const now = new Date();
  if (selectedDate.toDateString() === now.toDateString()) {
    return time.getTime() > now.getTime();
  }
  return true;
};

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = (date: Date) => {
    console.log("Selected Date:", date);
    if (!isFutureDate(date)) {
      toast.error("Seu evento deve estar no futuro!");
      return;
    }
    setSelectedDate(date);
    setValue('data', date.toISOString()); // Update the form's 'data' field with the new value
  };



  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimeChange = (time: Date) => {
    if (!isFutureTime(time, selectedDate)) {
      toast.error("Seu evento deve estar no futuro!");
      return;
    }
    setSelectedTime(time);
    setValue('horario', time.toISOString()); // Update the form's 'horario' field with the new value
  };

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
      category: '',
      location: null,
      numPessoas: 1,
      numConfirmados: 0,
      imageSrc: '',
      preco: 1,
      title: '',
      description: '',
      endereco: '',
      cidade: '',
      data: selectedDate.toISOString(),
      horario: selectedTime.toISOString(),
      grupo: '',
    }
  });

  const category = watch('category');
  const location = watch('location');
  const numPessoas = watch('numPessoas');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import("../Map"), {
    ssr: false
  }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    if (step !== STEPS.PRICE) {
      setIsSubmitting(false);
      return onNext();
    }
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    setIsLoading(true);

    axios.post('/api/listings', data)
      .then(() => {
        toast.success("Evento criado");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Algo deu errado.");
      }).finally(() => {
        setIsLoading(false);
      });
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Criar Evento'
    }

    return 'Próximo';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Voltar";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Qual a modalidade do seu evento?"
        subtitle="Escolha uma categoria"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Onde será seu evento?"
          subtitle="Ajude os jogadores a encontrar seu evento!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map
          center={location?.latlng}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Defina algumas informações do seu evento"
          subtitle="Características importantes do evento"
        />
        <Counter
          title="Participantes"
          subtitle="Quantos jogadores irão participar do seu evento?"
          value={numPessoas}
          onChange={(value) => setCustomValue('numPessoas', value)}
        />
        <DataInput
          title="Select a Date"
          subtitle="Choose a date using the calendar"
          selectedDate={selectedDate}
          onChange={handleDateChange}
        />
        <TimeInput
          title="Select a Time"
          subtitle="Choose a time using the time picker"
          selectedTime={selectedTime}
          onChange={handleTimeChange}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Adicione fotos do lugar do evento"
          subtitle="Mostre aos participantes onde será o evento"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Descreva seu evento"
          subtitle="Defina os detalhes necessários para os participantes!"
        />
        <Input
          id="title"
          label="Nome do evento"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Descrição"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="cidade"
          label="Cidade"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="endereco"
          label="Endereço do local"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="grupo"
          label="Link do grupo do evento"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Defina o preço por participante do seu evento!"
          subtitle="Quanto cada participante irá pagar?"
        />
        <Input
          id="preco"
          label="Preço"
          formatPrice={true}
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Criar seu evento"
      body={bodyContent}
    />
  )
}

export default RentModal;
