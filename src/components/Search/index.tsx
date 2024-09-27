import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    onSearch(query); // Trigger the search whenever the input changes
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="w-5 h-5 text-[#2D3748]" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Pesquise aqui..."
        className="w-full p-2 pl-10 border rounded-xl shadow-sm focus:outline-none focus:ring focus:border-green-300"
      />
    </div>
  );
}
