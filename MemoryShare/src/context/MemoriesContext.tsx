import React, { createContext, useContext, useState } from "react";
import { Memory, Tag } from "../types/memory";

type MemoriesContextType = {
  memories: Memory[];
  tags: Tag[];
  addMemory: (m: Omit<Memory, "id" | "createdAt">) => void;
  getMemoryById: (id: string) => Memory | undefined;
};

const MemoriesContext = createContext<MemoriesContextType | undefined>(
  undefined
);

export const useMemories = () => {
  const ctx = useContext(MemoriesContext);
  if (!ctx) throw new Error("useMemories must be used within MemoriesProvider");
  return ctx;
};

export const MemoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tags] = useState<Tag[]>([
    { id: "family", name: "Family", color: "#1E90FF" },
    { id: "vacation", name: "Vacation", color: "#FF69B4" },
    { id: "friends", name: "Friends", color: "#32CD32" },
  ]);

  const [memories, setMemories] = useState<Memory[]>([
    {
      id: "1",
      title: "Trip to Trondheim",
      description: "Walk along Nidelva with friends.",
      imageUri: "https://placekitten.com/300/300",
      tags: ["vacation", "friends"],
      location: { latitude: 63.4305, longitude: 10.3951 },
      createdAt: new Date().toISOString(),
    },
  ]);

  const addMemory = (m: Omit<Memory, "id" | "createdAt">) => {
    const newMemory: Memory = {
      ...m,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
    };
    setMemories((prev) => [newMemory, ...prev]);
  };

  const getMemoryById = (id: string) =>
    memories.find((m) => m.id === id);

  return (
    <MemoriesContext.Provider
      value={{ memories, tags, addMemory, getMemoryById }}
    >
      {children}
    </MemoriesContext.Provider>
  );
};
