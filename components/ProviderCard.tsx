import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardHeader, CardDescription } from "./ui/card";
import {
  MdCheck,
  MdOutlineKeyboardArrowDown,
  MdOutlineStar,
  MdOutlineStarBorder,
  MdStarHalf,
} from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Info } from "lucide-react";
import { TiLocation } from "react-icons/ti";
import { HiFire } from "react-icons/hi";

export interface ProviderCardProps {
  provider: {
    _id: string;
    name: string;
    rating: number;
    address: string;
    services: string[];
    slug: string;
    experiences?: string;
    third_party_ratings: {
      google_places: {
        review_score: number;
      };
    };
    distance: number;
    review_count: number;
  };
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const renderStars = (score: number) => {
    let stars = [];
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <MdOutlineStar className="text-yellow-400 text-xl" key={i} />
        );
      } else if (halfStar && i === fullStars + 1) {
        stars.push(<MdStarHalf className="text-yellow-400 text-xl" key={i} />);
      } else {
        stars.push(
          <MdOutlineStarBorder className="text-yellow-400 text-xl" key={i} />
        );
      }
    }
    return stars;
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex flex-col">
          <div className="flex justify-between">
            <div className="relative h-20 w-20">
              <Image
                width={400}
                height={400}
                layout="responsive"
                className=" object-cover absolute"
                src={`/${provider.slug}.jpg`}
                alt="Provider Image"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-600/90 rounded-none font-extrabold px-10">
              Get Quote
            </Button>
          </div>
          <h2 className="mt-4 font-bold text-xl text-black truncate">
            {provider.name}
          </h2>
          <div className="mt-2 flex flex-row items-center gap-1">
            <div className="flex flex-row">
              {renderStars(
                provider.third_party_ratings.google_places.review_score
              )}
            </div>
            <div className="relative flex items-center">
              <h4 className="text-black font-bold text-xs">
                {provider.third_party_ratings.google_places.review_score.toFixed(
                  1
                )}
                /5
              </h4>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger
                    asChild
                    className="absolute -top-1 -right-4 cursor-pointer"
                  >
                    <Info className="w-3 h-3" />
                  </TooltipTrigger>
                  <TooltipContent
                    className="max-w-72 border-green-300"
                    side="right"
                  >
                    <p className="font-light text-sm">
                      Lorem ipsum dolor sit amet consecteur. Pellentesque elit
                      est sodales tristique consectetur tincideunt.
                    </p>
                    <h2 className="mt-1 font-bold text-sm text-center">
                      BETTER THAN <span className="text-green-600">90%</span> OF
                      COMPANIES
                    </h2>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="ml-4 text-xs text-black">| {provider.address}</p>
          </div>
          <div className="mt-3 flex items-center gap-2 h-4">
            {provider.distance <= 5 && (
              <div className="flex items-center">
                <TiLocation className="text-green-600 text-2xl" />
                <h3 className="font-semibold text-black">Nearby</h3>
              </div>
            )}
            {provider.review_count >= 100 && (
              <div className="flex items-center">
                <HiFire className="text-green-600 text-2xl" />
                <h3 className="font-semibold text-black">Popular</h3>
              </div>
            )}
          </div>
          <div className="mt-6">
            <div className="h-32 overflow-y-auto">
              <h2 className="font-bold text-gray-700">SERVICES OFFERED</h2>
              <div className="flex flex-row flex-wrap gap-3 mt-4">
                {provider.services.map((service, index) => (
                  <div className="flex items-center gap-1" key={index}>
                    <MdCheck className="text-green-600 text-xl" />
                    <p className="font-medium text-black">{service}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-7">
              <h2 className="font-bold text-gray-700">EXPERIENCES</h2>
              <div className="bg-gray-100 p-4 mt-3">
                <p className="italic text-black text-sm">
                  &quot;We could not be happier with our HVAC system. Lorem
                  ipsum dolor sit amet consecteur. Dictum fusce dignissim non in
                  magna id. Elementum enim leo aliquam gravida phasellus eget
                  nulla.&quot;
                </p>
                <p className="text-black text-right mt-1">- Shane D.</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="ml-auto font-bold text-gray-700 hover:bg-transparent"
          >
            SEE MORE{" "}
            <MdOutlineKeyboardArrowDown className="text-blue-500 text-xl" />
          </Button>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProviderCard;
