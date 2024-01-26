import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface RatingFilterProps {
  setSelectedRating: (value: number) => void;
}

const RatingFilter = ({ setSelectedRating }: RatingFilterProps) => {
  return (
    <Select onValueChange={(value: any) => setSelectedRating(Number(value))}>
      <SelectTrigger className="w-fit text-gray-600 font-semibold text-sm">
        <SelectValue placeholder="STAR RATING" className="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={"all"}>All Ratings</SelectItem>
          <SelectItem value={"5"}>5 Stars</SelectItem>
          <SelectItem value={"4.5"}>4.5 Stars</SelectItem>
          <SelectItem value={"4"}>4 Stars</SelectItem>
          <SelectItem value={"3.5"}>3.5 Stars</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RatingFilter;
