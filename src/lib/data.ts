// data/*.yml をビルド時に読み込む（サーバー側でのみ使用）
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { load as parseYaml } from "js-yaml";
import type { Activities, Cv, Funds, ResearchTheme } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function load<T>(name: string): T {
  const file = path.join(DATA_DIR, `${name}.yml`);
  try {
    return parseYaml(fs.readFileSync(file, "utf8")) as T;
  } catch (err) {
    throw new Error(`データファイル ${file} の読み込みに失敗しました: ${(err as Error).message}`);
  }
}

export const getResearch = (): ResearchTheme[] => load<ResearchTheme[]>("research");
export const getCv = (): Cv => load<Cv>("cv");
export const getActivities = (): Activities => load<Activities>("activities");
export const getFunds = (): Funds => load<Funds>("funds");
