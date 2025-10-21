"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Select an assignee" />

      <Select.Content>
        <Select.Group>
          <Select.Label>Sugestions</Select.Label>
          <Select.Item value="1">Mudasir najimudin</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
