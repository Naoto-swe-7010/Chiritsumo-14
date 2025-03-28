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
  expires
) VALUES (
  'dummy',
  'cm8sql6kt0000u5nygrbdb9ko',
  CURRENT_TIMESTAMP + INTERVAL '1 day'
);

-- account テーブルにデータ挿入
INSERT INTO "Account" (
  provider,
  "providerAccountId",
  "userId",
  type,
  refresh_token,
  access_token,
  expires_at,
  token_type,
  scope,
  id_token,
  session_state,
  "createdAt",
  "updatedAt"
) VALUES (
  'google',
  '115734172502700840099',
  'cm8sql6kt0000u5nygrbdb9ko',
  'oidc',
  NULL,
  'ya29.a0AeXRPp7fFnYRH8ZALJswQ04RYe4zC49UDRQa1kQGZxT3oMkI2AphG3diHd8_usgxeh3lDKdKbtqLBdR6Ezg1KyIon3dNYRONBSC13U4vcCe8NsKYQDMF-bPl13BPj-NgOTIEmnc1wliAxHsrpFrqq6Mf_BBBBJzV9w-H3oHyaCgYKAdoSARISFQHGX2MioTx02RleTJ-sv9wR_qlK5A0175',
  1742218194,
  'bearer',
  'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMTkzZDQ2NDdhYjRhMzU4NWFhOWIyYjNiNDg0YTg3YWE2OGJiNDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMjg2NzIzOTIyOTYtbnJiYnU3ZWhmdnE2aWZncXVzajdmZTQ5c2tsMjVhYzEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMjg2NzIzOTIyOTYtbnJiYnU3ZWhmdnE2aWZncXVzajdmZTQ5c2tsMjVhYzEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU3MzQxNzI1MDI3MDA4NDAwOTkiLCJlbWFpbCI6ImNuYW5uLjA2MTUudGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImFEcklCc1R3WkVSbGFOVGQyU3ByQ2ciLCJuYW1lIjoiSXNoaWkgTmFvdG8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTHZqTV9YakdtOXUtbzFrX0NZVjJVaE16RmIxWkxiNEplYUczUGw4U1NhUWFYVWp3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IklzaGlpIiwiZmFtaWx5X25hbWUiOiJOYW90byIsImlhdCI6MTc0MjIxNDU5NSwiZXhwIjoxNzQyMjE4MTk1fQ.h6gX1Kj3PiuRnIDyloTXAUzbHy8Si_SpYmzTvqS51mrfjWrKePEL1jjHhcgVb-g2W8YiO4BsXc0LUSPpIpfBp6wtb8zdMWVULnVTvofOaoKqn9XKNVkDCd7-CEuLrit0WSFveh05uga9FWN1BVHFn8yeaN6LIP1-pplFEc6VPtpEGT1P3GvtoyEiVVxdvzVGJB5k8YWaUFmSR-FOZeze7eNj0ty7TS-0ZSNsCJKoPOnSOheJOabMYzSxAyPzSh0Tg_c1tnVD_J4mbQdwHFVpOjMyzrvvZZaOF63dGCk39khUR36NZC1_N2VPepfv8v-Dp03hj4jNouH5d-VSJxOT2A',
  NULL,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);