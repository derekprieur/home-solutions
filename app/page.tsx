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

export default function Home() {
  return (
    <main className="w-full justify-center items-center h-full pt-16 px-2">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-3">
          <Select>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="STAR RATING" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="SERVICES OFFERED" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((provider: any) => (
            <ProviderCard key={provider._id} provider={provider} />
          ))}
        </div>
      </div>
    </main>
  );
}
