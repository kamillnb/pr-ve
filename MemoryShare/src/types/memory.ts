export type Tag = {
  id: string;
  name: string;
  color: string; // hex
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type Memory = {
  id: string;
  title: string;
  description?: string;
  imageUri: string;
  tags: string[]; // tag IDs
  location: Location;
  createdAt: string; // ISO string
};
