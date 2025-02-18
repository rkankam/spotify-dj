"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  SearchIcon, 
  SlidersIcon,
  ArrowUpDownIcon,
  ClockIcon,
  KeyIcon
} from "lucide-react";

// Helper function to format duration in milliseconds to MM:SS
const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Musical keys array
const musicalKeys = [
  "Am", "Em", "Bm", "F#m", "C#m", "G#m", "D#m", "A#m",
  "C", "G", "D", "A", "E", "B", "F#", "C#"
];

// Mock data for demonstration
const mockTracks = [
  {
    id: 1,
    title: "Dancing Queen",
    artist: "ABBA",
    bpm: 100,
    key: "Am",
    danceability: 0.8,
    energy: 0.9,
    duration_ms: 230000, // 3:50
  },
  {
    id: 2,
    title: "Stayin' Alive",
    artist: "Bee Gees",
    bpm: 104,
    key: "Em",
    danceability: 0.9,
    energy: 0.8,
    duration_ms: 285000, // 4:45
  },
  {
    id: 3,
    title: "Billie Jean",
    artist: "Michael Jackson",
    bpm: 117,
    key: "F#m",
    danceability: 0.9,
    energy: 0.8,
    duration_ms: 294000, // 4:54
  },
  {
    id: 4,
    title: "Get Lucky",
    artist: "Daft Punk",
    bpm: 116,
    key: "Bm",
    danceability: 0.8,
    energy: 0.7,
    duration_ms: 367000, // 6:07
  },
];

export function LibraryView() {
  const [tracks] = useState(mockTracks);
  const [searchQuery, setSearchQuery] = useState("");
  const [bpmRange, setBpmRange] = useState([0, 200]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBpm = track.bpm >= bpmRange[0] && track.bpm <= bpmRange[1];
    const matchesKey = selectedKeys.length === 0 || selectedKeys.includes(track.key);
    
    return matchesSearch && matchesBpm && matchesKey;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersIcon className="mr-2 h-4 w-4" />
                Filters {(selectedKeys.length > 0 || bpmRange[0] > 0 || bpmRange[1] < 200) && '(Active)'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] p-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">BPM Range</label>
                    {(bpmRange[0] > 0 || bpmRange[1] < 200) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setBpmRange([0, 200])}
                        className="h-auto p-0 text-muted-foreground hover:text-foreground text-xs"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                  <Slider
                    value={bpmRange}
                    onValueChange={setBpmRange}
                    min={0}
                    max={200}
                    step={1}
                  />
                  <div className="text-xs text-muted-foreground">
                    {bpmRange[0]} - {bpmRange[1]} BPM
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <KeyIcon className="h-4 w-4" />
                      <h4 className="font-medium">Musical Keys</h4>
                    </div>
                    {selectedKeys.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedKeys([])}
                        className="h-auto p-0 text-muted-foreground hover:text-foreground text-xs"
                      >
                        Clear ({selectedKeys.length})
                      </Button>
                    )}
                  </div>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2 pr-4">
                      {musicalKeys.map((key) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`key-${key}`}
                            checked={selectedKeys.includes(key)}
                            onCheckedChange={(checked) => {
                              setSelectedKeys(
                                checked
                                  ? [...selectedKeys, key]
                                  : selectedKeys.filter((k) => k !== key)
                              );
                            }}
                          />
                          <label
                            htmlFor={`key-${key}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {key}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  BPM
                  <ArrowUpDownIcon className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Danceability</TableHead>
              <TableHead>Energy</TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  Duration
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTracks.map((track) => (
              <TableRow key={track.id}>
                <TableCell className="font-medium">{track.title}</TableCell>
                <TableCell>{track.artist}</TableCell>
                <TableCell>{track.bpm}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{track.key}</Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${track.danceability * 100}%` }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${track.energy * 100}%` }}
                    />
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDuration(track.duration_ms)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}