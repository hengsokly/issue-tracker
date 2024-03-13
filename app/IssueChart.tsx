'use client';

import { Card } from "@radix-ui/themes";
import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data: { label: string; value: number }[] = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Bar
          dataKey="value"
          barSize={60}
          style={{fill: 'var(--accent-9)'}}
        />
      </BarChart>
    </Card>
  );
};

export default IssueChart;
