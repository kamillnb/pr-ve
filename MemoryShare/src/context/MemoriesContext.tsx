import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Memory, Tag } from "../types/memory";

const STORAGE_KEYS = {
  memories: "@memoryshare/memories",
  tags: "@memoryshare/tags",
};

type MemoriesContextType = {
  memories: Memory[];
  tags: Tag[];
  addMemory: (m: Omit<Memory, "id" | "createdAt">) => void;
  getMemoryById: (id: string) => Memory | undefined;
  addTag: (name: string, color: string) => void;
  editTag: (id: string, name: string, color: string) => void;
  deleteTag: (id: string) => void;
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
  const [tags, setTags] = useState<Tag[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const bootstrap = async () => {
      const [storedMemories, storedTags] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.memories),
        AsyncStorage.getItem(STORAGE_KEYS.tags),
      ]);

      if (storedTags) {
        setTags(JSON.parse(storedTags));
      } else {
        setTags([
          { id: "family", name: "Family", color: "#1E90FF" },
          { id: "vacation", name: "Vacation", color: "#FF69B4" },
          { id: "friends", name: "Friends", color: "#32CD32" }
        ]);
      }

      if (storedMemories) {
        setMemories(JSON.parse(storedMemories));
      } else {
        setMemories([
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
      }
    };

    bootstrap();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.memories, JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.tags, JSON.stringify(tags));
  }, [tags]);

  const addMemory = (m: Omit<Memory, "id" | "createdAt">) => {
    const newMemory: Memory = {
      ...m,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
    };
    setMemories((prev) => [newMemory, ...prev]);
  };

  const assertUniqueTag = (name: string, color: string, ignoreId?: string) => {
    const conflict = tags.find(
      (t) =>
        (t.name.toLowerCase() === name.toLowerCase() || t.color === color) &&
        t.id !== ignoreId
    );
    if (conflict) {
      throw new Error("Tag names and colors must be unique");
    }
  };

  const addTag = (name: string, color: string) => {
    assertUniqueTag(name, color);
    const newTag: Tag = {
      id: Math.random().toString(36).slice(2),
      name,
      color,
    };
    setTags((prev) => [...prev, newTag]);
  };

  const editTag = (id: string, name: string, color: string) => {
    assertUniqueTag(name, color, id);
    setTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name, color } : t))
    );
    setMemories((prev) =>
      prev.map((m) => ({
        ...m,
        tags: m.tags.includes(id) ? m.tags : m.tags,
      }))
    );
  };

  const deleteTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
    setMemories((prev) =>
      prev.map((m) => ({
        ...m,
        tags: m.tags.filter((tagId) => tagId !== id),
      }))
    );
  };

  const getMemoryById = (id: string) =>
    memories.find((m) => m.id === id);

  return (
    <MemoriesContext.Provider
      value={{ memories, tags, addMemory, getMemoryById, addTag, editTag, deleteTag }}
    >
      {children}
    </MemoriesContext.Provider>
  );
};
