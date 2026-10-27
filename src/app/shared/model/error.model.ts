export interface ViolationDTO {
  property: string;
  value: string;
  detail: string;
};

export interface ErrorDTO {
  status: number;
  title: string;
  type: string;
  detail: string;
  violations?: ViolationDTO[];
};

export interface ErrorMessageDTO {
  summary: string;
  detail: string;
}
