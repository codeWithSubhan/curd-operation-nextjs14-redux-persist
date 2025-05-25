"use client";
import React, { ReactElement, useState } from "react";

import Header from "../_components/Header";
import Button from "../_components/Button";
import Modal from "../_components/Modal";
import Order from "../_components/Order";

import { useAppDispatch, useAppSelector } from "../reduxToolkit/store";
import { SquarePen, Trash2 } from "lucide-react";
import { orderEditDelete } from "../reduxToolkit/orderSlice";
import { Metadata } from "next";

const headers = [
  "DONAR",
  "PANELS",
  "BARCODE",
  "SOURCE",
  "DATE",
  "AMOUNT",
  "OBSERVED BY",
  "STATUS",
  "ACTION",
];

type OrderType = {
  id: string;
  donar: string;
  panel: string;
  barcode: string;
  source: string;
  date: string;
  amount: string;
  observed: string;
  status: string;
};

export default function workOrder(): ReactElement {
  const [isOpen, setIsopen] = useState(false);
  const { orderData } = useAppSelector((state) => state.order);

  function handleToggleModal() {
    setIsopen((prev) => !prev);
  }

  return (
    <>
      <Header>
        Work Orders
        <Button onclick={handleToggleModal}>Create Order</Button>
      </Header>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderData?.map((item) => (
              <OrderList key={item.id} item={item} />
            ))}

            {!orderData.length && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <td colSpan={9} rowSpan={3} className="text-center">
                  Please create an order to view here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen}>
        <Order title="Create Order" onClose={handleToggleModal}>
          <Button>Submit</Button>
          <Button onclick={handleToggleModal}>Close</Button>
        </Order>
      </Modal>
    </>
  );
}

function OrderList({ item }: { item: OrderType }): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { orderData } = useAppSelector((state) => state.order);

  function handleDeleteOrder() {
    const data = orderData.filter((el) => el.id !== item.id);
    dispatch(orderEditDelete(data));
  }

  function handleToggleModal() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <td className="px-6 py-4">{item.donar}</td>
        <td className="px-6 py-4">{item.panel}</td>
        <td className="px-6 py-4">{item.barcode}</td>
        <td className="px-6 py-4">{item.source}</td>
        <td className="px-6 py-4">{item.date}</td>
        <td className="px-6 py-4">{item.amount}</td>
        <td className="px-6 py-4">{item.observed}</td>
        <td className="px-6 py-4">{item.status}</td>
        <td className="px-6 py-4 flex gap-1">
          <SquarePen cursor="pointer" onClick={handleToggleModal} />
          <Trash2 cursor="pointer" onClick={handleDeleteOrder} />
        </td>
      </tr>

      <Modal isOpen={isOpen}>
        <Order title="Update Order" item={item} onClose={handleToggleModal}>
          <Button>Submit</Button>
          <Button onclick={handleToggleModal}>Close</Button>
        </Order>
      </Modal>
    </>
  );
}
