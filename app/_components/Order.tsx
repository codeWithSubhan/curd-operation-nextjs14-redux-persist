"use client";
import React, { ChangeEvent, FC, FormEvent, ReactNode } from "react";
import Header from "./Header";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/store";
import { orderCreate, orderEditDelete } from "../reduxToolkit/orderSlice";
import { useForm } from "../hooks/useForm";

interface InputField {
  name: keyof FormType;
  type: string;
  placeholder: string;
  point?: string[];
}

interface FormType {
  id: string;
  donar: string;
  panel: string;
  barcode: string;
  source: string;
  date: string;
  amount: string;
  observed: string;
  status: string;
}

interface Props {
  children?: ReactNode;
  item?: FormType;
  title?: string;
}

interface CreateListProps {
  item: InputField;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const initialState: FormType = {
  id: "",
  donar: "",
  panel: "",
  barcode: "",
  source: "",
  date: "",
  amount: "",
  observed: "",
  status: "",
};

const inputFields: InputField[] = [
  {
    name: "donar",
    type: "text",
    placeholder: "Enter Donar Name",
  },
  {
    name: "panel",
    type: "text",
    placeholder: "Enter Panel",
  },
  {
    name: "barcode",
    type: "number",
    placeholder: "Enter Barcode",
  },
  {
    name: "source",
    type: "text",
    placeholder: "Enter Source",
  },
  {
    name: "date",
    type: "date",
    placeholder: "Enter Date",
  },
  {
    name: "amount",
    type: "number",
    placeholder: "Enter Amount",
  },
  {
    name: "observed",
    type: "text",
    placeholder: "Enter Observed By",
  },
  {
    name: "status",
    type: "select",
    placeholder: "Select Status",
    point: ["Unable To Donate", "Refused", "Approved"],
  },
];

const Order: FC<Props> = ({ children, item, title }) => {
  const { formData, onChange, resetForm } = useForm<FormType>(
    item || initialState
  );
  const { orderData } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (item) {
      const updatedData = orderData.map((el) =>
        el.id === item.id ? formData : el
      );
      dispatch(orderEditDelete(updatedData));
      toast.success("Successfully updated order!");
    } else {
      dispatch(orderCreate({ ...formData, id: Date.now().toString() }));
      toast.success("Successfully created order!");
      resetForm();
    }
  };

  return (
    <div>
      <Header>{title}</Header>
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-wrap gap-4">
          {inputFields.map((field) => (
            <CreateList
              key={field.name}
              item={field}
              value={formData[field.name]}
              onChange={onChange}
            />
          ))}
        </div>
        {children}
      </form>
    </div>
  );
};

const CreateList: FC<CreateListProps> = ({ item, value, onChange }) => {
  return (
    <div className="w-[30%]">
      {item.type !== "select" ? (
        <input
          type={item.type}
          name={item.name}
          value={value}
          onChange={onChange}
          placeholder={item.placeholder}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      ) : (
        <select
          name={item.name}
          value={value}
          onChange={onChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled hidden>
            {item.placeholder}
          </option>
          {item.point?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Order;
