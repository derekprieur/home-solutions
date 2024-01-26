"use client";

import ProviderCard, { ProviderCardProps } from "@/components/ProviderCard";
import { data } from "../constants/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import ServicesFilter from "@/components/ServicesFilter";

export default function Home() {
  const [selectedRating, setSelectedRating] = useState<any>(null);
  const [selectedServices, setSelectedServices] = useState<any>([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (selectedRating) {
      setFilteredData(
        data.filter((provider) => provider.review_score >= selectedRating)
      );
    } else {
      setFilteredData(data);
    }
  }, [selectedRating]);

  useEffect(() => {
    if (selectedServices.length === 0) {
      setFilteredData(data);
    }
  }, [selectedServices]);

  console.log(selectedRating, "selectedRating");
  console.log(filteredData, "filteredData");

  return (
    <main className="w-full justify-center items-center h-full pt-16 px-2">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3">
          <Select
            onValueChange={(value: any) => setSelectedRating(Number(value))}
          >
            <SelectTrigger className="w-fit text-gray-600 font-semibold text-sm">
              <SelectValue placeholder="STAR RATING" className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"all"}>All Ratings</SelectItem>
                <SelectItem value={"5"}>5 Stars</SelectItem>
                <SelectItem value={"4.5"}>4 Stars</SelectItem>
                <SelectItem value={"4"}>4 Stars</SelectItem>
                <SelectItem value={"3.5"}>3.5 Stars</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <ServicesFilter
            data={filteredData}
            setData={setFilteredData}
            setSelectedServices={setSelectedServices}
          />
          <Select>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="DISTANCE" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {filteredData.length > 0 ? (
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredData.map((provider: any) => (
              <ProviderCard key={provider._id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="max-w-7xl flex justify-center mt-20">
            No results found
          </div>
        )}
      </div>
    </main>
  );
}
