import ProviderCard, { ProviderCardProps } from "@/components/ProviderCard";
import { data } from "../constants/data";

export default function Home() {
  return (
    <main className="w-full justify-center items-center h-full">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 pt-16 px-2 gap-4">
        {data.map((provider: any) => (
          <ProviderCard key={provider._id} provider={provider} />
        ))}
      </div>
    </main>
  );
}
