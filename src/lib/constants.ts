export const SITE_NAME = "Talentos RH";
export const SITE_FULL_NAME = "Talentos RH Consultoria";
export const SITE_DESCRIPTION =
  "Consultoria de Recursos Humanos especializada em recrutamento e seleção, desenvolvimento organizacional e gestão de pessoas.";
export const CONTACT_EMAIL = "contato@talentosrh.com.br";
export const CONTACT_PHONE = "(11) 4002-8922";

export const MODALITIES = ["PRESENCIAL", "REMOTO", "HIBRIDO"] as const;
export type Modality = (typeof MODALITIES)[number];

export const CONTRACT_TYPES = [
  "CLT",
  "PJ",
  "ESTAGIO",
  "TEMPORARIO",
  "FREELANCER",
] as const;
export type ContractType = (typeof CONTRACT_TYPES)[number];

export const MODALITY_LABELS: Record<Modality, string> = {
  PRESENCIAL: "Presencial",
  REMOTO: "Remoto",
  HIBRIDO: "Híbrido",
};

export const CONTRACT_LABELS: Record<ContractType, string> = {
  CLT: "CLT",
  PJ: "PJ",
  ESTAGIO: "Estágio",
  TEMPORARIO: "Temporário",
  FREELANCER: "Freelancer",
};

export const BRAZILIAN_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
] as const;
