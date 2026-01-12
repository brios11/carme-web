import { promises as fs } from "fs";
import path from "path";

export type CarMeRequest = {
  id: string;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  delivery: boolean;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  stripeUrl?: string;
};

const FILE = path.join(process.cwd(), "data", "requests.json");

async function ensureFile() {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  try { await fs.access(FILE); } catch { await fs.writeFile(FILE, "[]", "utf8"); }
}

export async function listRequests() {
  await ensureFile();
  const raw = await fs.readFile(FILE, "utf8");
  return JSON.parse(raw) as CarMeRequest[];
}

export async function addRequest(r: CarMeRequest) {
  const all = await listRequests();
  all.unshift(r);
  await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
}

export async function updateRequest(id: string, patch: Partial<CarMeRequest>) {
  const all = await listRequests();
  const idx = all.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch };
  await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
  return all[idx];
}

export async function getRequest(id: string) {
  const all = await listRequests();
  return all.find((x) => x.id === id) ?? null;
}

  