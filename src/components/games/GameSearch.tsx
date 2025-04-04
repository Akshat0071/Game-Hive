import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameSearchProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
}

const GameSearch = ({ onSearch, onFilter }: GameSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Action",
    "Adventure",
    "Puzzle",
    "Strategy",
    "Racing",
    "Sports",
    "RPG",
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-lg shadow-sm">
      <div className="flex gap-2">
        <Input
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => onSearch(searchQuery)}>Search</Button>
      </div>
      <Select onValueChange={onFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category.toLowerCase()}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GameSearch; 