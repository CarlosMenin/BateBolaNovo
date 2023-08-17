"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import qs from "query-string";
import Heading from "../Heading";
import useUserSearchModal from "@/app/hooks/useUserSearchModal";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";

const userSearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const userSearchModal = useUserSearchModal();

  const [name, setName] = useState<string>();

      const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          name: "",
        },
      });

  const onSubmit = useCallback(async () => {
    
    const price = watch("name");

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      name
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    userSearchModal.onClose();
    router.push(url);
  }, [
    userSearchModal,
    router,
    name,
    params
  ])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Buscar Usuários" subtitle="Efetue uma busca por jogadores" />
      <Input
        id="nome"
        label="Nome"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={userSearchModal.isOpen}
      onClose={userSearchModal.onClose}
      onSubmit={onSubmit}
      title="Buscar Usuários"
      actionLabel={"Buscar"}
      body={bodyContent}
    />
  );
};

export default userSearchModal;
