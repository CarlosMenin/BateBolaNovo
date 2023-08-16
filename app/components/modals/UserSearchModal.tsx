"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import { useForm, FieldValues } from "react-hook-form";
import Input from "../inputs/Input";
import { Ranchers } from "next/font/google";
import useUserSearchModal from "@/app/hooks/useUserSearchModal";

const userSearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const userSearchModal = useUserSearchModal();

    const [name, setName] = useState<string>();

    const onSubmit = useCallback(async () => {
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
      <Heading title="Buscar Usuários" subtitle="Efetue uma busca por jogadores"/>
      {/* <Input
        id="city"
        label="Cidade"
        register={register}
        errors={errors}
        required
      /> */}
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
