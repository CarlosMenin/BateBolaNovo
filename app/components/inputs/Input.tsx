'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { BiDollar } from "react-icons/bi";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    register,
    required,
    errors
}) => {
    const validateNumber = (value: string) => {
        if (type === "number") {
            const numberValue = parseFloat(value);
            if (isNaN(numberValue) || numberValue < 0) {
                toast.error("Preço não pode ser menor que 0");
                return;
            }
        }
        return true;
    };

    const validateCity = (value: string) => {
        if (id === "cidade" && value.length > 40) {
            return;
        }
        return true;
    };

    const validateDescription = (value: string) => {
        if (id === "description" && value.length > 150) {
            return;
        }
        return true;
    };
    const validateGroup = (value: string) => {
        if (id === "grupo" && value.length > 40) {
            return;
        }
        return true;
    };

    const validateTitle = (value: string) => {
        if (id === "title" && value.length > 30) {
            return;
        }
        return true;
    };

    const validateEndereco = (value: string) => {
        if (id === "endereco" && value.length > 40) {
            return;
        }
        return true;
    };

    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="text-neutral-700 absolute top-5 left-2"
                />
            )}
            <input
                id={id}
                disabled={disabled}
                maxLength={
                    id === 'cidade' ? 40 :
                        id === 'description' ? 150 :
                            id === 'grupo' ? 40 :
                                id === 'title' ? 30 :
                                    id === 'endereco' ? 40 : undefined
                }
                {...register(id, {
                    required,
                    validate: {
                        validateNumber,
                        validateCity,
                        validateDescription,
                        validateGroup,
                        validateTitle,
                        validateEndereco
                    }
                })}
                type={type}
                className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-purple-700' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-purple-700' : 'focus:border-black'}
        `}
            />
            <label
                className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3 
          top-5
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'} 
          peer-placeholder-shown:scale-100     
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-purple-700' : 'text-zinc-400'}
        `}
            >
                {label}
            </label>
        </div>
    );
}

export default Input;
