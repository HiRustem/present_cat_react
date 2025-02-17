export interface INeedBar {
  label: string;
  value: number;
  handler?: INeedBarHandler;
}

interface INeedBarHandler {
  onClick: () => void;
  text: string;
  condition: boolean;
}
