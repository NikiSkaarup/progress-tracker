import { nanoid } from 'nanoid/async';

/** @typedef {{id: string; name: string?; email: string?; emailVerified: Date?; image: string?;}} UserResult */

/** @return { import("@auth/core/adapters").Adapter } */
export default function (/** @type {import('better-sqlite3').Database} */ client) {
	/** @typedef {{
	 * id: string;
	 * name: string | null;
	 * email: string;
	 * emailVerified: number | null;
	 * image: string | null;
	 * }} userRaw */

	/** @type {import('better-sqlite3').Statement<{id: string; name: string | null | undefined; email: string; emailVerified: Date | null; image: string | null | undefined;}>} */
	const createUser = client.prepare(
		`INSERT INTO User (id, name, email, emailVerified, image) VALUES (@id, @name, @email, @emailVerified, @image)`
	);

	/** @type {import('better-sqlite3').Statement<{id: string; name: string | null | undefined; email: string; emailVerified: Date | null | undefined; image: string | null | undefined;}>} */
	const updateUser = client.prepare(
		`UPDATE User SET name = @name, email = @email, emailVerified = @emailVerified, image = @image WHERE id = @id`
	);

	/** @type {import('better-sqlite3').Statement<string>} */
	const deleteUser = client.prepare(`DELETE FROM User WHERE id = ?`);

	/** @type {import('better-sqlite3').Statement<string>} */
	const getAdapterUserById = client.prepare(
		`SELECT id, name, email, emailVerified, image FROM User WHERE id = ?`
	);

	/** @type {import('better-sqlite3').Statement<string>} */
	const getAdapterUserByRowId = client.prepare(
		`SELECT id, name, email, emailVerified, image FROM User WHERE rowid = ?`
	);

	/** @type {import('better-sqlite3').Statement<string>} */
	const getAdapterUserByEmail = client.prepare(
		`SELECT id, name, email, emailVerified, image FROM User WHERE email = ?`
	);

	/** @type {import('better-sqlite3').Statement<{providerAccountId: string; provider: string;}>} */
	const getAdapterUserByAccount = client.prepare(
		`SELECT User.id, User.name, User.email, User.emailVerified, User.image FROM User INNER JOIN Account ON Account.userId = User.id WHERE Account.providerAccountId = @providerAccountId AND Account.provider = @provider`
	);

	/** @typedef {{
		id: string;
		userId: string;
		type: string;
		provider: string;
		providerAccountId: string;
		refresh_token?: string;
		access_token?: string;
		expires_at?: number;
		token_type?: string;
		scope?: string;
		id_token?: string;
	}} AccountParams */

	/** @type {import('better-sqlite3').Statement<AccountParams>} */
	const createAccount = client.prepare(
		`INSERT INTO Account (id, userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token) VALUES (@id, @userId, @type, @provider, @providerAccountId, @refresh_token, @access_token, @expires_at, @token_type, @scope, @id_token)`
	);

	/** @type {import('better-sqlite3').Statement<{providerAccountId: string; provider: string;}>} */
	const deleteAccount = client.prepare(
		`DELETE FROM Account WHERE providerAccountId = @providerAccountId AND provider = @provider`
	);

	/** @typedef {{
	 * id: string;
	 * sessionToken: string;
	 * userId: string;
	 * expires: number;
	 * }} sessionRaw */

	/** @type {import('better-sqlite3').Statement<{id: string; sessionToken: string; userId: string; expires: number;}>} */
	const createSession = client.prepare(
		`INSERT INTO Session (id, sessionToken, userId, expires) VALUES (@id, @sessionToken, @userId, @expires)`
	);

	/** @type {import('better-sqlite3').Statement<{sessionToken: string; userId: string; expires: number;}>} */
	const updateSession = client.prepare(
		`UPDATE Session SET sessionToken = @sessionToken, expires = @expires WHERE userId = @userId`
	);

	/** @type {import('better-sqlite3').Statement<string>} */
	const deleteSession = client.prepare(`DELETE FROM Session WHERE sessionToken = ?`);

	/** @type {import('better-sqlite3').Statement<string>} */
	const getSessionBySessionToken = client.prepare(
		`SELECT id, sessionToken, userId, expires FROM Session WHERE sessionToken = ?`
	);

	/** @type {import('better-sqlite3').Statement<string>} */
	const getSessionByRowId = client.prepare(
		`SELECT id, sessionToken, userId, expires FROM Session WHERE rowid = ?`
	);

	/** @typedef {{
	 * identifier: string;
	 * token: string;
	 * expires: number;
	 * }} verificationTokenRaw */

	/** @type {import('better-sqlite3').Statement<{identifier: string; token: string; expires: number;}>} */
	const createVerificationToken = client.prepare(
		`INSERT INTO VerificationToken (identifier, token, expires) VALUES (@identifier, @token, @expires)`
	);

	/** @type {import('better-sqlite3').Statement<{identifier: string; token: string;}>} */
	const deleteVerificationToken = client.prepare(
		`DELETE FROM VerificationToken WHERE identifier = @identifier AND token = @token`
	);

	/** @type {import('better-sqlite3').Statement<string>} */
	const getVerificationTokenByToken = client.prepare(
		`SELECT identifier, token, expires FROM VerificationToken WHERE token = ?`
	);

	/** @type {import('better-sqlite3').Statement<string>} */
	const getVerificationTokenByRowId = client.prepare(
		`SELECT identifier, token, expires FROM VerificationToken WHERE rowid = ?`
	);

	return {
		async createUser(user) {
			const id = await nanoid();
			const res = createUser.run({
				id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified,
				image: user.image
			});

			const userResult = getAdapterUserByRowId.get(res.lastInsertRowid.toString());
			if (userResult === undefined) throw new Error('User not found');

			const user2 = /** @type {userRaw} */ (userResult);

			return {
				id: user2.id,
				name: user2.name,
				email: user2.email,
				emailVerified: user2.emailVerified ? new Date(user2.emailVerified) : null,
				image: user2.image
			};
		},
		async getUser(id) {
			const userResult = getAdapterUserById.get(id);
			if (userResult === undefined) return null;

			const user = /** @type {userRaw} */ (userResult);

			return {
				id: user.id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
				image: user.image
			};
		},
		async getUserByEmail(email) {
			const userResult = getAdapterUserByEmail.get(email);
			if (userResult === undefined) return null;

			const user = /** @type {userRaw} */ (userResult);

			return {
				id: user.id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
				image: user.image
			};
		},
		async getUserByAccount({ providerAccountId, provider }) {
			const userResult = getAdapterUserByAccount.get({ providerAccountId, provider });
			if (userResult === undefined) return null;

			const user = /** @type {userRaw} */ (userResult);

			return {
				id: user.id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
				image: user.image
			};
		},
		async updateUser(user) {
			if (user.id === undefined) throw new Error('User id is undefined');
			if (user.email === undefined) throw new Error('User id is undefined');
			const res = updateUser.run({
				id: user.id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified,
				image: user.image
			});
			const userResult = getAdapterUserByRowId.get(res.lastInsertRowid.toString());

			return /** @type {import("@auth/core/adapters").AdapterUser} */ (userResult);
		},
		async deleteUser(userId) {
			deleteUser.run(userId);
		},
		async linkAccount(account) {
			createAccount.run({
				...account,
				id: await nanoid()
			});
		},
		async unlinkAccount({ providerAccountId, provider }) {
			deleteAccount.run({ providerAccountId, provider });
		},
		async createSession({ sessionToken, userId, expires }) {
			const result = createSession.run({
				id: await nanoid(),
				sessionToken,
				userId,
				expires: expires.getTime()
			});

			const sessionResult = getSessionByRowId.get(result.lastInsertRowid.toString());
			if (sessionResult === undefined) throw new Error('Session not found');
			const session = /** @type {sessionRaw} */ (sessionResult);

			return {
				sessionToken: session.sessionToken,
				userId: session.userId,
				expires: new Date(session.expires)
			};
		},
		async getSessionAndUser(sessionToken) {
			const sessionResult = getSessionBySessionToken.get(sessionToken);
			if (sessionResult === undefined || sessionResult === null) return null;

			const session = /** @type {sessionRaw} */ (sessionResult);

			const userResult = getAdapterUserById.get(session.userId);
			if (userResult === undefined) return null;

			const user = /** @type {userRaw} */ (userResult);

			return {
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
					image: user.image
				},
				session: {
					sessionToken: session.sessionToken,
					userId: session.userId,
					expires: new Date(session.expires)
				}
			};
		},
		async updateSession({ sessionToken, userId, expires }) {
			const sessionResult = getSessionBySessionToken.get(sessionToken);
			if (sessionResult === undefined) return null;

			const session = /** @type {sessionRaw} */ (sessionResult);

			const res = updateSession.run({
				sessionToken,
				userId: userId ?? session.userId,
				expires: expires?.getTime() ?? session.expires
			});

			const sessionResult2 = getSessionByRowId.get(res.lastInsertRowid.toString());
			if (sessionResult2 === undefined) return null;
			const session2 = /** @type {sessionRaw} */ (sessionResult2);

			return {
				sessionToken: session2.sessionToken,
				userId: userId ?? session2.userId,
				expires: expires ?? new Date(session2.expires)
			};
		},
		async deleteSession(sessionToken) {
			deleteSession.run(sessionToken);
		},
		async createVerificationToken({ identifier, expires, token }) {
			const res = createVerificationToken.run({
				identifier,
				expires: expires.getTime(),
				token
			});
			if (res.changes === 0) return null;

			const vtResult = getVerificationTokenByRowId.get(res.lastInsertRowid.toString());
			if (vtResult === undefined) return null;

			const vt = /** @type {verificationTokenRaw} */ (vtResult);

			return {
				identifier: vt.identifier,
				token: vt.token,
				expires: new Date(vt.expires)
			};
		},
		async useVerificationToken({ identifier, token }) {
			const vtResult = getVerificationTokenByToken.get(token);
			if (vtResult === undefined) return null;

			deleteVerificationToken.run({
				identifier,
				token
			});

			const vt = /** @type {verificationTokenRaw} */ (vtResult);

			return {
				identifier: vt.identifier,
				token: vt.token,
				expires: new Date(vt.expires)
			};
		}
	};
}
