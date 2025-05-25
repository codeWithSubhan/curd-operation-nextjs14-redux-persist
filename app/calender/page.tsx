"use client";
import React, { FormEvent, ReactElement, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import Header from "../_components/Header";
import Modal from "../_components/Modal";
import Button from "../_components/Button";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/store";
import { calenderAddEvent } from "../reduxToolkit/calenderSlice";
import { useForm } from "../hooks/useForm";

type Event = {
  title: string;
  eventType: string;
};

type InputSchema = {
  name: keyof Event;
  type: string;
  placeholder: string;
  point?: string[];
};

const inputFields: InputSchema[] = [
  {
    name: "eventType",
    type: "select",
    placeholder: "Select Event Type",
    point: ["Add Event", "Add Reminder"],
  },
  {
    name: "title",
    type: "text",
    placeholder: "Enter Event Name",
  },
];

export default function Calendar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const { formData, onChange, resetForm } = useForm<Event>({
    title: "",
    eventType: "",
  });

  const dispatch = useAppDispatch();
  const { eventList } = useAppSelector((state) => state.calender);

  const handleDateClick = ({ dateStr }: { dateStr: string }) => {
    setIsOpen(true);
    setDate(dateStr);
  };

  const handleSubmitEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const color = formData.eventType === "Add Event" ? "#3b82f6" : "#f59e0b";
    dispatch(calenderAddEvent({ ...formData, date, color }));

    setIsOpen(false);
    resetForm();
  };

  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Header>Calender</Header>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          center: "title",
          left: "prev,next today",
        }}
        events={eventList}
        dateClick={handleDateClick}
      />

      <Modal isOpen={isOpen}>
        <Header>Add Event</Header>
        <form onSubmit={handleSubmitEvent}>
          {inputFields.map((item) => (
            <div key={item.name}>
              {item.type === "select" && (
                <select
                  name={item.name}
                  value={formData.eventType}
                  onChange={onChange}
                  required
                  className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled hidden>
                    {item.placeholder}
                  </option>
                  {item.point?.map((points) => (
                    <option key={points} value={points}>
                      {points}
                    </option>
                  ))}
                </select>
              )}

              {item.type !== "select" && (
                <input
                  type={item.type}
                  name={item.name}
                  value={formData.title}
                  onChange={onChange}
                  placeholder={item.placeholder}
                  required
                  className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              )}
            </div>
          ))}

          <Button>Submit</Button>
          <Button onclick={handleToggleModal}>Close</Button>
        </form>
      </Modal>
    </div>
  );
}
