import { prisma } from '../prisma';

const seed = async () => {
  await prisma.session.create({
    data: {
      sessionToken: 'testToken',
      userId: 'testId',
      expires: new Date(new Date().getTime() + 86400)
    }
  });
  await prisma.account.create({
    data: {
      provider: 'google',
      providerAccountId: '115734172502700840099',
      userId: 'testId',
      type: 'oidc',
      refresh_token: null,
      access_token:
        'ya29.a0AeXRPp7fFnYRH8ZALJswQ04RYe4zC49UDRQa1kQGZxT3oMkI2AphG3diHd8_usgxeh3lDKdKbtqLBdR6Ezg1KyIon3dNYRONBSC13U4vcCe8NsKYQDMF-bPl13BPj-NgOTIEmnc1wliAxHsrpFrqq6Mf_BBBBJzV9w-H3oHyaCgYKAdoSARISFQHGX2MioTx02RleTJ-sv9wR_qlK5A0175',
      expires_at: 1742218194,
      token_type: 'bearer',
      scope:
        'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      id_token:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMTkzZDQ2NDdhYjRhMzU4NWFhOWIyYjNiNDg0YTg3YWE2OGJiNDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMjg2NzIzOTIyOTYtbnJiYnU3ZWhmdnE2aWZncXVzajdmZTQ5c2tsMjVhYzEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMjg2NzIzOTIyOTYtbnJiYnU3ZWhmdnE2aWZncXVzajdmZTQ5c2tsMjVhYzEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU3MzQxNzI1MDI3MDA4NDAwOTkiLCJlbWFpbCI6ImNuYW5uLjA2MTUudGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImFEcklCc1R3WkVSbGFOVGQyU3ByQ2ciLCJuYW1lIjoiSXNoaWkgTmFvdG8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTHZqTV9YakdtOXUtbzFrX0NZVjJVaE16RmIxWkxiNEplYUczUGw4U1NhUWFYVWp3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IklzaGlpIiwiZmFtaWx5X25hbWUiOiJOYW90byIsImlhdCI6MTc0MjIxNDU5NSwiZXhwIjoxNzQyMjE4MTk1fQ.h6gX1Kj3PiuRnIDyloTXAUzbHy8Si_SpYmzTvqS51mrfjWrKePEL1jjHhcgVb-g2W8YiO4BsXc0LUSPpIpfBp6wtb8zdMWVULnVTvofOaoKqn9XKNVkDCd7-CEuLrit0WSFveh05uga9FWN1BVHFn8yeaN6LIP1-pplFEc6VPtpEGT1P3GvtoyEiVVxdvzVGJB5k8YWaUFmSR-FOZeze7eNj0ty7TS-0ZSNsCJKoPOnSOheJOabMYzSxAyPzSh0Tg_c1tnVD_J4mbQdwHFVpOjMyzrvvZZaOF63dGCk39khUR36NZC1_N2VPepfv8v-Dp03hj4jNouH5d-VSJxOT2A',
      session_state: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
  await prisma.user.create({
    data: {
      id: 'testId',
      name: 'test',
      email: 'test@gmail.com',
      image: 'https://example.com/image.png',
      emailVerified: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
  await prisma.balance.create({
    data: {
      userId: 'testId',
      balance: 0
    }
  });
};

seed();
