import React, { FC } from "react";
import Order from "./_components/Order";
import Button from "./_components/Button";
import Header from "./_components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datagain Services | Website",
  description: "Generated by create next app",
};

const CreateOrder: FC = function () {
  return (
    <div>
      <Header>Create Order</Header>
      <Order>
        <Button>Submit</Button>
      </Order>
    </div>
  );
};

export default CreateOrder;
