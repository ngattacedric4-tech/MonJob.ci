import type { SourceKind } from "@/lib/db/types";

export type SourceDefinition = {
  kind: SourceKind;
  name: string;
  trustLabel: string;
};

export const sources: SourceDefinition[] = [
  { kind: "partner_site", name: "Emploi.ci", trustLabel: "Source live" },
  { kind: "partner_site", name: "Stage.ci", trustLabel: "Source live" },
  { kind: "partner_site", name: "Educarriere.ci", trustLabel: "Source live" },
  { kind: "partner_site", name: "Novojob", trustLabel: "Source live" },
  { kind: "chariow", name: "Chariow", trustLabel: "Formation premium" },
  { kind: "direct", name: "Publication directe", trustLabel: "Soumission manuelle" },
];
