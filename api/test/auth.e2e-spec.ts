import { HttpStatus, INestApplication } from '@nestjs/common';
import { Connection } from 'mongoose';
import * as pactum from 'pactum';
import { like } from 'pactum-matchers';
import setup from './setup';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  const port = 3334;

  beforeAll(async () => {
    const result = await setup(port);
    app = result.app;
    connection = result.connection;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
    await app.close();
    pactum.request.setBaseUrl('');
  });

  beforeEach(async () => {
    await connection.dropDatabase();
  });

  describe('POST /auth/sign-up', () => {
    const validUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Test@123',
    };

    it('should sign up a new user successfully', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(validUser)
        .expectStatus(HttpStatus.CREATED)
        .expectJsonMatch({
          message: 'User signed up successfully',
          data: {
            access_token: like('token'),
            refresh_token: like('token'),
            expires_in: like(3600),
          },
        })
        .stores('accessToken', 'data.access_token')
        .stores('refreshToken', 'data.refresh_token');
    });

    it('should return 409 when user already exists', async () => {
      // First sign up
      await pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(validUser)
        .expectStatus(HttpStatus.CREATED);

      // Try to sign up again with same email
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(validUser)
        .expectStatus(HttpStatus.CONFLICT)
        .expectJsonMatch({
          message: 'User already exists',
        });
    });

    it('should return 400 when name is too short', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          ...validUser,
          name: 'Jo',
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when name is missing', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          email: validUser.email,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when email is invalid', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          ...validUser,
          email: 'invalid-email',
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when email is missing', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          name: validUser.name,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when password is too short', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          ...validUser,
          password: 'Test@12',
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when password does not meet complexity requirements', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          ...validUser,
          password: 'password123',
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when password is missing', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          name: validUser.name,
          email: validUser.email,
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when password does not have uppercase letter', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          ...validUser,
          password: 'test@123',
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when password does not have special character', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          ...validUser,
          password: 'Test1234',
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when password does not have number', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          ...validUser,
          password: 'Test@abc',
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /auth/sign-in', () => {
    const validUser = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'Test@456',
    };

    beforeEach(async () => {
      // Sign up a user before each test
      await pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(validUser)
        .expectStatus(HttpStatus.CREATED);
    });

    it('should sign in a user successfully', () => {
      return pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.OK)
        .expectJsonMatch({
          message: 'User signed in successfully',
          data: {
            access_token: like('token'),
            refresh_token: like('token'),
            expires_in: like(3600),
          },
        })
        .stores('signInAccessToken', 'data.access_token')
        .stores('signInRefreshToken', 'data.refresh_token');
    });

    it('should return 401 when email does not exist', () => {
      return pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: 'nonexistent@example.com',
          password: validUser.password,
        })
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should return 401 when password is incorrect', () => {
      return pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
          password: 'Wrong@123',
        })
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should return 400 when email is missing', () => {
      return pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          password: validUser.password,
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when password is missing', () => {
      return pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when email is invalid format', () => {
      return pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: 'invalid-email',
          password: validUser.password,
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should create a new session on each sign-in', async () => {
      // First sign in
      await pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.OK)
        .stores('firstToken', 'data.access_token');

      // Second sign in
      await pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.OK)
        .stores('secondToken', 'data.access_token');

      // Tokens should be different (different sessions)
      const firstToken = pactum.stash.getDataStore()['firstToken'] as string;
      const secondToken = pactum.stash.getDataStore()['secondToken'] as string;
      expect(firstToken).not.toBe(secondToken);
    });
  });

  describe('POST /auth/sign-out', () => {
    const validUser = {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      password: 'Test@789',
    };

    beforeEach(async () => {
      // Sign up and sign in a user before each test
      await pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(validUser)
        .expectStatus(HttpStatus.CREATED);

      await pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.OK)
        .stores('signOutAccessToken', 'data.access_token');
    });

    it('should sign out a user successfully', () => {
      return pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken('$S{signOutAccessToken}')
        .expectStatus(HttpStatus.OK)
        .expectJsonMatch({
          message: 'User signed out successfully',
        });
    });

    it('should return 401 when no token is provided', () => {
      return pactum
        .spec()
        .post('/auth/sign-out')
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should return 401 when invalid token is provided', () => {
      return pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken('invalid-token')
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should return 401 when expired token is provided', () => {
      // This is a mock expired token (you'd need to create an actual expired token in real scenario)
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.4Adcj0vdYbZfbZ5-XgZfZfZfZfZfZfZfZfZfZfZfZf';

      return pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken(expiredToken)
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should not be able to use token after sign out', async () => {
      // Sign out
      await pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken('$S{signOutAccessToken}')
        .expectStatus(HttpStatus.OK);

      // Try to use the same token again
      return pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken('$S{signOutAccessToken}')
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('Auth Flow Integration', () => {
    const validUser = {
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      password: 'Test@999',
    };

    it('should complete full authentication flow: sign-up -> sign-in -> sign-out', async () => {
      // Step 1: Sign up
      await pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(validUser)
        .expectStatus(HttpStatus.CREATED)
        .expectJsonMatch({
          data: {
            access_token: like('token'),
            refresh_token: like('token'),
          },
        });

      // Step 2: Sign in with the same credentials
      await pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.OK)
        .stores('flowAccessToken', 'data.access_token');

      // Step 3: Sign out
      await pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken('$S{flowAccessToken}')
        .expectStatus(HttpStatus.OK);

      // Step 4: Verify token is no longer valid
      await pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken('$S{flowAccessToken}')
        .expectStatus(HttpStatus.UNAUTHORIZED);
    });

    it('should allow multiple concurrent sessions', async () => {
      // Sign up
      await pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(validUser)
        .expectStatus(HttpStatus.CREATED);

      // Create first session
      await pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.OK)
        .stores('firstSessionToken', 'data.access_token');

      // Create second session
      await pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: validUser.email,
          password: validUser.password,
        })
        .expectStatus(HttpStatus.OK)
        .stores('secondSessionToken', 'data.access_token');

      // Both tokens should work
      await pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken('$S{firstSessionToken}')
        .expectStatus(HttpStatus.OK);

      await pactum
        .spec()
        .post('/auth/sign-out')
        .withBearerToken('$S{secondSessionToken}')
        .expectStatus(HttpStatus.OK);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty request body for sign-up', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({})
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should handle empty request body for sign-in', () => {
      return pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({})
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should handle malformed JSON', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withHeaders('Content-Type', 'application/json')
        .withBody('{"invalid": json}')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should handle SQL injection attempt in email', () => {
      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody({
          name: 'Test User',
          email: "test@example.com' OR '1'='1",
          password: 'Test@123',
        })
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should handle XSS attempt in name', async () => {
      const xssUser = {
        name: '<script>alert("xss")</script>',
        email: 'xss@example.com',
        password: 'Test@123',
      };

      return pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(xssUser)
        .expectStatus(HttpStatus.CREATED);
    });

    it('should trim whitespace from email', async () => {
      const userWithSpaces = {
        name: 'Test User',
        email: '  test@example.com  ',
        password: 'Test@123',
      };

      await pactum
        .spec()
        .post('/auth/sign-up')
        .withBody(userWithSpaces)
        .expectStatus(HttpStatus.CREATED);

      // Should be able to sign in with trimmed email
      return pactum
        .spec()
        .post('/auth/sign-in')
        .withBody({
          email: 'test@example.com',
          password: 'Test@123',
        })
        .expectStatus(HttpStatus.OK);
    });
  });
});
