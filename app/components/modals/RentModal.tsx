'use client';

import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal"
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5, 
}

const RentModal = () => {

  const rentModal = useRentModal();

  const [step,setStep] = useState(STEPS.CATEGORY);

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
      imageSrc: '',
      preco: 1,
      title: '',
      description: '',
      endereco: ''
    }
  });

  const category = watch('category');
  const location = watch('location');
  const numPessoas = watch('numPessoas')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(() => dynamic(() => import("../Map"),{
    ssr: false
  }),[location]);

  const setCustomValue = (id: string,value: any) => {
    setValue(id,value,{
      shouldValidate:true,
      shouldDirty:true,
      shouldTouch: true,
    })
  }

  const onBack = () =>{
    setStep((value) => value-1);
  }

  const onNext = () =>{
    setStep((value) => value+1);
  }

  const actionLabel = useMemo(() => {
    if(step == STEPS.PRICE){
      return 'Criar Evento'
    }

    return 'Próximo';
  },[step]);

  const secondaryActionLabel = useMemo(() => {
    if(step == STEPS.CATEGORY){
      return undefined;
    }

    return "Voltar";
  },[step])

  let bodyContent =(
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
              onClick={(category)=> setCustomValue('category',category)}
              selected={category==item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if(step == STEPS.LOCATION){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Onde será seu evento?"
          subtitle="Ajude os jogadores a encontrar seu evento!"
        />
        <CountrySelect 
          value={location}
          onChange={(value) => setCustomValue('location',value)}
        />
        <Map 
          center={location?.latlng}
        />
      </div>
    )   
  }

  if (step == STEPS.INFO){
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
          onChange={(value) => setCustomValue('numPessoas',value)}
        />
      </div>
    )
  }

  if(step == STEPS.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Adicione fotos do lugar do evento"
          subtitle="Mostre aos participantes onde será o evento"
        />
        <ImageUpload 
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc',value)}
        />
      </div>
    )
  }

  return (
    <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step==STEPS.CATEGORY ? undefined : onBack}
        title="Criar seu evento"
        body={bodyContent}
    />
  )
}

export default RentModal