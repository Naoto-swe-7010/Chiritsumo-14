-- users テーブルにデータ挿入
INSERT INTO "User" (
  "id",
  "name",
  "email",
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  'testId',
  'test',
  'test@gmail.com',
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
  'testToken',
  'testId',
  CURRENT_TIMESTAMP + INTERVAL '1 day',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- balance テーブルにデータ挿入
INSERT INTO "Balance" (
  "id",
  "userId",
  "balance"
) VALUES (
  'testId',
  'testId',
  0
);

