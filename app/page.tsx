"use client";

import ProviderCard, { ProviderCardProps } from "@/components/ProviderCard";
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
import axios from "axios";
import { data } from "@/constants/data";
import { Circle, Loader2 } from "lucide-react";
import RatingFilter from "@/components/RatingFilter";
import DistanceFilter from "@/components/DistanceFilter";

export default function Home() {
  const [selectedRating, setSelectedRating] = useState<any>(null);
  const [selectedServices, setSelectedServices] = useState<any>([]);
  const [selectedDistance, setSelectedDistance] = useState<string>("all");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios("/api/data");
      setFilteredData(response.data);
      console.log(response.data, "response.data");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  useEffect(() => {
    if (selectedDistance === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (provider) => provider.distance <= parseInt(selectedDistance)
      );
      setFilteredData(filtered);
    }
  }, [selectedDistance]);

  useEffect(() => {
    let filteredByRating = data;
    if (selectedRating) {
      filteredByRating = data.filter(
        (provider) => provider.review_score >= selectedRating
      );
    }

    if (selectedDistance !== "all") {
      const distanceInMiles = parseInt(selectedDistance);
      filteredByRating = filteredByRating.filter(
        (provider) => provider.distance <= distanceInMiles
      );
    }

    if (selectedServices.length > 0) {
      filteredByRating = filteredByRating.filter((provider) =>
        selectedServices.every((selectedService: string) =>
          provider.services.includes(selectedService)
        )
      );
    }

    setFilteredData(filteredByRating);
  }, [selectedRating, selectedDistance, selectedServices]);

  return (
    <main className="w-full justify-center items-center h-full pt-16 px-2">
      <div className="flex flex-col gap-4">
        {!isLoading && (
          <div className="flex justify-end gap-3">
            <RatingFilter setSelectedRating={setSelectedRating} />
            <ServicesFilter
              data={filteredData}
              setData={setFilteredData}
              setSelectedServices={setSelectedServices}
            />
            <DistanceFilter setSelectedDistance={setSelectedDistance} />
          </div>
        )}
        {isLoading ? (
          <div className="w-full h-full items-center flex justify-center mt-52">
            <Loader2 className="animate-spin text-green-500 w-12 h-12" />
          </div>
        ) : filteredData.length > 0 ? (
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredData.map((provider) => (
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
