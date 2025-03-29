-- users テーブルにデータ挿入
INSERT INTO "User" (
  id,
  name,
  email,
  image,
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  'cm8sql6kt0000u5nygrbdb9ko',
  'test',
  'test@gmail.com',
  'https://example.com/image.png',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- session テーブルにデータ挿入
INSERT INTO "Session" (
  "sessionToken",
  "userId",
  "expires",
  "createdAt",
  "updatedAt"
) VALUES (
  'dummy',
  'cm8sql6kt0000u5nygrbdb9ko',
  CURRENT_TIMESTAMP + INTERVAL '1 day',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- account テーブルにデータ挿入
INSERT INTO "Account" (
    "userId",
    "type",
    "provider",
    "providerAccountId",
    "createdAt",
    "updatedAt"
) VALUES (
    'cm8sql6kt0000u5nygrbdb9ko',
    'oidc',
    'google',
    '102616624127317225475',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- balance テーブルにデータ挿入
INSERT INTO "Balance" (
  "id",
  "userId",
  "balance"
) VALUES (
  'test',
  'cm8sql6kt0000u5nygrbdb9ko',
  0
);

