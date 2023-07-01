import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const updateCategories = async () => {
	const movies = await db.category.upsert({
		where: {
			id: 'cljkdmm0b0001e45zr6ay84zh'
		},
		create: {
			name: 'Movies',
			poster: 'https://picsum.photos/seed/Movies/264/352'
		},
		update: {
			name: 'Movies',
			poster: 'https://picsum.photos/seed/Movies/264/352'
		}
	});
	const shows = await db.category.upsert({
		where: {
			id: 'cljkdmm0b0000e45z32v6sskh'
		},
		create: {
			name: 'TV Shows',
			poster: 'https://picsum.photos/seed/TV Shows/264/352'
		},
		update: {
			name: 'TV Shows',
			poster: 'https://picsum.photos/seed/TV Shows/264/352'
		}
	});
	const anime = await db.category.upsert({
		where: {
			id: 'cljkdmm0c0002e45z72ix5svd'
		},
		create: {
			name: 'Anime',
			poster: 'https://picsum.photos/seed/Anime/264/352'
		},
		update: {
			name: 'Anime',
			poster: 'https://picsum.photos/seed/Anime/264/352'
		}
	});
	const categories = [movies, shows, anime];
	return categories;
};

const updateItems = async (/** @type {ReturnType<Awaited<updateCategories>>} */ categories) => {
	for (const category of categories) {
		const items = await db.item.findMany({
			where: {
				categoryId: category.id
			}
		});

		if (items.length > 0) {
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				await db.item.update({
					where: {
						id: item.id
					},
					data: {
						name: item.name,
						poster: `https://picsum.photos/seed/${item.name}/264/352`
					}
				});
			}
			continue;
		}

		for (let i = 0; i < 10; i++) {
			const name = category.name + '-' + i;
			await db.item.create({
				data: {
					name,
					poster: `https://picsum.photos/seed/${name}/264/352`,
					categoryId: category.id
				}
			});
		}
	}

	return db.item.findMany();
};

const updateSubItems = async (/** @type {ReturnType<Awaited<updateItems>>} */ items) => {
	for (const item of items) {
		const subItems = await db.subItem.findMany({
			where: {
				itemId: item.id
			}
		});

		if (subItems.length > 0) {
			for (let i = 0; i < subItems.length; i++) {
				const subItem = subItems[i];
				await db.subItem.update({
					where: {
						id: subItem.id
					},
					data: {
						name: subItem.name,
						completed: i % 3 === 0,
						poster:
							i % 2 === 0
								? `https://picsum.photos/seed/${subItem.name}/264/352`
								: null
					}
				});
			}
			continue;
		}

		for (let i = 0; i < 10; i++) {
			const name = item.name + '-' + i;
			await db.subItem.create({
				data: {
					name,
					completed: i % 3 === 0,
					poster: i % 2 === 0 ? `https://picsum.photos/seed/${name}/264/352` : null,
					itemId: item.id
				}
			});
		}
	}

	return db.subItem.findMany();
};

const main = async () => {
	const categories = await updateCategories();
	const items = await updateItems(categories);
	const subItems = await updateSubItems(items);

	console.log({ categories: categories.length, items: items.length, subItems: subItems.length });
};

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
