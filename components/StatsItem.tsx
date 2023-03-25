import React from "react";

export default function StatsItem({ name, value, color, max = 160}: { name: string, value: number, color: string, max?: number}) {
  return (
    <>
      <div className="text-sm font-medium text-gray-500">{name}</div>
      <div className="flex items-center" data-testid={`stats-item-${name.toLowerCase()}`}>
        <div className="h-2 w-full bg-gray-200 rounded-full">
          <div className="h-full rounded-full" data-testid="progressbar" style={{
            backgroundColor: color,
            width: `${value/max*100}%`
          }}></div>
        </div>
        <div className="ml-2 text-sm font-medium text-gray-700">{value}</div>
      </div>
    </>
  );
}
