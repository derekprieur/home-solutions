"use client";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { CheckIcon, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { useEffect, useState } from "react";

interface ServicesFilterProps {
  data: any[];
  setData: any;
  setSelectedServices: any;
}

const ServicesFilter = ({
  data,
  setData,
  setSelectedServices,
}: ServicesFilterProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [uniqueServices, setUniqueServices] = useState<string[]>([]);

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return "SERVICES OFFERED";
    }
    return selectedValues.join(", ");
  };

  const handleSelect = (currentValue: string) => {
    let updatedSelectedValues: string[];

    if (selectedValues.includes(currentValue)) {
      updatedSelectedValues = selectedValues.filter(
        (value) => value !== currentValue
      );
    } else {
      updatedSelectedValues = [...selectedValues, currentValue];
    }

    setSelectedValues(updatedSelectedValues);
    setSelectedServices(updatedSelectedValues);

    const filteredData = data.filter((provider) =>
      updatedSelectedValues.every((selectedService) =>
        provider.services.includes(selectedService)
      )
    );

    setData(filteredData);
  };

  useEffect(() => {
    let services: string[] = [];
    console.log(data, "data use effect");
    data.forEach((provider) => {
      provider.services.forEach((service: any) => {
        if (!services.includes(service)) {
          services.push(service);
        }
      });
    });
    setUniqueServices(services.sort());
  }, [data]);

  useEffect(() => {
    console.log(selectedValues, "selectedValues");
    if (selectedValues.length === 0) {
      console.log(data, "data");
      setData(data);
      return;
    }

    const filteredData = data.filter((provider) =>
      provider.services.some((service: string) =>
        selectedValues.includes(service)
      )
    );

    setData(filteredData);
  }, [selectedValues]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="max-w-56">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between text-sm text-gray-600 font-semibold"
        >
          <p className="truncate">{getDisplayText()}</p>
          <ChevronDown className="h-4 w-4 ml-2 text-blue-600 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-80 w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Search filters..." className="h-9" />
          <CommandEmpty>No filters found.</CommandEmpty>
          <CommandGroup className="max-h-80 overflow-y-auto">
            {uniqueServices.map((service, index) => (
              <CommandItem
                key={index}
                value={service}
                onSelect={() => handleSelect(service)}
                className="truncate "
              >
                {service}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedValues.includes(service)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ServicesFilter;
