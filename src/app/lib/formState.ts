// エラーメッセージ格納用の型定義
export type AddBalanceFormState = {
  errors?: {
    title?: string[];
    price?: string[];
  };
  message?: string | null;
};

export type UpdateLogFormState = {
  errors?: {
    id?: string[];
    title?: string[];
    price?: string[];
  };
  message?: string | null;
};

export type AddWantedItemFormState = {
  errors?: {
    name?: string[];
    price?: string[];
    url?: string[];
  };
  message?: string | null;
};

export type UpdateWantedItemFormState = {
  errors?: {
    id?: string[];
    name?: string[];
    price?: string[];
    url?: string[];
  };
  message?: string | null;
};
