import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DistanceFilterProps {
  setSelectedDistance: (value: any) => void;
}

const DistanceFilter = ({ setSelectedDistance }: DistanceFilterProps) => {
  return (
    <Select onValueChange={(value: any) => setSelectedDistance(value)}>
      <SelectTrigger className="w-fit text-gray-600 font-semibold text-sm">
        <SelectValue placeholder="DISTANCE" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All Distances</SelectItem>
          <SelectItem value="5">5 Miles</SelectItem>
          <SelectItem value="10">10 Miles</SelectItem>
          <SelectItem value="15">15 Miles</SelectItem>
          <SelectItem value="20">20 Miles</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DistanceFilter;
